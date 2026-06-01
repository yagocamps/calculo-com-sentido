import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
  },
  // Esconde o indicador de rota do Next.js que aparece no canto durante o
  // desenvolvimento (só local; nunca aparece em produção). Erros de build e
  // runtime continuam sendo exibidos normalmente.
  devIndicators: false,
};

export default nextConfig;
