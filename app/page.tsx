\"use client\";

import Image from \"next/image\";
import Link from \"next/link\";
import React from \"react\";
import { brl, type Project } from \"@/data/store\";
import WhatsAppFloatingButton from \"@/components/WhatsAppFloatingButton\";
import LeadModal from \"@/components/LeadModal\";

const WHATS_URL = \"https://wa.me/5531996090508\"; // configurável
const INSTAGRAM = \"https://instagram.com/corretorthiagobh\";

async function fetchProjects(): Promise<Project[]> {
  const r = await fetch(\"/api/projects\", { cache: \"no-store\" });
  return await r.json();
}

type Filters = {
  city?: string;
  neighborhood?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  parking?: number;
};

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr)).sort((a: any, b: any) => (a > b ? 1 : a < b ? -1 : 0));
}

export default function Page() {
  const [list, setList] = React.useState<Project[]>([]);
  const [ready, setReady] = React.useState(false);
  const [leadOpen, setLeadOpen] = React.useState(false);

  React.useEffect(() => {
    fetchProjects().then((p) => { setList(p.filter(x => x.visible)); setReady(true); });
  }, []);

  const cities = unique(list.map((p) => p.city));
  const neighborhoods = unique(list.map((p) => p.neighborhood));
  const pricePoints = unique(list.map((p) => p.priceFrom));
  const bedroomsAll = unique(list.flatMap((p) => Array.from({ length: p.bedrooms[1] - p.bedrooms[0] + 1 }, (_, i) => p.bedrooms[0] + i)));
  const parkingAll = unique(list.flatMap((p) => Array.from({ length: p.parking[1] - p.parking[0] + 1 }, (_, i) => p.parking[0] + i)));

  const [filters, setFilters] = React.useState<Filters>({});

  const filtered = list.filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.neighborhood && p.neighborhood !== filters.neighborhood) return false;
    if (filters.priceMin && p.priceFrom < filters.priceMin) return false;
    if (filters.priceMax && p.priceFrom > filters.priceMax) return false;
    if (filters.bedrooms) {
      const [min, max] = p.bedrooms;
      if (filters.bedrooms < min || filters.bedrooms > max) return false;
    }
    if (filters.parking) {
      const [min, max] = p.parking;
      if (filters.parking < min || filters.parking > max) return false;
    }
    return true;
  });

  return (
    <main className=\"mx-auto max-w-6xl px-4 py-6\">
      {/* Floating WhatsApp (abre o modal) */}
      <WhatsAppFloatingButton whatsUrl={WHATS_URL} />

      <div className=\"mb-6 flex items-center justify-between\">
        <div className=\"flex items-center gap-3\">
          <div className=\"h-8 w-8 rounded-full bg-slate-900\" />
          <div>
            <div className=\"text-lg font-semibold text-slate-900\">EasyLar</div>
            <div className=\"text-xs text-slate-500\">Fácil de achar, fácil de morar.</div>
          </div>
        </div>
        <div className=\"flex items-center gap-3\">
          <button onClick={() => setLeadOpen(true)} className=\"rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700\">
            Quero saber mais
          </button>
          <Link href=\"/admin\" className=\"rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50\">
            Admin
          </Link>
        </div>
      </div>

      <h1 className=\"mb-4 text-3xl font-semibold text-slate-900\">
        O portal dos lançamentos imobiliários em BH.
      </h1>

      {/* Filtros */}
      <div className=\"mb-8 grid grid-cols-1 gap-3 md:grid-cols-6\">
        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.city ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value || undefined }))}>
          <option value=\"\">Cidade</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.neighborhood ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, neighborhood: e.target.value || undefined }))}>
          <option value=\"\">Bairro</option>
          {neighborhoods.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>

        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.priceMin ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value ? Number(e.target.value) : undefined }))}>
          <option value=\"\">Preço mín (R$)</option>
          {pricePoints.map((p) => <option key={`min-${p}`} value={p}>{brl(p)}</option>)}
        </select>

        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.priceMax ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value ? Number(e.target.value) : undefined }))}>
          <option value=\"\">Preço máx (R$)</option>
          {pricePoints.map((p) => <option key={`max-${p}`} value={p}>{brl(p)}</option>)}
        </select>

        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.bedrooms ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, bedrooms: e.target.value ? Number(e.target.value) : undefined }))}>
          <option value=\"\">Quartos</option>
          {bedroomsAll.map((q) => <option key={q} value={q}>{q}</option>)}
        </select>

        <select className=\"rounded-lg border border-slate-300 px-3 py-2\"
          value={filters.parking ?? \"\"} onChange={(e) => setFilters((f) => ({ ...f, parking: e.target.value ? Number(e.target.value) : undefined }))}>
          <option value=\"\">Vagas</option>
          {parkingAll.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {/* Cards – 3 por linha */}
      <div className=\"grid gap-6 md:grid-cols-3\">
        {ready && filtered.map((p) => (
          <article key={p.slug} className=\"overflow-hidden rounded-2xl border border-slate-200 bg-white\">
            <Link href={`/imovel/${p.slug}`} className=\"block\">
              <div className=\"relative h-56 w-full overflow-hidden\">
                <Image src={p.cover.src} alt={p.cover.alt} fill className=\"object-cover\" sizes=\"(max-width:768px)100vw,400px\" />
                {p.preLaunch ? (
                  <div className=\"absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white\">Pré-lançamento</div>
                ) : (
                  <div className=\"absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white\">{p.soldPercent}% vendido</div>
                )}
                <div className=\"absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-blue-900 shadow\">
                  {brl(p.priceFrom)}
                </div>
              </div>
            </Link>

            <div className=\"p-4\">
              <div className=\"text-lg font-semibold text-slate-900\">{p.name}</div>
              <div className=\"text-sm text-slate-500\">{p.neighborhood} • {p.city}</div>

              <div className=\"mt-3 grid grid-cols-4 gap-3 text-xs text-slate-700\">
                <div><div className=\"text-slate-500\">quartos</div><div className=\"font-semibold\">{p.bedrooms[0]} a {p.bedrooms[1]}</div></div>
                <div><div className=\"text-slate-500\">banheiros</div><div className=\"font-semibold\">{p.bathrooms[0]} a {p.bathrooms[1]}</div></div>
                <div><div className=\"text-slate-500\">vagas</div><div className=\"font-semibold\">{p.parking[0]} a {p.parking[1]}</div></div>
                <div><div className=\"text-slate-500\">área</div><div className=\"font-semibold\">{p.areaM2[0]} a {p.areaM2[1]} m²</div></div>
              </div>

              <div className=\"mt-4 flex items-center gap-3\">
                <Link href={`/imovel/${p.slug}`} className=\"rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50\">Ver detalhes</Link>
                <button onClick={() => setLeadOpen(true)} className=\"rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700\">
                  Quero saber mais
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className=\"mt-10 border-t border-slate-200 py-6 text-sm text-slate-500\">
        © 2025 EasyLar • <a className=\"text-blue-700 hover:underline\" href={INSTAGRAM} target=\"_blank\" rel=\"noopener noreferrer\">Instagram @corretorthiagobh</a>
      </footer>

      {/* Modal global acionado pela Home */}
      <LeadModal open={leadOpen} onOpenChange={setLeadOpen} whatsUrl={WHATS_URL} />
    </main>
  );
}
