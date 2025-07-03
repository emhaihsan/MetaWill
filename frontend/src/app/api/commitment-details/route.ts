// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/app/api/commitment-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { MetaWillCommitmentABI } from "../../../abi/MetaWillCommitment";

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
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address parameter is required" }, { status: 400 });
  }

  try {
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(process.env.BASE_SEPOLIA_RPC_URL || ""),
    });

    const commitmentDetails = await publicClient.readContract({
      address: address as `0x${string}`,
      abi: MetaWillCommitmentABI,
      functionName: "getCommitmentDetails",
    });

    // Format hasil untuk response
    const [
      creator,
      validator,
      title,
      description,
      deadline,
      stakeAmount,
      status,
      creatorReportedSuccess,
      validatorConfirmed,
      validatorReportedSuccess
    ] = commitmentDetails as any;

    const commitment = {
      creator,
      validator,
      title,
      description,
      deadline,
      stakeAmount,
      status,
      creatorReportedSuccess,
      validatorConfirmed,
      validatorReportedSuccess
    };

    // Konversi BigInt menjadi string
    const serializedCommitment = convertBigIntToString(commitment);

    return NextResponse.json({ commitment: serializedCommitment });
  } catch (error) {
    console.error("Error fetching commitment details:", error);
    return NextResponse.json({ error: "Failed to fetch commitment details" }, { status: 500 });
  }
}