import { NextRequest, NextResponse } from "next/server";

/**
 * Credit score check intake — INTEGRATION-READY STUB.
 *
 * This endpoint does NOT perform a real bureau pull. It records a
 * consent-based request so the HK FINCORP team can assist the client.
 *
 * To integrate a real provider later (CIBIL / Experian / CRIF / Equifax
 * or an aggregator API), implement `fetchBureauScore` below and set the
 * provider credentials via environment variables. Credit score checks
 * are subject to user consent and third-party credit bureau/API
 * availability.
 */

interface CreditScoreBody {
  fullName?: string;
  mobile?: string;
  email?: string;
  pan?: string;
  consent?: boolean;
}

// async function fetchBureauScore(_input: Required<CreditScoreBody>) {
//   // Example shape for a future provider integration:
//   // const res = await fetch(process.env.BUREAU_API_URL!, {
//   //   method: "POST",
//   //   headers: { Authorization: `Bearer ${process.env.BUREAU_API_KEY}` },
//   //   body: JSON.stringify({ ... }),
//   // });
//   // return res.json();
// }

export async function POST(req: NextRequest) {
  let body: CreditScoreBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  if (!body.fullName || !body.mobile || !body.email || !body.pan) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { success: false, message: "Consent is required to proceed with a credit check" },
      { status: 400 }
    );
  }

  const request = {
    ...body,
    pan: `${body.pan.slice(0, 3)}XXXXX${body.pan.slice(-2)}`, // mask PAN in logs
    requestId: `HKF-CS-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
  };

  console.log("[HK FINCORP CREDIT SCORE REQUEST]", JSON.stringify(request, null, 2));

  return NextResponse.json({
    success: true,
    requestId: request.requestId,
    message:
      "Thank you. Our team will help you with your credit score and loan eligibility consultation.",
  });
}
