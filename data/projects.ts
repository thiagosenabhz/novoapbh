// C:\Users\Usuario\novoapbh\data\projects.ts

export type Range = [number, number];

export type Project = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  bedrooms: Range;     // [min, max]
  bathrooms: Range;    // [min, max]
  parking: Range;      // [min, max]
  areaM2: Range;       // [min, max] em m²
  priceFrom: number;   // valor base para "a partir de"
  priceLabel?: string; // se quiser sobrepor a formatação
  soldPercent?: number;
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
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
    cover: {
      src: "/images/vivence-lagoa/fachada.jpg",
      alt: "Fachada do Vivence Lagoa",
    },
    images: [
      { src: "/images/vivence-lagoa/fachada.jpg", alt: "Fachada" },
      { src: "/images/vivence-lagoa/001.jpg", alt: "Área interna 001" },
      { src: "/images/vivence-lagoa/002.jpg", alt: "Área comum 002" },
      { src: "/images/vivence-lagoa/003.jpg", alt: "Área comum 003" },
      { src: "/images/vivence-lagoa/004.jpg", alt: "Área comum 004" },
      { src: "/images/vivence-lagoa/005.jpg", alt: "Área comum 005" },
      { src: "/images/vivence-lagoa/006.jpg", alt: "Área comum 006" },
    ],
  },

  {
    slug: "reserva-dos-buritis",
    name: "Reserva dos Buritis",
    city: "Belo Horizonte",
    neighborhood: "A definir",
    bedrooms: [1, 3],
    bathrooms: [1, 2],
    parking: [1, 2],
    areaM2: [55, 119],
    priceFrom: 410000,
    soldPercent: 96,
    cover: {
      src: "/images/reserva-dos-buritis/fachada.jpg",
      alt: "Fachada do Reserva dos Buritis",
    },
    images: [
      { src: "/images/reserva-dos-buritis/fachada.jpg", alt: "Fachada" },
      { src: "/images/reserva-dos-buritis/001.jpg", alt: "Área 001" },
      { src: "/images/reserva-dos-buritis/002.jpg", alt: "Área 002" },
      { src: "/images/reserva-dos-buritis/003.jpg", alt: "Área 003" },
      { src: "/images/reserva-dos-buritis/004.jpg", alt: "Área 004" },
      { src: "/images/reserva-dos-buritis/005.jpg", alt: "Área 005" },
      { src: "/images/reserva-dos-buritis/006.jpg", alt: "Área 006" },
      { src: "/images/reserva-dos-buritis/007.jpg", alt: "Área 007" },
      { src: "/images/reserva-dos-buritis/008.jpg", alt: "Área 008" },
      { src: "/images/reserva-dos-buritis/009.jpg", alt: "Área 009" },
    ],
  },

  // NOVO EMPREENDIMENTO
  {
    slug: "eleva-residence",
    name: "Eleva Residence",
    city: "Belo Horizonte",
    neighborhood: "Savassi",
    bedrooms: [2, 3],
    bathrooms: [2, 3],
    parking: [1, 2],
    areaM2: [48, 106],
    priceFrom: 789000,
    soldPercent: 12,
    cover: {
      src: "/images/eleva-residence/fachada.jpg",
      alt: "Fachada do Eleva Residence",
    },
    images: [
      { src: "/images/eleva-residence/fachada.jpg", alt: "Fachada" },
      { src: "/images/eleva-residence/001.jpg", alt: "Área 001" },
      { src: "/images/eleva-residence/002.jpg", alt: "Área 002" },
      { src: "/images/eleva-residence/003.jpg", alt: "Área 003" },
    ],
  },
];

// Helpers
export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
