// data/properties.ts
export type Property = {
  slug: string;
  title: string;
  city: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: number; // 0 = não mostra vagas
  areaMin: number;
  areaMax: number;
  priceFrom: number;
  soldPercent: number;
  images: string[]; // caminhos relativos a /public
  plans: { label: string; image: string; pdf?: string }[];
  amenities: string[];
  updatedAt: string; // ISO yyyy-mm-dd
};

export const PROPERTIES: Property[] = [
  {
    slug: "vivence-lagoa-2q",
    title: "Vivence Lagoa – 2 quartos",
    city: "Belo Horizonte",
    neighborhood: "Pampulha",
    address: "Rua Guapiara, 123 – Pampulha, BH",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaMin: 62,
    areaMax: 78,
    priceFrom: 499900,
    soldPercent: 72,
    // ATENÇÃO: nome exatamente como está em /public/images
    images: ["/images/Fachada1.jpg"],
    plans: [{ label: "Planta 2Q", image: "/images/01Porcaro-BeEasy-104.jpg", pdf: "#" }],
    amenities: ["Piscina", "Coworking", "Pet place", "Playground"],
    updatedAt: "2025-09-01",
  },
];
