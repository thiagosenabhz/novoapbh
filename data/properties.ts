// data/properties.ts
export type Property = {
  slug: string;
  title: string;
  city: string;
  neighborhood: string;
  address: string;

  // Valores antigos (opcionais para fallback)
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;

  // NOVO: faixas exibidas na UI
  bedroomsMin?: number;
  bedroomsMax?: number;
  bathroomsMin?: number;
  bathroomsMax?: number;
  parkingMin?: number;
  parkingMax?: number;

  // Área já era faixa
  areaMin: number;
  areaMax: number;

  priceFrom: number;
  soldPercent: number;
  images: string[];
  plans: { label: string; image: string; pdf?: string }[];
  amenities: string[];
  updatedAt: string;
};

export const PROPERTIES: Property[] = [
  {
    slug: "vivence-lagoa-2q",
    title: "Vivence Lagoa – 2 quartos",
    city: "Belo Horizonte",
    neighborhood: "Pampulha",
    address: "Rua Guapiara, 123 – Pampulha, BH",

    // FAIXAS (iguais à sua referência)
    bedroomsMin: 1,
    bedroomsMax: 3,
    bathroomsMin: 1,
    bathroomsMax: 2,
    parkingMin: 1,
    parkingMax: 2,
    areaMin: 55,
    areaMax: 120,

    // Se quiser manter os pontuais para outros lugares, ok
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,

    priceFrom: 499900,
    soldPercent: 72,
    images: ["/images/fachada1.jpg"],
    plans: [{ label: "Planta 2Q", image: "/images/planta_2q.jpg", pdf: "#" }],
    amenities: ["Piscina", "Coworking", "Pet place", "Playground"],
    updatedAt: "2025-09-01",
  },
];
