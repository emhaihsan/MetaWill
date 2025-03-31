import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, parseAbi } from "viem";
import { lineaTestnet } from "viem/chains";
import { MetaWillCommitmentABI } from "../../../abi/MetaWillCommitment";

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

export async function GET(request: NextRequest) {
  try {
    // Ambil parameter dari query
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get("address");
    const functionName = searchParams.get("functionName");

    if (!address || !functionName) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Panggil fungsi kontrak
    const result = await publicClient.readContract({
      address: address as `0x${string}`,
      abi: MetaWillCommitmentABI,
      functionName: functionName,
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