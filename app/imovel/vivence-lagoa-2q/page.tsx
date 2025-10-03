"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

const TITLE = "Vivence Lagoa";
const SOLD_BADGE = "76% vendido";
const CONDITION_HEADLINE = "Unidades a partir de";
const CONDITION_PRICE = "R$ 499.900,00";
const CONDITION_NOTE = "Fluxo de pagamento personalizado.";

const GALLERY: { src: string; alt: string }[] = [
  { src: "/images/vivence-lagoa/fachada.jpg", alt: "Fachada do Vivence Lagoa" },
  { src: "/images/vivence-lagoa/001.jpg", alt: "Área comum 001" },
  { src: "/images/vivence-lagoa/002.jpg", alt: "Área comum 002" },
  { src: "/images/vivence-lagoa/003.jpg", alt: "Área comum 003" },
  { src: "/images/vivence-lagoa/004.jpg", alt: "Área comum 004" },
  { src: "/images/vivence-lagoa/005.jpg", alt: "Área comum 005" },
  { src: "/images/vivence-lagoa/006.jpg", alt: "Área comum 006" },
].filter(Boolean);

const SPECS = [
  { label: "Quartos", value: "1 a 3" },
  { label: "Banheiros", value: "1 a 2" },
  { label: "Vagas", value: "1 a 2" },
  { label: "Área", value: "55 a 119 m²" },
];

const AMENITIES = [
  "Salão de festas",
  "Bicicletário",
  "Praça",
  "Playground",
  "Pet Place",
  "Ginástica descoberta",
  "Churrasqueira",
  "Piscina adulto",
  "Piscina infantil",
  "Solarium",
  "SPA",
  "Quadra infantil",
  "Quadra",
];

export default function VivenceLagoaPage() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const openGallery = (i = 0) => { setIndex(i); setOpen(true); };
  const closeGallery = () => setOpen(false);
  const prev = () => setIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setIndex((i) => (i + 1) % GALLERY.length);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">{TITLE}</h1>
        <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">Voltar</Link>
      </div>

      {/* HERO (mesmo corte wide) + CONDIÇÕES */}
      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <button type="button" aria-label="Abrir galeria de fotos" className="group relative block w-full" onClick={() => openGallery(0)}>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={GALLERY[0].src}
                alt={GALLERY[0].alt}
                fill
                className="object-cover transition group-hover:brightness-95"
                priority
              />
            </div>

            <div className="pointer-events-none absolute left-3 top-3">
              <div className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-md ring-1 ring-red-700/60">
                {SOLD_BADGE}
              </div>
            </div>

            <span className="absolute left-3 top-12 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-slate-700 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 7h2l2-3h8l2 3h2a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1Zm0 2v10h16V9h-3.382l-2-3H9.382l-2 3H4Z" />
              </svg>
              Ver fotos ({GALLERY.length})
            </span>

            <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
              Clique para ampliar
            </span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">Condições</div>
          <div className="mt-2 text-slate-600">{CONDITION_HEADLINE}</div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-blue-900 md:text-3xl">{CONDITION_PRICE}</div>
          <div className="mt-4 text-slate-600">{CONDITION_NOTE}</div>
        </div>
      </div>

      {/* QUADROS */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
          <div className="mb-3 text-center text-sm font-medium text-slate-500">Especificações</div>
          <div className="grid gap-4 md:grid-cols-2">
            {SPECS.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200 p-4 text-center">
                <div className="text-slate-500">{s.label}</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
          <div className="mb-3 text-sm font-medium text-slate-500">Lazer e conveniência</div>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((a) => (
              <span key={a} className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <WhatsAppButton variant="floating" text="Olá! Tenho interesse no Vivence Lagoa." showCaption={false} iconSize={56} />

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/80">
          <button className="absolute right-4 top-3 rounded-md bg-white/90 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-white" onClick={closeGallery}>
            Fechar
          </button>

          <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white" onClick={prev} aria-label="Imagem anterior">‹</button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 hover:bg-white" onClick={next} aria-label="Próxima imagem">›</button>

          <div className="mx-auto mt-10 max-w-6xl px-4">
            {/* Na galeria mostramos A IMAGEM INTEIRA */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-black">
              <Image key={GALLERY[index].src} src={GALLERY[index].src} alt={GALLERY[index].alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 1024px" priority />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto rounded-md bg-white/10 p-2">
              {GALLERY.map((g, i) => (
                <button key={g.src} onClick={() => setIndex(i)} className={`relative h-16 w-28 overflow-hidden rounded-md border ${i === index ? "border-white" : "border-white/40 hover:border-white"}`} aria-label={`Abrir ${g.alt}`}>
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
