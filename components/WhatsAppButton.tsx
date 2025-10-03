"use client";

import React from "react";
import Image from "next/image";
import site from "@/config/site";
import { waLink } from "@/utils/wa";

type Variant = "floating" | "inline";

type Props = {
  text: string;
  cta?: string;
  variant?: Variant;
  iconSize?: number;
  /** Se false, não renderiza a legenda (“CTA”) ao lado do ícone */
  showCaption?: boolean;
};

export default function WhatsAppButton({
  text,
  cta,
  variant = "inline",
  iconSize = 40,
  showCaption = true,
}: Props) {
  // sanitiza telefone e gera URL
  const href = waLink(text);

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2"
        aria-label="Abrir conversa no WhatsApp"
      >
        <span className="relative inline-flex rounded-full shadow-lg">
          <Image
            src="/icons/whatsapp.svg"
            alt="WhatsApp"
            width={iconSize}
            height={iconSize}
            className="rounded-full"
            priority
          />
        </span>

        {/* legenda opcional */}
        {showCaption && (
          <span className="rounded-full bg-white/90 px-3 py-1 text-sm text-slate-800 shadow">
            {site?.ctas?.floating ?? "Agende agora sua visita!"}
          </span>
        )}
      </a>
    );
  }

  // Variante "inline"
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={20}
        height={20}
        className="rounded"
      />
      <span>{cta ?? "Falar no WhatsApp"}</span>
    </a>
  );
}
