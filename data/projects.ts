// data/projects.ts
export type Range = [number, number];

export type Project = {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  bedrooms: number[];      // exemplo: [1,2,3]
  bathrooms: number[];     // exemplo: [1,2]
  parking: number[];       // exemplo: [1,2]
  areaM2: Range;           // exemplo: [48,106]
  priceFrom: number;       // 410000 etc
  soldPercent?: number;    // 0..100
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];
  visible?: boolean;       // para ocultar na front
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
    areaM2: [55, 119],
    priceFrom: 410000,
    soldPercent: 96,
    cover: { src: "/images/reserva-dos-buritis/fachada.jpg", alt: "Fachada" },
    images: [
      { src: "/images/reserva-dos-buritis/001.jpg", alt: "Área comum 001" },
      // ...demais imagens, sempre string do /public
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
    cover: { src: "/images/vivence-lagoa/fachada.jpg", alt: "Fachada" },
    images: [
      { src: "/images/vivence-lagoa/001.jpg", alt: "Área comum 001" },
      // ...
    ],
    visible: true,
  },
  // Eleva Residence etc.
];
