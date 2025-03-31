import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, parseAbi } from "viem";
import { lineaTestnet } from "viem/chains";
import { MetaWillCommitmentABI } from "../../../abi/MetaWillCommitment";
import MetaWillFactoryABI from "../../../abi/MetaWillFactory.json";
import MetaWillDonationABI from "../../../abi/MetaWillDonation.json";

// Buat client untuk berinteraksi dengan blockchain
const publicClient = createPublicClient({
  chain: lineaTestnet,
  transport: http(process.env.LINEA_RPC_URL || ""),
});

// Fungsi untuk mengkonversi BigInt menjadi string
function convertBigIntToString(value: any): any {
  if (typeof value === "bigint") {
    return value.toString();
  }
  
  if (Array.isArray(value)) {
    return value.map(convertBigIntToString);
  }
  
  if (typeof value === "object" && value !== null) {
    const result: Record<string, any> = {};
    for (const key in value) {
      result[key] = convertBigIntToString(value[key]);
    }
    return result;
  }
  
  return value;
}

// Fungsi untuk memilih ABI yang sesuai berdasarkan fungsi yang dipanggil
function getAbiForFunction(functionName: string): any {
  // Fungsi-fungsi yang ada di MetaWillFactoryABI
  const factoryFunctions = [
    "getTotalCommitments",
    "getUserCommitments",
    "getValidatorCommitments",
    "allCommitments",
    "createCommitment"
  ];

  // Fungsi-fungsi yang ada di MetaWillDonationABI
  const donationFunctions = [
    "getTotalDonations",
    "donate"
  ];

  if (factoryFunctions.includes(functionName)) {
    return MetaWillFactoryABI;
  } else if (donationFunctions.includes(functionName)) {
    return MetaWillDonationABI;
  } else {
    // Default ke MetaWillCommitmentABI untuk fungsi-fungsi lainnya
    return MetaWillCommitmentABI;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Ambil parameter dari query
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get("address");
    const functionName = searchParams.get("functionName");
    const argsStr = searchParams.get("args");

    if (!address || !functionName) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Parse args jika ada
    let args: any[] = [];
    if (argsStr) {
      try {
        // Coba parse sebagai JSON array
        if (argsStr.startsWith('[') && argsStr.endsWith(']')) {
          args = JSON.parse(argsStr);
        } else {
          // Jika bukan JSON array, anggap sebagai single value
          args = [argsStr];
        }
      } catch (e) {
        // Jika gagal parse sebagai JSON, gunakan sebagai string biasa
        args = [argsStr];
      }
    }

    // Pilih ABI yang sesuai berdasarkan fungsi yang dipanggil
    const abi = getAbiForFunction(functionName);

    // Panggil fungsi kontrak
    const result = await publicClient.readContract({
      address: address as `0x${string}`,
      abi: abi,
      functionName: functionName,
      args: args.length > 0 ? args : undefined,
    });

    // Konversi BigInt menjadi string sebelum mengembalikan sebagai JSON
    const serializedResult = convertBigIntToString(result);
    
    return NextResponse.json({ result: serializedResult });
  } catch (error: any) {
    console.error("Error reading contract:", error);
    return NextResponse.json(
      { error: error.message || "Failed to read contract" },
      { status: 500 }
    );
  }
}