// data/projects.ts
// Define os tipos e reexporta os dados do projects.json.
// Mantém 100% compatível com a rota /api/projects e com as páginas.

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

// IMPORTA os dados do JSON e exporta tipado
// (requer "resolveJsonModule": true no tsconfig.json – já está ativo).
import raw from "./projects.json";

export const projects = (raw as { projects: Project[] }).projects;
export default projects;
