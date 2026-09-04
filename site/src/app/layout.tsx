import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Cálculo com Sentido",
    template: "%s · Cálculo com Sentido",
  },
  description:
    "Pré-Cálculo e Cálculo 1 de forma simples, aplicada e progressiva — sentido antes da fórmula.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Cálculo com Sentido",
    title: "Cálculo com Sentido",
    description:
      "Pré-Cálculo e Cálculo 1 de forma simples, aplicada e progressiva — sentido antes da fórmula.",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('ccs-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
