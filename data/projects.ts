// data/projects.ts
// Tipos + normalização do JSON ({ projects: [...] }) para Project[] seguro.

export type Range = [number, number];

export type Project = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;

  // faixas exibidas nas especificações
  bedrooms: Range;    // ex.: [1, 3]
  bathrooms: Range;   // ex.: [1, 2]
  parking: Range;     // ex.: [1, 2]
  areaM2: Range;      // ex.: [48, 106]

  // faixa de preços e status de vendas
  priceFrom: number;              // menor preço anunciado
  soldPercent?: number;           // opcional: exibe “96% vendido” quando existir
  conditionNote?: string;         // texto livre do painel lateral “Informações complementares”

  // cálculo automático de estágio (opcionais, mas recomendados)
  // formato: "YYYY-MM-DD"
  workStart?: string;             // data prevista/real de início de obra
  workDelivery?: string;          // data prevista de entrega

  // imagens principais
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];

  // itens de lazer e conveniência
  amenities: string[];

  // controle de visibilidade na frontpage
  visible: boolean;

  // existe no JSON atual; mantemos opcional
  preLaunch?: boolean;
};

// 1) Importa o JSON bruto { projects: [...] }
import raw from "./projects.json";

// 2) Define o formato cru esperado do arquivo JSON (arrays livres + campos extras)
type RawProject = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  bedrooms: number[];
  bathrooms: number[];
  parking: number[];
  areaM2: number[];
  priceFrom: number;
  soldPercent?: number;
  conditionNote?: string;
  workStart?: string;
  workDelivery?: string;
  cover: { src: string; alt: string };
  images?: { src: string; alt: string }[];
  amenities?: string[];
  visible: boolean;
  preLaunch?: boolean;
  // campo extra presente no JSON atual e ignorado no tipo final
  types?: unknown;
};

type RawFile = { projects: RawProject[] };

// 3) Utilitário para coerção segura de array -> tupla [min, max]
function toRange(arr: number[] | undefined, fallback: number = 0): Range {
  const a0 = arr?.[0];
  const a1 = arr?.[1];
  if (typeof a0 === "number" && typeof a1 === "number") return [a0, a1];
  if (typeof a0 === "number") return [a0, a0];
  return [fallback, fallback];
}

// 4) Normaliza e exporta já como Project[]
const rawFile = raw as unknown as RawFile;

export const projects: Project[] = (rawFile.projects ?? []).map((p) => ({
  slug: p.slug,
  name: p.name,
  city: p.city,
  neighborhood: p.neighborhood,
  bedrooms: toRange(p.bedrooms),
  bathrooms: toRange(p.bathrooms),
  parking: toRange(p.parking),
  areaM2: toRange(p.areaM2),
  priceFrom: p.priceFrom,
  soldPercent: p.soldPercent,
  conditionNote: p.conditionNote,
  workStart: p.workStart,
  workDelivery: p.workDelivery,
  cover: p.cover,
  images: p.images ?? [],
  amenities: p.amenities ?? [],
  visible: p.visible,
  preLaunch: p.preLaunch,
}));

export default projects;
