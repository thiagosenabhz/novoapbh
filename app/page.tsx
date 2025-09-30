import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "../data/properties";

function currencyBR(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function displayTitle(raw: string) {
  const [name] = raw.split("–");
  return name.trim();
}

// Ícones
function IconBed() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-600" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 7h10a3 3 0 0 1 3 3v1h1a2 2 0 0 1 2 2v5h-2v-3H4v3H2v-9a2 2 0 0 1 2-2zm0 6h13v-3a1 1 0 0 0-1-1H4v4z"
      />
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-600" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 5a5 5 0 0 1 10 0v2h-2V5a3 3 0 0 0-6 0v2H7V5zm-2 6h14v2H5v-2zm2 5a1 1 0 1 0 0 2h.01A1 1 0 0 0 7 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 11 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 15 16z"
      />
    </svg>
  );
}
function IconCar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-600" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6h-2v-2H7v2H5v-6zm2.2-2h9.6l-.8-2.5a.5.5 0 0 0-.5-.5H8.4a.5.5 0 0 0-.5.5L7.2 9zM7 17.5A1.5 1.5 0 1 0 7 14.5a1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      />
    </svg>
  );
}
function IconRuler() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-600" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 7l4-4 14 14-4 4L3 7zm4-1.6L4.6 7.8l1.6 1.6L9.2 7 7 5.4zm3.6 3.6l-2.2 2.2 1.6 1.6 2.2-2.2-1.6-1.6z"
      />
    </svg>
  );
}

// Botão/ícone WA (mesmo visual do flutuante)
function WhatsAppIcon({ href, title = "WhatsApp" }: { href: string; title?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow ring-1 ring-black/10"
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
        <path
          fill="#fff"
          d="M19.11 17.37a6.87 6.87 0 0 1-3.18-3.18c-.14-.29-.08-.64.15-.86l.7-.7a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.65.65c-.82.82-1.04 2.06-.56 3.12 1.07 2.4 3.02 4.35 5.42 5.42 1.06.48 2.3.26 3.12-.56l.65-.65a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.7.7c-.22.23-.57.29-.86.15z"
        />
        <path
          fill="#fff"
          d="M16 3.5A12.5 12.5 0 0 0 4.64 22.62l-1 3.5 3.58-.94A12.5 12.5 0 1 0 16 3.5zm0 22.18c-2.14 0-4.19-.67-5.9-1.92l-.42-.3-2.12.56.58-2.04-.31-.46A9.83 9.83 0 1 1 25.83 16 9.84 9.84 0 0 1 16 25.68z"
        />
      </svg>
    </a>
  );
}

export default function Home({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = searchParams?.lang === "en" ? "en" : "pt";
  const waText = encodeURIComponent("Olá! Gostaria de realizar uma simulação para um imóvel.");
  const waLink = `https://wa.me/5531996090508?text=${waText}`;

  return (
    <div className="min-h-screen bg-[#F5F8FD] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#173F7A]" />
            <span className="font-serif text-xl text-[#173F7A]">EasyLar</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs">
              <Link href="/?lang=pt" className={lang === "pt" ? "font-semibold text-[#173F7A]" : "text-slate-500 hover:text-slate-700"}>PT</Link>
              <span className="mx-1 text-slate-300">|</span>
              <Link href="/?lang=en" className={lang === "en" ? "font-semibold text-[#173F7A]" : "text-slate-500 hover:text-slate-700"}>EN</Link>
            </div>
            <a
              href="https://www.instagram.com/corretorthiagobh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#173F7A] underline hover:no-underline"
            >
              Instagram
            </a>
            <WhatsAppIcon href={waLink} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl text-[#173F7A]">Fácil de achar, fácil de morar.</h1>
        <p className="mt-2 text-slate-600">
          Condições sob medida • Atendimento consultivo • Portfólio selecionado em BH e Região
        </p>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          {PROPERTIES.map((p) => {
            const title = displayTitle(p.title);
            const cover = p.images?.[0]?.trim() ? p.images[0] : "/images/sample1.jpg";
            const showScarcity = (p.soldPercent ?? 0) >= 60;

            // ▼▼▼ Labels de FAIXA (com fallback para valores pontuais) ▼▼▼
            const bedsLabel =
              p.bedroomsMin != null && p.bedroomsMax != null
                ? `${p.bedroomsMin} a ${p.bedroomsMax}`
                : p.bedrooms != null
                ? String(p.bedrooms)
                : "—";

            const bathsLabel =
              p.bathroomsMin != null && p.bathroomsMax != null
                ? `${p.bathroomsMin} a ${p.bathroomsMax}`
                : p.bathrooms != null
                ? String(p.bathrooms)
                : "—";

            const parkingLabel =
              p.parkingMin != null && p.parkingMax != null
                ? `${p.parkingMin} a ${p.parkingMax}`
                : p.parking != null
                ? String(p.parking)
                : "—";

            const areaLabel = `${p.areaMin} a ${p.areaMax} m²`;
            // ▲▲▲-----------------------------------------------▲▲▲

            return (
              <div key={p.slug} className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={cover}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                  {showScarcity && (
                    <div className="absolute left-3 top-3 bg-[#e85b3c] text-white text-xs font-semibold rounded-full px-3 py-1">
                      {p.soldPercent}% vendido
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-slate-500 text-sm">
                        {p.neighborhood} • {p.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">a partir de</div>
                      <div className="font-extrabold">{currencyBR(p.priceFrom)}</div>
                    </div>
                  </div>

                  {/* Especificações com FAIXAS */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2">
                      <IconBed />
                      <span className="text-sm text-slate-800">{bedsLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconBath />
                      <span className="text-sm text-slate-800">{bathsLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconCar />
                      <span className="text-sm text-slate-800">{parkingLabel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconRuler />
                      <span className="text-sm text-slate-800">{areaLabel}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/imovel/${p.slug}`}
                      className="rounded-xl border font-semibold px-4 py-2 hover:bg-gray-50"
                    >
                      Ver detalhes
                    </Link>
                    <WhatsAppIcon href={waLink} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-slate-600">
          © 2025 <span className="font-semibold">EasyLar</span> • WhatsApp: +55 31 99609-0508 •{" "}
          Instagram:{" "}
          <a
            href="https://www.instagram.com/corretorthiagobh/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            @corretorthiagobh
          </a>
        </div>
      </footer>
    </div>
  );
}
