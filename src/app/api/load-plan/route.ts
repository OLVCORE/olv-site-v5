import { NextRequest, NextResponse } from "next/server";
import { greedyPack, PackageInput, ContainerType } from "@/lib/binPacking";

// Basic container specs (internal volume m³ and payload kg). Extend as needed.
const CONTAINERS: ContainerType[] = [
  { code: "20DRY", internalVolume: 33, payloadKg: 24000 },
  { code: "40DRY", internalVolume: 67, payloadKg: 26500 },
  { code: "40HC", internalVolume: 76, payloadKg: 28000 },
  { code: "45HC", internalVolume: 86, payloadKg: 29500 },
];

export async function POST(req: NextRequest) {
  try {
    const { packages } = (await req.json()) as { packages: PackageInput[] };
    if (!packages || !Array.isArray(packages)) {
      return NextResponse.json({ error: "packages array required" }, { status: 400 });
    }
    const plan = greedyPack(packages, CONTAINERS);
    return NextResponse.json({ containers: plan });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
} 