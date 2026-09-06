import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { getSiteUrl } from "@/lib/site";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const keys = ["NEXT_PUBLIC_SITE_URL", "VERCEL_URL"] as const;
let saved: Partial<Record<(typeof keys)[number], string>>;
beforeEach(() => {
  saved = {};
  for (const key of keys) { saved[key] = process.env[key]; delete process.env[key]; }
});
afterEach(() => {
  for (const key of keys) {
    if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key];
  }
});

test("preview deployment addresses never become the default public origin", () => {
  process.env.VERCEL_URL = "calculo-preview-abc123.vercel.app";
  assert.equal(getSiteUrl(), "https://calculo-com-sentido.vercel.app");
  process.env.NEXT_PUBLIC_SITE_URL = "  ";
  assert.equal(getSiteUrl(), "https://calculo-com-sentido.vercel.app");
});

test("an explicit public domain overrides the default and is normalized", () => {
  process.env.NEXT_PUBLIC_SITE_URL = " https://Calculo.Example.org/ ";
  assert.equal(getSiteUrl(), "https://calculo.example.org");
  process.env.NEXT_PUBLIC_SITE_URL = "calculo.example.org";
  assert.equal(getSiteUrl(), "https://calculo.example.org");
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000/";
  assert.equal(getSiteUrl(), "http://localhost:3000");
});

test("invalid explicit origins fail instead of emitting malformed discovery URLs", () => {
  for (const candidate of ["https://", "not a host", "ftp://example.org", "https://example.org/aula",
    "https://example.org/?preview=1", "https://example.org/#aula", "https://user:password@example.org"]) {
    process.env.NEXT_PUBLIC_SITE_URL = candidate;
    assert.throws(getSiteUrl, /NEXT_PUBLIC_SITE_URL/);
  }
});

test("sitemap and robots use the same stable origin even on a preview deployment", () => {
  process.env.VERCEL_URL = "calculo-preview-abc123.vercel.app";
  const entries = sitemap();
  assert.ok(entries.length > 190);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  assert.deepEqual([...new Set(entries.map((entry) => new URL(entry.url).origin))], ["https://calculo-com-sentido.vercel.app"]);
  assert.ok(entries.some((entry) => entry.url.endsWith("/calculo-1/derivadas/derivada-da-inversa")));
  assert.equal(robots().sitemap, "https://calculo-com-sentido.vercel.app/sitemap.xml");
  process.env.NEXT_PUBLIC_SITE_URL = "https://calculo.example.org/";
  assert.ok(sitemap().every((entry) => new URL(entry.url).origin === "https://calculo.example.org"));
  assert.equal(robots().sitemap, "https://calculo.example.org/sitemap.xml");
});
