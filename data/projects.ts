// data/projects.ts

export type Range = [number, number];

export type Project = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;

  // faixas exibidas nas especificações
  bedrooms: Range;   // ex.: [1, 3]
  bathrooms: Range;  // ex.: [1, 2]
  parking: Range;    // ex.: [1, 2]
  areaM2: Range;     // ex.: [48, 106]

  priceFrom: number; // menor preço anunciado
  soldPercent?: number; // opcional, exibe “96% vendido” quando existir
  conditionNote?: string; // texto livre do painel “Informações complementares”

  // cálculo automático do estágio (opcionais, mas recomendados)
  // formato: "YYYY-MM-DD"
  workStart?: string;     // data prevista/real de início de obra
  workDelivery?: string;  // data prevista de entrega

  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];

  amenities: string[];

  // controle de visibilidade na frontpage
  visible: boolean;
};

export const projects: Project[] = [
  {
    slug: "reserva-dos-buritis",
    name: "Reserva dos Buritis",
    city: "Belo Horizonte",
    neighborhood: "A definir",

    bedrooms: [1, 3],
    bathrooms: [1, 2],
    parking: [1, 2],
    areaM2: [48, 106],

    priceFrom: 410000,
    soldPercent: 96,
    conditionNote: "Fluxo de pagamento personalizado.",
    // ajuste se tiver as datas
    workStart: "2024-02-01",
    workDelivery: "2026-08-31",

    cover: { src: "/images/reserva-dos-buritis/fachada.jpg", alt: "Fachada" },
    images: [
      { src: "/images/reserva-dos-buritis/001.jpg", alt: "Área comum 001" },
      { src: "/images/reserva-dos-buritis/002.jpg", alt: "Área comum 002" },
      { src: "/images/reserva-dos-buritis/003.jpg", alt: "Área comum 003" },
      { src: "/images/reserva-dos-buritis/004.jpg", alt: "Área comum 004" },
      { src: "/images/reserva-dos-buritis/005.jpg", alt: "Área comum 005" },
      { src: "/images/reserva-dos-buritis/006.jpg", alt: "Área comum 006" },
    ],

    amenities: [
      "Salão de festas",
      "Bicicletário",
      "Praça",
      "Playground",
      "Pet Place",
      "Ginástica descoberta",
      "Churrasqueira",
      "Piscina adulto",
      "Piscina infantil",
      "Solarium",
      "SPA",
      "Quadra infantil",
      "Quadra",
    ],

    visible: true,
  },

  {
    slug: "vivence-lagoa-2q",
    name: "Vivence Lagoa",
    city: "Belo Horizonte",
    neighborhood: "Santa Amélia",

    bedrooms: [1, 3],
    bathrooms: [1, 2],
    parking: [1, 2],
    areaM2: [55, 119],

    priceFrom: 499900,
    soldPercent: 76,
    conditionNote: "Fluxo de pagamento personalizado.",
    // ajuste se tiver as datas
    workStart: "2023-11-01",
    workDelivery: "2025-12-15",

    cover: { src: "/images/vivence-lagoa/fachada.jpg", alt: "Fachada" },
    images: [
      { src: "/images/vivence-lagoa/001.jpg", alt: "Área comum 001" },
      { src: "/images/vivence-lagoa/002.jpg", alt: "Área comum 002" },
      { src: "/images/vivence-lagoa/003.jpg", alt: "Área comum 003" },
      { src: "/images/vivence-lagoa/004.jpg", alt: "Área comum 004" },
      { src: "/images/vivence-lagoa/005.jpg", alt: "Área comum 005" },
      { src: "/images/vivence-lagoa/006.jpg", alt: "Área comum 006" },
    ],

    amenities: [
      "Salão de festas",
      "Bicicletário",
      "Praça",
      "Playground",
      "Pet Place",
      "Ginástica descoberta",
      "Churrasqueira",
      "Piscina adulto",
      "Piscina infantil",
      "Solarium",
      "SPA",
      "Quadra infantil",
      "Quadra",
    ],

    visible: true,
  },
];
