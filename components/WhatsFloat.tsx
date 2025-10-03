"use client";

import Image from "next/image";
import site from "@/config/site";

function waLink(text?: string) {
  try {
    const raw = (site as any)?.whatsappPhone || (site as any)?.whatsapp || "";
    const phone = String(raw).replace(/\D/g, "");
    const url = new URL(`https://wa.me/${phone || ""}`);
    if (text) url.searchParams.set("text", text);
    return url.toString();
  } catch {
    return "#";
  }
}

export default function WhatsFloat() {
  return (
    <a
      href={waLink()} // <— sem CTA
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg ring-1 ring-black/5 transition hover:brightness-95"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={28}
        height={28}
        className="h-7 w-7"
        priority
      />
    </a>
  );
}
