import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "../../../data/properties";

function currencyBR(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type PageProps = { params: { slug: string } };

// Ícone WhatsApp (mesmo visual do flutuante)
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
        <path fill="#fff" d="M19.11 17.37a6.87 6.87 0 0 1-3.18-3.18c-.14-.29-.08-.64.15-.86l.7-.7a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.65.65c-.82.82-1.04 2.06-.56 3.12 1.07 2.4 3.02 4.35 5.42 5.42 1.06.48 2.3.26 3.12-.56l.65-.65a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.7.7c-.22.23-.57.29-.86.15z"/>
        <path fill="#fff" d="M16 3.5A12.5 12.5 0 0 0 4.64 22.62l-1 3.5 3.58-.94A12.5 12.5 0 1 0 16 3.5zm0 22.18c-2.14 0-4.19-.67-5.9-1.92l-.42-.3-2.12.56.58-2.04-.31-.46A9.83 9.83 0 1 1 25.83 16 9.84 9.84 0 0 1 16 25.68z"/>
      </svg>
    </a>
  );
}

export default function Page({ params }: PageProps) {
  const p = PROPERTIES.find((x) => x.slug === params.slug);

  if (!p) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-slate-500">Imóvel não encontrado.</p>
        <Link className="text-blue-700 underline" href="/">Voltar</Link>
      </div>
    );
  }

  // Título e endereço (mantendo seu layout atual)
  const title = (p.title.split("–")[0] || p.title).trim();
  const address = "Rua Augusto Moreira, nº 807 – Santa Amélia, Belo Horizonte";

  // Faixas com fallback para valores pontuais
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

  // Lazer/conveniência curado (pode trocar para p.amenities quando quiser)
  const curatedAmenities: string[] = [
    "Salão de festas",
    "Solarium",
    "Piscina adulto",
    "Piscina infantil",
    "Espaço de convivência",
    "Playground",
    "Academia",
    "Pet Place",
  ];

  const waText = encodeURIComponent("Olá! Tenho interesse no " + p.title);
  const waLink = `https://wa.me/5531996090508?text=${waText}`;

  return (
    <div className="min-h-screen bg-[#F5F8FD] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#173F7A]" />
            <span className="font-serif text-xl text-[#173F7A]">EasyLar</span>
          </div>
          <Link className="rounded-xl border px-4 py-2" href="/">Voltar</Link>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-4 py-6 text-gray-900">
        {/* Título + Endereço */}
        <h1 className="font-serif text-2xl text-[#173F7A]">{title}</h1>
        <p className="text-slate-500">{address}</p>

        {/* Galeria + Condições */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          {/* Imagem de capa usando <Image /> para otimização */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            {p.images?.length ? (
              <Image
                src={p.images[0]}
                alt={p.title}
                width={1200}
                height={800}
                className="w-full h-64 object-cover"
                priority
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-slate-600">
                Sem imagem
              </div>
            )}
          </div>

          {/* Condições + WhatsApp */}
          <aside className="rounded-2xl bg-white border border-slate-200 p-4">
            <div className="text-slate-500 text-sm">Condições</div>
            <div className="font-extrabold text-xl">
              A partir de {currencyBR(p.priceFrom)}
            </div>
            <div className="text-slate-500 text-xs mt-1">
              Fluxo de pagamento personalizado.
            </div>

            <div className="mt-3">
              <WhatsAppIcon href={waLink} />
            </div>
          </aside>
        </div>

        {/* Especificações + Lazer e conveniência */}
        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Especificações (4 mini-cards) */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="font-semibold text-[#173F7A] mb-3 text-center">
              Especificações
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 place-items-center">
              {/* Quartos */}
              <div className="w-full max-w-[180px] h-[112px] border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 text-slate-600">
                  {/* cama */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 7h10a3 3 0 0 1 3 3v1h1a2 2 0 0 1 2 2v5h-2v-3H4v3H2v-9a2 2 0 0 1 2-2zm0 6h13v-3a1 1 0 0 0-1-1H4v4z"/>
                  </svg>
                  <span className="text-[13px] font-medium">Quartos</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-[#173F7A] whitespace-nowrap">
                  {bedsLabel}
                </div>
              </div>

              {/* Banheiros */}
              <div className="w-full max-w-[180px] h-[112px] border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 text-slate-600">
                  {/* chuveiro */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5a5 5 0 0 1 10 0v2h-2V5a3 3 0 0 0-6 0v2H7V5zm-2 6h14v2H5v-2zm2 5a1 1 0 1 0 0 2h.01A1 1 0 0 0 7 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 11 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 15 16z"/>
                  </svg>
                  <span className="text-[13px] font-medium">Banheiros</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-[#173F7A] whitespace-nowrap">
                  {bathsLabel}
                </div>
              </div>

              {/* Vagas */}
              <div className="w-full max-w-[180px] h-[112px] border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 text-slate-600">
                  {/* carro */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6h-2v-2H7v2H5v-6zm2.2-2h9.6l-.8-2.5a.5.5 0 0 0-.5-.5H8.4a.5.5 0 0 0-.5.5L7.2 9zM7 17.5A1.5 1.5 0 1 0 7 14.5a1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  </svg>
                  <span className="text-[13px] font-medium">Vagas</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-[#173F7A] whitespace-nowrap">
                  {parkingLabel}
                </div>
              </div>

              {/* Área */}
              <div className="w-full max-w-[180px] h-[112px] border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 text-slate-600">
                  {/* régua */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 7l4-4 14 14-4 4L3 7zm4-1.6L4.6 7.8l1.6 1.6L9.2 7 7 5.4zm3.6 3.6l-2.2 2.2 1.6 1.6 2.2-2.2-1.6-1.6z"/>
                  </svg>
                  <span className="text-[13px] font-medium">Área</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-[#173F7A] whitespace-nowrap">
                  {areaLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Lazer e conveniência */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="font-semibold text-[#173F7A] mb-3">Lazer e conveniência</h2>
            <ul className="flex flex-wrap gap-2">
              {curatedAmenities.map((a) => (
                <li key={a} className="border border-slate-200 rounded-full px-3 py-1 text-xs">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
}
