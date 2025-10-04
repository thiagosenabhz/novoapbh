// app/imovel/[slug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LeadForm from "@/components/LeadForm";
import { brl } from "@/data/store";
import { calcStage, stageLabel } from "@/utils/stage";

async function fetchProject(slug: string) {
  const r = await fetch("/api/projects", { cache: "no-store" });
  const all = await r.json();
  return all.find((p: any) => p.slug === slug);
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [p, setP] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    fetchProject(slug).then(setP);
  }, [slug]);

  if (!p) return <div className="p-6">Carregando…</div>;

  // TAG automática de estágio (usa datas se existirem; senão mostra "Pré-lançamento")
  const stageTxt = stageLabel(calcStage(p.workStart, p.workDelivery));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Cabeçalho */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{p.name}</h1>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          Voltar
        </Link>
      </div>

      {/* Hero + Coluna direita */}
      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        {/* Imagem principal */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <button
            type="button"
            className="group relative block w-full"
            onClick={() => {
              setOpen(true);
              setIdx(0);
            }}
          >
            <Image
              src={p.cover?.src || "/images/placeholder.jpg"}
              alt={p.cover?.alt || "Imagem de capa"}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />

            {/* TAG automática de estágio */}
            <div className="absolute left-3 top-3">
              <div className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-white shadow">
                {stageTxt}
              </div>
            </div>

            {/* Contador de fotos */}
            <span className="absolute left-3 top-12 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-700 shadow">
              Ver fotos ({Array.isArray(p.images) ? p.images.length : 0})
            </span>

            {/* dica */}
            <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
              Clique para ampliar
            </span>
          </button>
        </div>

        {/* Coluna direita (condições + formulário) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">Condições</div>
          <div className="mt-2 text-slate-600">Unidades a partir de</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-blue-900 md:text-3xl">
            {brl(p.priceFrom)}
          </div>

          {/* Observações / notas livres */}
          {p.conditionNote ? (
            <div className="mt-4 text-slate-600">{p.conditionNote}</div>
          ) : null}

          {/* Formulário de interesse (autofill) */}
          <div className="mt-6 border-t border-slate-200 pt-6">
            <LeadForm
              projectName={p.name}
              projectSlug={p.slug}
              onSubmitted={() => {
                // feedback simples por enquanto
                alert("Recebemos seus dados. Obrigado!");
              }}
            />
          </div>
        </div>
      </div>

      {/* QUADROS: especificações + lazer */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Especificações */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 text-center text-sm font-medium text-slate-500">
            Especificações
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Spec
              label="Quartos"
              value={`${p.bedrooms?.[0] ?? "-"} a ${p.bedrooms?.[1] ?? "-"}`}
            />
            <Spec
              label="Banheiros"
              value={`${p.bathrooms?.[0] ?? "-"} a ${p.bathrooms?.[1] ?? "-"}`}
            />
            <Spec
              label="Vagas"
              value={`${p.parking?.[0] ?? "-"} a ${p.parking?.[1] ?? "-"}`}
            />
            <Spec
              label="Área"
              value={`${p.areaM2?.[0] ?? "-"} a ${p.areaM2?.[1] ?? "-"} m²`}
            />
          </div>
        </div>

        {/* Lazer e conveniência */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 text-sm font-medium text-slate-500">
            Lazer e conveniência
          </div>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(p.amenities) ? p.amenities : []).map((a: string) => (
              <span
                key={a}
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Galeria modal */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/80">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-3 rounded-md bg-white/90 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-white"
          >
            Fechar
          </button>

          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white"
            onClick={() =>
              setIdx((i) =>
                Array.isArray(p.images)
                  ? (i - 1 + p.images.length) % p.images.length
                  : 0
              )
            }
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white"
            onClick={() =>
              setIdx((i) =>
                Array.isArray(p.images) ? (i + 1) % p.images.length : 0
              )
            }
          >
            ›
          </button>

          <div className="mx-auto mt-10 max-w-6xl px-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
              <Image
                key={
                  Array.isArray(p.images) && p.images[idx]
                    ? p.images[idx].src
                    : "fallback"
                }
                src={
                  Array.isArray(p.images) && p.images[idx]
                    ? p.images[idx].src
                    : p.cover?.src || "/images/placeholder.jpg"
                }
                alt={
                  Array.isArray(p.images) && p.images[idx]
                    ? p.images[idx].alt
                    : p.cover?.alt || "Imagem"
                }
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            {/* Miniaturas */}
            <div className="mt-3 flex gap-2 overflow-x-auto rounded-md bg-white/10 p-2">
              {(Array.isArray(p.images) ? p.images : []).map((g: any, i: number) => (
                <button
                  key={g.src}
                  onClick={() => setIdx(i)}
                  className={`relative h-16 w-28 overflow-hidden rounded-md border ${
                    i === idx
                      ? "border-white"
                      : "border-white/40 hover:border-white"
                  }`}
                >
                  <Image src={g.src} alt={g.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 text-center">
      <div className="text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}
