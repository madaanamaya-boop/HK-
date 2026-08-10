import { NextRequest, NextResponse } from "next/server";
import { calculateEmi } from "@/lib/utils";

/**
 * EMI calculation endpoint.
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 * Query/body params: principal, annualRate (percent), tenureMonths.
 */

export async function POST(req: NextRequest) {
  let body: { principal?: number; annualRate?: number; tenureMonths?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const principal = Number(body.principal);
  const annualRate = Number(body.annualRate);
  const tenureMonths = Number(body.tenureMonths);

  if (
    !Number.isFinite(principal) || principal <= 0 ||
    !Number.isFinite(annualRate) || annualRate < 0 ||
    !Number.isFinite(tenureMonths) || tenureMonths <= 0
  ) {
    return NextResponse.json(
      { success: false, message: "principal, annualRate, and tenureMonths must be valid positive numbers" },
      { status: 400 }
    );
  }

  const result = calculateEmi(principal, annualRate, tenureMonths);

  return NextResponse.json({
    success: true,
    emi: Math.round(result.emi),
    totalInterest: Math.round(result.totalInterest),
    totalPayable: Math.round(result.totalPayable),
    principal,
    annualRate,
    tenureMonths,
  });
}
