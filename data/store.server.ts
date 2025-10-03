// C:\Users\Usuario\novoapbh\data\store.server.ts
import { promises as fs } from "fs";
import path from "path";
import type { Db, Project } from "./store";

const DB_PATH = path.join(process.cwd(), "data", "projects.json");

export async function readDb(): Promise<Db> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as Db;
}

export async function writeDb(db: Db): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function getProjects(onlyVisible = true): Promise<Project[]> {
  const db = await readDb();
  return onlyVisible ? db.projects.filter((p) => p.visible) : db.projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const db = await readDb();
  return db.projects.find((p) => p.slug === slug);
}
