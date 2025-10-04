"use client";

import * as React from "react";
import LeadForm from "@/components/LeadForm";

type LeadModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectName?: string;
  projectSlug?: string;
  whatsUrl: string; // e.g. https://wa.me/5531996090508
};

export default function LeadModal({
  open,
  onOpenChange,
  projectName,
  projectSlug,
  whatsUrl,
}: LeadModalProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-full p-1 text-slate-500 hover:bg-slate-100"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>

        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          Quero ser atendido
        </h2>
        <p className="mb-4 text-sm text-slate-600">
          Preencha seus dados e abriremos o WhatsApp para continuar o atendimento.
        </p>

        <LeadForm
          projectName={projectName}
          projectSlug={projectSlug}
          onSubmitted={() => {
            try {
              window.open(whatsUrl, "_blank");
            } catch {}
            onOpenChange(false);
          }}
        />
      </div>
    </div>
  );
}
