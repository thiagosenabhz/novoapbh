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

  // Tag automática de estágio (se tiver datas). Se não tiver, mostra “Pré-lançamento”.
  const stageText =
    p.workStart && p.workDelivery
      ? stageLabel(calcStage(p.workStart, p.workDelivery))
      : "Pré-lançamento";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Título + voltar */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{p.name}</h1>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          Voltar
        </Link>
      </div>

      {/* Capa + Painel lateral */}
      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        {/* Capa */}
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
              src={p.cover.src}
              alt={p.cover.alt}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />

            {/* TAG de estágio (automática) */}
            <div className="absolute left-3 top-3 flex flex-col gap-2">
              <div className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow">
                {stageText}
              </div>

              {/* Se houver % vendido, mostramos abaixo */}
              {typeof p.soldPercent === "number" && (
                <div className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow">
                  {p.soldPercent}% vendido
                </div>
              )}
            </div>

            {/* contador de fotos */}
            <span className="absolute left-3 top-14 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-700 shadow">
              Ver fotos ({p.images.length})
            </span>

            {/* dica de clique */}
            <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
              Clique para ampliar
            </span>
          </button>
        </div>

        {/* Painel lateral: preço + observações */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">Informações complementares</div>
          <div className="mt-2 text-slate-600">Unidades a partir de</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-blue-900 md:text-3xl">
            {brl(p.priceFrom)}
          </div>

          {/* Texto livre (observações / entregas / vista / etc.) */}
          {p.conditionNote && (
            <div className="mt-4 whitespace-pre-wrap text-slate-700">
              {p.conditionNote}
            </div>
          )}
        </div>
      </div>

      {/* Especificações + Lazer */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Especificações */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 text-center text-sm font-medium text-slate-500">
            Especificações
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Spec label="Quartos" value={`${p.bedrooms[0]} a ${p.bedrooms[1]}`} />
            <Spec
              label="Banheiros"
              value={`${p.bathrooms[0]} a ${p.bathrooms[1]}`}
            />
            <Spec label="Vagas" value={`${p.parking[0]} a ${p.parking[1]}`} />
            <Spec label="Área" value={`${p.areaM2[0]} a ${p.areaM2[1]} m²`} />
          </div>
        </div>

        {/* Lazer */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 text-sm font-medium text-slate-500">
            Lazer e conveniência
          </div>
          <div className="flex flex-wrap gap-2">
            {p.amenities?.map((a: string) => (
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

      {/* Formulário de captação */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Quero saber mais
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          Preencha seus dados e entraremos em contato com as opções disponíveis
          para este empreendimento.
        </p>

        <LeadForm
          projectName={p.name}
          projectSlug={p.slug}
          onSubmitted={() => {
            // por enquanto, só um feedback simples na tela
            alert("Cadastro recebido! Em breve entraremos em contato.");
          }}
        />
      </div>

      {/* Galeria em tela cheia */}
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
            onClick={() => setIdx((i) => (i - 1 + p.images.length) % p.images.length)}
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white"
            onClick={() => setIdx((i) => (i + 1) % p.images.length)}
          >
            ›
          </button>

          <div className="mx-auto mt-10 max-w-6xl px-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
              <Image
                key={p.images[idx].src}
                src={p.images[idx].src}
                alt={p.images[idx].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto rounded-md bg-white/10 p-2">
              {p.images.map((g: any, i: number) => (
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
