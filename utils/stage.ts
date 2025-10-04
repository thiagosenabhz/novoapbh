// utils/stage.ts
export type StageKey = "pre" | "iniciadas" | "avancadas" | "entregue";

/**
 * Calcula o estágio da obra a partir de duas datas (ISO: YYYY-MM-DD).
 * - "pre"       = antes da obra iniciar
 * - "iniciadas" = entre início e metade do período total
 * - "avancadas" = entre a metade e a data de entrega
 * - "entregue"  = data atual >= entrega
 */
export function calcStage(
  workStart?: string,
  workDelivery?: string,
  now = new Date()
): StageKey {
  if (!workStart || !workDelivery) return "pre";
  const start = new Date(workStart).getTime();
  const end = new Date(workDelivery).getTime();
  const cur = now.getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) return "pre";
  if (cur >= end) return "entregue";
  if (cur < start) return "pre";

  const total = end - start;
  const done = cur - start;
  const pct = total > 0 ? done / total : 0;

  return pct < 0.5 ? "iniciadas" : "avancadas";
}

export function stageLabel(s: StageKey): string {
  switch (s) {
    case "pre":
      return "Pré-lançamento";
    case "iniciadas":
      return "Obras iniciadas";
    case "avancadas":
      return "Obras avançadas";
    case "entregue":
      return "Obra entregue";
  }
}
