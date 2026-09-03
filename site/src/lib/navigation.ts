export type NavKey =
  | "home"
  | "teste"
  | "express"
  | "pre"
  | "calc"
  | "exerc"
  | "resumos"
  | "gloss"
  | "prog"
  | "sobre";

export const navItems: {
  key: NavKey;
  href: string;
  label: string;
  icon?: string;
  group?: string;
  dot?: string;
  sub?: boolean;
  badge?: string;
}[] = [
  { key: "home", href: "/", label: "Início", icon: "home" },
  { key: "teste", href: "/teste-de-nivel", label: "Teste de nível", icon: "teste" },
  {
    key: "express",
    href: "/trilha-expressa",
    label: "Socorro, tenho prova!",
    icon: "express",
  },
  { key: "pre", href: "/pre-calculo", label: "Trilha completa", group: "Pré-Cálculo", dot: "sage" },
  { key: "calc", href: "/calculo-1", label: "Trilha completa", group: "Cálculo 1", dot: "terracotta" },
  { key: "exerc", href: "/exercicios", label: "Exercícios", group: "Prática & Referência", icon: "exerc" },
  { key: "resumos", href: "/resumos", label: "Resumos rápidos", icon: "resumos" },
  { key: "gloss", href: "/glossario", label: "Glossário", icon: "gloss" },
  { key: "prog", href: "/progresso", label: "Meu progresso", group: "Você", icon: "prog" },
  { key: "sobre", href: "/sobre", label: "Sobre o projeto", icon: "sobre" },
];

export function navKeyFromPath(pathname: string): NavKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/teste-de-nivel")) return "teste";
  if (pathname.startsWith("/trilha-expressa")) return "express";
  if (pathname.startsWith("/pre-calculo")) return "pre";
  if (pathname.startsWith("/calculo-1")) return "calc";
  if (pathname.startsWith("/exercicios")) return "exerc";
  if (pathname.startsWith("/resumos")) return "resumos";
  if (pathname.startsWith("/glossario")) return "gloss";
  if (pathname.startsWith("/progresso")) return "prog";
  if (pathname.startsWith("/sobre")) return "sobre";
  return "home";
}
