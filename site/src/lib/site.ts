const PUBLIC_SITE_ORIGIN = "https://calculo-com-sentido.vercel.app";

/** A origem pública é estável mesmo em builds de preview. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return PUBLIC_SITE_ORIGIN;
  try {
    const url = new URL(configured.includes("://") ? configured : `https://${configured}`);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) throw new Error("invalid origin");
    return url.origin;
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL deve ser uma origem HTTP(S), sem credenciais, caminho, consulta ou fragmento.");
  }
}
