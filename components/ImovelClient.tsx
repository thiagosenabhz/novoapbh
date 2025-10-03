// @ts-nocheck
"use client";

import { useMemo, useState } from "react";
import site from "@/config/site";
import { msg } from "@/utils/msg";
import WhatsAppButton from "@/components/WhatsAppButton";

// ---------- helpers locais ----------
function rangeLabel(v: any): string {
  if (!v && v !== 0) return "—";
  if (Array.isArray(v)) {
    if (v.length === 1) return String(v[0]);
    return `${v[0]} a ${v[1]}`;
  }
  if (typeof v === "object" && v?.min != null && v?.max != null) {
    if (v.min === v.max) return String(v.min);
    return `${v.min} a ${v.max}`;
  }
  return String(v);
}

function currency(n: any): string {
  const v = Number(n);
  if (!Number.isFinite(v)) return "A combinar";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ImovelClient({ project }: { project: any }) {
  // Galeria
  const gallery: string[] = useMemo(() => {
    const g: string[] = [];
    if (Array.isArray(project?.gallery) && project.gallery.length > 0) {
      g.push(...project.gallery);
    }
    if (project?.detailsPageHero?.src) g.push(project.detailsPageHero.src);
    if (project?.cover?.src) g.push(project.cover.src);
    return Array.from(new Set(g));
  }, [project]);

  const heroImg = gallery?.[0];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const priceLabel =
    project?.priceFrom != null ? `A partir de ${currency(project.priceFrom)}` : "A combinar";

  const waText =
    typeof msg?.visitaProjeto === "function"
      ? msg.visitaProjeto(project.name)
      : `Olá! Vi o imóvel ${project.name} no ${site?.brand ?? "EasyLar"} e quero agendar uma visita.`;

  const ctaFloating = site?.ctas?.floating ?? "Agende agora sua visita!";

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Título + endereço */}
        <h1 className="text-[28px] font-semibold text-slate-900">{project.name}</h1>
        <div className="mt-1 text-sm text-slate-600">
          {[
            project.address,
            project.neighborhood && `— ${project.neighborhood}`,
            project.city && `, ${project.city}`,
          ]
            .filter(Boolean)
            .join(" ")}
        </div>

        {/* GRID principal */}
        <div className="mt-6 grid items-start gap-6 md:grid-cols-[1.15fr_.85fr]">
          {/* imagem grande à esquerda (CLICÁVEL) */}
          <button
            type="button"
            onClick={() => {
              setIdx(0);
              setOpen(true);
            }}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            aria-label="Abrir galeria de fotos"
          >
            <img
              src={heroImg}
              alt={project?.cover?.alt ?? `Fachada do ${project.name}`}
              className="h-auto w-full transition group-hover:scale-[1.01]"
            />
          </button>

          {/* condições à direita */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-slate-600">Condições</div>
            <div className="mt-2 text-xl font-bold text-[#173F7A]">{priceLabel}</div>
            <div className="mt-2 text-sm text-slate-600">
              Fluxo de pagamento personalizado.
            </div>

            {/* botão voltar */}
            <a
              href="/"
              className="mt-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Voltar
            </a>
          </div>
        </div>

        {/* Especificações */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-center text-sm font-semibold text-slate-700">
            Especificações
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-4 text-center">
              <div className="text-xs text-slate-500">Quartos</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {rangeLabel(project?.specs?.bedrooms)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 text-center">
              <div className="text-xs text-slate-500">Banheiros</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {rangeLabel(project?.specs?.bathrooms)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 text-center">
              <div className="text-xs text-slate-500">Vagas</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {rangeLabel(project?.specs?.parking)}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 text-center">
              <div className="text-xs text-slate-500">Área</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {rangeLabel(project?.specs?.area)} m²
              </div>
            </div>
          </div>
        </div>

        {/* Lazer e conveniência */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-slate-700">
            Lazer e conveniência
          </div>

          <div className="flex flex-wrap gap-2">
            {(project?.amenities ?? []).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Botão Flutuante de WhatsApp */}
      <WhatsAppButton variant="floating" text={waText} cta={ctaFloating} iconSize={56} />

      {/* Modal da GALERIA */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-medium text-slate-700">
                Galeria • {idx + 1} / {gallery.length}
              </div>
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                Fechar
              </button>
            </div>

            <div className="mt-3">
              <img
                src={gallery[idx]}
                alt={`Imagem ${idx + 1} do ${project.name}`}
                className="mx-auto max-h-[70vh] w-auto rounded-xl"
              />
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {gallery.map((g, i) => (
                  <button
                    key={`${g}-${i}`}
                    className={`h-16 w-24 overflow-hidden rounded border ${
                      i === idx ? "border-slate-900" : "border-slate-300"
                    }`}
                    onClick={() => setIdx(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                  >
                    <img src={g} alt={`mini ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
