/** URL canônica do site (configure NEXT_PUBLIC_SITE_URL na Vercel). */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";
  if (url.startsWith("http")) return url.replace(/\/$/, "");
  return `https://${url}`.replace(/\/$/, "");
}
