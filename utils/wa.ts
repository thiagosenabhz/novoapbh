// C:\Users\Usuario\novoapbh\utils\wa.ts

import site from "@/config/site";

// Gera o link do WhatsApp removendo tudo que não for dígito do telefone
export function waLink(text: string): string {
  const phone = (site.whatsappPhone ?? "").toString().replace(/\D/g, "");
  const encoded = encodeURIComponent(text ?? "");
  return `https://wa.me/${phone}?text=${encoded}`;
}
