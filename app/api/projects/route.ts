import { NextResponse } from "next/server";
import data from "@/data/projects.json"; // lê direto do JSON

export async function GET() {
  return NextResponse.json(data, { status: 200 });
}
