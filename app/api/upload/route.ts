// C:\Users\Usuario\novoapbh\app\api\upload\route.ts
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const slug = String(form.get("slug") || "");
  if (!slug) return new Response("slug obrigatório", { status: 400 });

  const files = form.getAll("files") as File[];
  if (!files.length) return new Response("nenhum arquivo", { status: 400 });

  const destDir = path.join(process.cwd(), "public", "images", slug);
  await fs.mkdir(destDir, { recursive: true });

  const saved: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const original = (file as any).name as string | undefined;
    const safeName =
      (original?.replace(/[^a-zA-Z0-9._-]/g, "_")) || `img_${Date.now()}.jpg`;
    const fullPath = path.join(destDir, safeName);
    await fs.writeFile(fullPath, buffer);
    saved.push(`/images/${slug}/${safeName}`);
  }

  return Response.json({ saved });
}
