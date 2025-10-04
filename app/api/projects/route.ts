import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  // A API passa a responder um ARRAY de Project, padronizando o consumo no front.
  return NextResponse.json(projects, { status: 200 });
}
