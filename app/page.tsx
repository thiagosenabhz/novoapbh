import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "../data/properties";

function currencyBR(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function WhatsAppFab() {
  const href = `https://wa.me/5531996090508?text=${encodeURIComponent(
    "Olá! Gostaria de realizar uma simulação para um imóvel."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg ring-1 ring-black/10"
      style={{ background: "#25D366" }}
      aria-label="Fale no WhatsApp"
      title="Fale no WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path fill="#fff" d="M19.11 17.37a6.87 6.87 0 0 1-3.18-3.18c-.14-.29-.08-.64.15-.86l.7-.7a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.65.65c-.82.82-1.04 2.06-.56 3.12 1.07 2.4 3.02 4.35 5.42 5.42 1.06.48 2.3.26 3.12-.56l.65-.65a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.7.7c-.22.23-.57.29-.86.15z"/>
        <path fill="#fff" d="M16 3.5A12.5 12.5 0 0 0 4.64 22.62l-1 3.5 3.58-.94A12.5 12.5 0 1 0 16 3.5zm0 22.18c-2.14 0-4.19-.67-5.9-1.92l-.42-.3-2.12.56.58-2.04-.31-.46A9.83 9.83 0 1 1 25.83 16 9.84 9.84 0 0 1 16 25.68z"/>
      </svg>
    </a>
  );
}

export default function Home() {
  const items = PROPERTIES; // pode listar todos
  return (
    <div className="min-h-screen bg-[#F5F8FD] text-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#173F7A]" />
            <span className="font-serif text-xl text-[#173F7A]">EasyLar</span>
          </div>

          {/* PT / EN */}
          <div className="flex items-center gap-2">
            <button className="rounded-xl px-3 py-1 border text-sm hover:bg-slate-50" aria-label="Português">
              PT
            </button>
            <button className="rounded-xl px-3 py-1 border text-sm hover:bg-slate-50" aria-label="Inglês">
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <h1 className="font-serif text-[28px] md:text-[34px] leading-tight text-[#173F7A]">
          Fácil de achar, fácil de morar.
        </h1>
        <p className="text-slate-600 mt-1">
          Condições sob medida • Atendimento consultivo • Portfólio selecionado em BH e Região
        </p>
      </section>

      {/* Lista de imóveis */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-6">
          {items.map((p) => (
            <article key={p.slug} className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
              {/* imagem */}
              <div className="w-full h-56 md:h-64 overflow-hidden">
                {p.images?.length ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* conteúdo */}
              <div className="p-4 relative">
                {/* preço no topo direito */}
                <div className="absolute right-4 top-4 text-right">
                  <div className="text-xs text-slate-500">a partir de</div>
                  <div className="font-extrabold text-[#173F7A]">
                    {currencyBR(p.priceFrom)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold">{
                  (p.title.split("–")[0] || p.title).trim()
                }</h3>
                <p className="text-sm text-slate-500">
                  {p.neighborhood} • {p.city}
                </p>

                {/* especificações com ícones */}
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* quartos */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 7h10a3 3 0 0 1 3 3v1h1a2 2 0 0 1 2 2v5h-2v-3H4v3H2v-9a2 2 0 0 1 2-2zm0 6h13v-3a1 1 0 0 0-1-1H4v4z"/>
                    </svg>
                    <span>{p.bedrooms}</span>
                  </div>

                  {/* banheiros */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 5a5 5 0 0 1 10 0v2h-2V5a3 3 0 0 0-6 0v2H7V5zm-2 6h14v2H5v-2zm2 5a1 1 0 1 0 0 2h.01A1 1 0 0 0 7 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 11 16zm4 0a1 1 0 1 0 0 2h.01A1 1 0 0 0 15 16z"/>
                    </svg>
                    <span>{p.bathrooms}</span>
                  </div>

                  {/* vagas */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6h-2v-2H7v2H5v-6zm2.2-2h9.6l-.8-2.5a.5.5 0 0 0-.5-.5H8.4a.5.5 0 0 0-.5.5L7.2 9zM7 17.5A1.5 1.5 0 1 0 7 14.5a1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span>{p.parking}</span>
                  </div>

                  {/* área */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 7l4-4 14 14-4 4L3 7zm4-1.6L4.6 7.8l1.6 1.6L9.2 7 7 5.4zm3.6 3.6l-2.2 2.2 1.6 1.6 2.2-2.2-1.6-1.6z"/>
                    </svg>
                    <span>
                      {p.areaMin}–{p.areaMax} m²
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/imovel/${p.slug}`}
                    className="rounded-xl border px-4 py-2 font-medium hover:bg-slate-50"
                  >
                    Ver detalhes
                  </Link>

                  {/* WhatsApp bolinha */}
                  <a
                    href={`https://wa.me/5531996090508?text=${encodeURIComponent(
                      "Olá! Tenho interesse no " + p.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow ring-1 ring-black/10"
                    style={{ background: "#25D366" }}
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
                      <path fill="#fff" d="M19.11 17.37a6.87 6.87 0 0 1-3.18-3.18c-.14-.29-.08-.64.15-.86l.7-.7a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.65.65c-.82.82-1.04 2.06-.56 3.12 1.07 2.4 3.02 4.35 5.42 5.42 1.06.48 2.3.26 3.12-.56l.65-.65a.9.9 0 0 0 0-1.27l-1.54-1.54a.9.9 0 0 0-1.27 0l-.7.7c-.22.23-.57.29-.86.15z"/>
                      <path fill="#fff" d="M16 3.5A12.5 12.5 0 0 0 4.64 22.62l-1 3.5 3.58-.94A12.5 12.5 0 1 0 16 3.5zm0 22.18c-2.14 0-4.19-.67-5.9-1.92l-.42-.3-2.12.56.58-2.04-.31-.46A9.83 9.83 0 1 1 25.83 16 9.84 9.84 0 0 1 16 25.68z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="border-t border-slate-200 py-6 mt-6">
        <div className="max-w-6xl mx-auto px-4 text-sm text-slate-600">
          © {new Date().getFullYear()} EasyLar • WhatsApp: +55 31 99609-0508 • Instagram:{" "}
          <a
            href="https://www.instagram.com/corretorthiagobh/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @corretorthiagobh
          </a>
        </div>
      </footer>

      {/* FAB WhatsApp */}
      <WhatsAppFab />
    </div>
  );
}
