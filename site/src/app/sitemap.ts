import type { MetadataRoute } from "next";
import { calculo1ModuloPath, calculo1Modulos } from "@/data/calculo-1";
import { getCalculo1StaticAulaParams } from "@/data/aulas/calculo-1/register";
import {
  getAllAulaParams,
  moduloPath,
  preCalculoModulos,
} from "@/data/pre-calculo";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticPages = [
    "",
    "/teste-de-nivel",
    "/pre-calculo",
    "/calculo-1",
    "/exercicios",
    "/resumos",
    "/glossario",
    "/progresso",
    "/sobre",
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const mod of preCalculoModulos) {
    entries.push({
      url: `${base}${moduloPath(mod.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const mod of calculo1Modulos) {
    entries.push({
      url: `${base}${calculo1ModuloPath(mod.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const { modulo, aula } of getAllAulaParams()) {
    entries.push({
      url: `${base}/pre-calculo/${modulo}/${aula}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const { modulo, aula } of getCalculo1StaticAulaParams()) {
    entries.push({
      url: `${base}/calculo-1/${modulo}/${aula}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
