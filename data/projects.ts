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

  // faixa de preços e status de vendas
  priceFrom: number;   // menor preço anunciado
  soldPercent?: number; // percentual opcional: exibe “96% vendido” quando existir
  conditionNote?: string; // texto livre do painel lateral “Informações complementares”

  // cálculo automático de estágio (opcionais, mas recomendados)
  // formato: "YYYY-MM-DD"
  workStart?: string;     // data prevista/real de início da obra
  workDelivery?: string;  // data prevista de entrega

  // imagens principais
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];

  // itens de lazer e conveniência
  amenities: string[];

  // controle de visibilidade na frontpage
  visible: boolean;
};
