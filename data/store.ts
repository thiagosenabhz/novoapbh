// C:\Users\Usuario\novoapbh\data\store.ts
export type Range = [number, number];

export type Project = {
  slug: string;
  visible: boolean;
  preLaunch: boolean;
  soldPercent: number;
  name: string;
  city: string;
  neighborhood: string;
  types: {
    studio: boolean; q1: boolean; q2: boolean; q3: boolean; privativa: boolean; cobertura: boolean;
  };
  bedrooms: Range;
  bathrooms: Range;
  parking: Range;
  areaM2: Range;
  priceFrom: number;
  conditionNote: string;
  amenities: string[];
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];
};

export type Db = { projects: Project[] };

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
