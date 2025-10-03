// C:\Users\Usuario\novoapbh\app\api\projects\route.ts
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { readDb, writeDb } from "@/data/store.server";
import type { Project } from "@/data/store";

export async function GET() {
  const db = await readDb();
  return Response.json(db.projects);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Project;
  if (!body.slug) return new Response("slug obrigatório", { status: 400 });

  const db = await readDb();
  if (db.projects.some((p) => p.slug === body.slug)) {
    return new Response("slug já existe", { status: 409 });
  }

  db.projects.push(body);
  await writeDb(db);

  // cria pasta de imagens
  const dir = path.join(process.cwd(), "public", "images", body.slug);
  await fs.mkdir(dir, { recursive: true });

  return Response.json({ ok: true });
}

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as Project;
  if (!body.slug) return new Response("slug obrigatório", { status: 400 });

  const db = await readDb();
  const idx = db.projects.findIndex((p) => p.slug === body.slug);
  if (idx === -1) return new Response("não encontrado", { status: 404 });

  db.projects[idx] = body;
  await writeDb(db);
  return Response.json({ ok: true });
}
