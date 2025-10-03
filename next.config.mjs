/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ignora o ESLint DURANTE O BUILD (Vercel)
  eslint: {
    ignoreDuringBuilds: true
  },

  // Se você usa imagens locais, isso é seguro;
  // se usar remotas, ajuste "images.domains" conforme necessário.
  images: {
    unoptimized: true
  }
};

export default nextConfig;
