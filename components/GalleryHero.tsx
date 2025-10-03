"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";

/**
 * Componente de capa com galeria embutida:
 * - Mostra a foto de capa com um "badge" visual: "Ver X fotos"
 * - Ao clicar, abre lightbox full-screen com navegação (setas, thumbnails, teclado)
 */
export default function GalleryHero({
  cover,
  images,
  altFallback = "Galeria do empreendimento",
}: {
  cover: { src: string; alt?: string };
  images?: { src: string; alt?: string }[];
  altFallback?: string;
}) {
  // inclui a capa como primeira imagem da galeria (se ainda não estiver)
  const gallery = useMemo(() => {
    const list = images ?? [];
    const hasCover = list.some((i) => i.src === cover?.src);
    return hasCover ? list : [cover, ...list];
  }, [cover, images]);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const total = gallery.length;

  const show = useCallback(
    (next: number) => {
      if (!total) return;
      const n = ((next % total) + total) % total;
      setIdx(n);
    },
    [total]
  );

  // navegação por teclado na lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, show]);

  return (
    <>
      {/* Capa com overlay clicável indicando que há mais fotos */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        aria-label="Abrir galeria de fotos"
      >
        <Image
          src={cover?.src}
          alt={cover?.alt || altFallback}
          width={1440}
          height={960}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          priority
        />

        {/* faixa inferior com "Ver X fotos" + ícone de câmera */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-gradient-to-t from-black/60 to-black/0 p-4">
          <div className="ml-auto flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-slate-900 shadow">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-slate-600"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 0 0-.894.553L7.382 4H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-2.382l-.724-1.447A1 1 0 0 0 14 2H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
            </svg>
            <span>Ver {total} foto{total === 1 ? "" : "s"}</span>
          </div>
        </div>
      </button>

      {/* Lightbox */}
      {open && total > 0 && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95">
          <div className="flex items-center justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-white/10 px-3 py-1 text-white ring-1 ring-white/20 hover:bg-white/20"
            >
              Fechar
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-6xl flex-1">
            {/* imagem grande */}
            <Image
              src={gallery[idx]?.src}
              alt={gallery[idx]?.alt || altFallback}
              width={1920}
              height={1080}
              className="mx-auto h-full w-auto max-w-full object-contain"
              priority
            />

            {/* setas */}
            <button
              onClick={() => show(idx - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white ring-1 ring-white/20 hover:bg-white/25"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => show(idx + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white ring-1 ring-white/20 hover:bg-white/25"
              aria-label="Próxima"
            >
              ›
            </button>
          </div>

          {/* thumbnails */}
          <div className="mx-auto w-full max-w-6xl overflow-x-auto border-t border-white/10 bg-black/80 px-4 py-3">
            <div className="flex gap-3">
              {gallery.map((img, i) => (
                <button
                  key={img.src + i}
                  onClick={() => show(i)}
                  className={`relative block h-20 w-28 overflow-hidden rounded-md ring-2 ${
                    idx === i ? "ring-white" : "ring-transparent"
                  }`}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || altFallback}
                    width={280}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
