// C:\Users\Usuario\novoapbh\utils\format.ts

// Formata ranges como "1 a 3"
export function fmtRange([min, max]: [number, number]): string {
  return `${min} a ${max}`;
}
