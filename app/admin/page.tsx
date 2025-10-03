// C:\Users\Usuario\novoapbh\app\admin\page.tsx
"use client";

import React from "react";
import { Project } from "@/data/store";

const USER = "ADMIN";
const PASS = "12345";

const emptyProject = (): Project => ({
  slug: "",
  visible: true,
  preLaunch: false,
  soldPercent: 0,
  name: "",
  city: "Belo Horizonte",
  neighborhood: "",
  types: { studio: false, q1: false, q2: false, q3: false, privativa: false, cobertura: false },
  bedrooms: [1, 1],
  bathrooms: [1, 1],
  parking: [0, 1],
  areaM2: [40, 100],
  priceFrom: 0,
  conditionNote: "",
  amenities: [],
  cover: { src: "", alt: "" },
  images: []
});

export default function AdminPage() {
  const [ok, setOk] = React.useState(
    typeof window !== "undefined" && sessionStorage.getItem("admin") === "1"
  );
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");

  const [list, setList] = React.useState<Project[]>([]);
  const [editing, setEditing] = React.useState<Project | null>(null);
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);

  async function load() {
    const r = await fetch("/api/projects", { cache: "no-store" });
    const data = await r.json();
    setList(data);
  }
  React.useEffect(() => { if (ok) load(); }, [ok]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (user === USER && pass === PASS) {
      sessionStorage.setItem("admin", "1");
      setOk(true);
    } else alert("Credenciais inválidas.");
  }

  async function upload(slug: string, files: File[] | FileList) {
    if (!files || !slug) return [];
    const fd = new FormData();
    fd.append("slug", slug);
    for (const f of Array.from(files)) fd.append("files", f);
    const r = await fetch("/api/upload", { method: "POST", body: fd });
    const { saved } = await r.json();
    return saved as string[];
  }

  async function saveProject(p: Project) {
    const method = list.some((x) => x.slug === p.slug) ? "PUT" : "POST";
    const r = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    if (!r.ok) {
      alert("Erro ao salvar: " + (await r.text()));
      return;
    }
    await load();
    alert("Empreendimento salvo!");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    const proj = { ...editing };

    // upload de fachada primeiro (se houver)
    if (coverFile) {
      const saved = await upload(proj.slug, [coverFile]);
      if (saved.length) {
        proj.cover = { src: saved[0], alt: `Fachada do ${proj.name}` };
        // garante na galeria também
        if (!proj.images.some(i => i.src === saved[0])) {
          proj.images = [{ src: saved[0], alt: "Fachada" }, ...proj.images];
        }
      }
    }

    // upload da galeria (se houver)
    if (files && files.length) {
      const saved = await upload(proj.slug, files);
      proj.images = [
        ...proj.images,
        ...saved.map((s) => ({ src: s, alt: "Imagem" })),
      ];
    }

    await saveProject(proj);
    setEditing(null);
    setFiles(null);
    setCoverFile(null);
  }

  if (!ok) {
    return (
      <div className="mx-auto max-w-sm px-4 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Admin</h1>
        <form onSubmit={login} className="space-y-3">
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} />
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Senha" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button className="rounded-lg bg-slate-900 px-3 py-2 text-white">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Painel do Admin</h1>
        <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
          onClick={() => { sessionStorage.removeItem("admin"); location.reload(); }}>
          Sair
        </button>
      </div>

      {/* Listagem */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-slate-600">Empreendimentos ({list.length})</div>
          <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            onClick={() => setEditing(emptyProject())}>
            + Novo empreendimento
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {list.map((p) => (
            <div key={p.slug} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-slate-500">{p.visible ? "Visível" : "Oculto"}</div>
              </div>
              <div className="text-xs text-slate-500">{p.neighborhood} • {p.city}</div>
              <div className="mt-2 text-sm font-medium text-blue-900">
                {p.preLaunch ? "Pré-lançamento" : `${p.soldPercent}% vendido`}
              </div>
              <div className="mt-2">
                <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                  onClick={() => setEditing(p)}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      {editing && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs text-slate-500">Slug (ex: eleva-residence)</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                required />
            </div>
            <div>
              <label className="text-xs text-slate-500">Nome</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required />
            </div>
            <div>
              <label className="text-xs text-slate-500">Cidade</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.city}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
            </div>

            <div>
              <label className="text-xs text-slate-500">Bairro</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.neighborhood}
                onChange={(e) => setEditing({ ...editing, neighborhood: e.target.value })} />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.visible}
                  onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} />
                Visível no site
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.preLaunch}
                  onChange={(e) => setEditing({ ...editing, preLaunch: e.target.checked })} />
                Pré-lançamento
              </label>
            </div>

            <div>
              <label className="text-xs text-slate-500">% vendido</label>
              <input type="number" min={0} max={100}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.soldPercent}
                onChange={(e) => setEditing({ ...editing, soldPercent: Number(e.target.value) })} />
            </div>
          </div>

          {/* Tipos */}
          <div className="mb-4 rounded-lg border border-slate-200 p-3">
            <div className="mb-2 text-sm font-medium">Tipos</div>
            <div className="flex flex-wrap gap-4 text-sm">
              {(["studio","q1","q2","q3","privativa","cobertura"] as const).map((k) => (
                <label key={k} className="flex items-center gap-2">
                  <input type="checkbox" checked={editing.types[k]}
                    onChange={(e) => setEditing({ ...editing, types: { ...editing.types, [k]: e.target.checked } })} />
                  {k}
                </label>
              ))}
            </div>
          </div>

          {/* Ranges */}
          <div className="mb-4 grid gap-4 md:grid-cols-4">
            <RangeField label="Quartos" value={editing.bedrooms}
              onChange={(v) => setEditing({ ...editing, bedrooms: v })} />
            <RangeField label="Banheiros" value={editing.bathrooms}
              onChange={(v) => setEditing({ ...editing, bathrooms: v })} />
            <RangeField label="Vagas" value={editing.parking}
              onChange={(v) => setEditing({ ...editing, parking: v })} />
            <RangeField label="Área (m²)" value={editing.areaM2}
              onChange={(v) => setEditing({ ...editing, areaM2: v })} />
          </div>

          {/* Preço/Condição */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-500">Preço “a partir de” (R$)</label>
              <input type="number" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.priceFrom}
                onChange={(e) => setEditing({ ...editing, priceFrom: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Texto de condições</label>
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                value={editing.conditionNote}
                onChange={(e) => setEditing({ ...editing, conditionNote: e.target.value })} />
            </div>
          </div>

          {/* Amenidades */}
          <div className="mb-4">
            <label className="text-xs text-slate-500">Amenidades (separe por vírgula)</label>
            <textarea className="mt-1 w-full rounded-lg border border-slate-300 p-2"
              rows={3}
              value={editing.amenities.join(", ")}
              onChange={(e) => setEditing({ ...editing, amenities: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
          </div>

          {/* Uploads */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Fachada (capa)</div>
              <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />
            </div>
            <div>
              <div className="text-sm font-medium">Galeria (múltiplas)</div>
              <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
            </div>
          </div>

          {/* Cover atual */}
          {editing.cover?.src && (
            <div className="mb-4 text-sm text-slate-600">
              Capa atual: <code>{editing.cover.src}</code>
            </div>
          )}

          <div className="flex gap-3">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">Salvar</button>
            <button type="button" className="rounded-lg border border-slate-300 px-4 py-2"
              onClick={() => { setEditing(null); setFiles(null); setCoverFile(null); }}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        <input type="number" className="w-1/2 rounded-lg border border-slate-300 px-3 py-2"
          value={value[0]} onChange={(e) => onChange([Number(e.target.value), value[1]])} />
        <span className="text-slate-500">a</span>
        <input type="number" className="w-1/2 rounded-lg border border-slate-300 px-3 py-2"
          value={value[1]} onChange={(e) => onChange([value[0], Number(e.target.value)])} />
      </div>
    </div>
  );
}
