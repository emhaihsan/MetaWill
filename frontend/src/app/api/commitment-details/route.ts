// /Users/emhaihsan/Documents/Github/hackathons/metawill/frontend/src/app/api/commitment-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { lineaSepolia } from "viem/chains";
import MetaWillCommitmentABI from "@/abi/MetaWillCommitment.json";


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address parameter is required" }, { status: 400 });
  }

  try {
    const publicClient = createPublicClient({
      chain: lineaSepolia,
      transport: http(process.env.LINEA_RPC_URL || ""),
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

    return NextResponse.json({
      creator,
      validator,
      title,
      description,
      deadline: Number(deadline),
      stakeAmount: stakeAmount.toString(),
      status: Number(status),
      creatorReportedSuccess,
      validatorConfirmed,
      validatorReportedSuccess
    });
  } catch (error) {
    console.error("Error fetching commitment details:", error);
    return NextResponse.json({ error: "Failed to fetch commitment details" }, { status: 500 });
  }
}