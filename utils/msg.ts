// C:\Users\Usuario\novoapbh\utils\msg.ts

// Centralizamos textos que variam por contexto
export const msg = {
  home: (): string =>
    "Olá! Vi os imóveis no EasyLar e quero agendar uma visita.",

  visitaProjeto: (projectName: string): string =>
    `Olá! Gostei do ${projectName} e quero agendar uma visita para conhecer mais.`,
};

export default msg;
