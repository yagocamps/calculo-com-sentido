# Design tokens · Tailwind + CSS vars

Copie isso para iniciar o Next.js. Os nomes batem com o protótipo (`src/tokens.jsx`).

---

## 1. `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Backgrounds */
    --bg:           #FAF6EF;
    --surface:      #FFFFFF;
    --surface-warm: #F4EDE0;
    --surface-soft: #FBF6EB;
    --surface-ink:  #2A211A;

    /* Texto */
    --ink:         #2A211A;
    --ink-muted:   #6E5C4E;
    --ink-subtle:  #A08C7B;
    --ink-on-dark: #FAF6EF;

    /* Bordas */
    --border:      #E8DFD0;
    --border-soft: #F0E8D9;

    /* Acentos */
    --terracotta:      #C2553D;
    --terracotta-soft: #F4D9CF;
    --terracotta-ink:  #7A2E1F;

    --sage:      #7A9275;
    --sage-soft: #D9E3D2;
    --sage-ink:  #3F5B3A;

    --sky:      #6B8AAE;
    --sky-soft: #D8E3EE;
    --sky-ink:  #33506E;

    --amber:      #D6A24A;
    --amber-soft: #F3E3C0;
    --amber-ink:  #7A5616;
  }

  html, body { background: var(--bg); color: var(--ink); }
  body { font-family: var(--font-sans); }
}
```

---

## 2. `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:           'var(--bg)',
        surface:      'var(--surface)',
        'surface-warm':'var(--surface-warm)',
        'surface-soft':'var(--surface-soft)',
        'surface-ink':'var(--surface-ink)',

        ink:           'var(--ink)',
        'ink-muted':   'var(--ink-muted)',
        'ink-subtle':  'var(--ink-subtle)',
        'ink-on-dark': 'var(--ink-on-dark)',

        border: 'var(--border)',
        'border-soft': 'var(--border-soft)',

        terracotta: {
          DEFAULT: 'var(--terracotta)',
          soft:    'var(--terracotta-soft)',
          ink:     'var(--terracotta-ink)',
        },
        sage: {
          DEFAULT: 'var(--sage)',
          soft:    'var(--sage-soft)',
          ink:     'var(--sage-ink)',
        },
        sky: {
          DEFAULT: 'var(--sky)',
          soft:    'var(--sky-soft)',
          ink:     'var(--sky-ink)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          soft:    'var(--amber-soft)',
          ink:     'var(--amber-ink)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'serif'],
        sans:  ['var(--font-sans)',  'DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)',  'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '1': '8px',
        '2': '14px',
        '3': '20px',
        '4': '28px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(42,33,26,0.04), 0 1px 1px rgba(42,33,26,0.03)',
        md: '0 6px 16px -8px rgba(42,33,26,0.12), 0 2px 4px rgba(42,33,26,0.04)',
        lg: '0 18px 48px -20px rgba(42,33,26,0.18), 0 4px 12px rgba(42,33,26,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. Fontes (`app/layout.tsx`)

```tsx
import { Newsreader, DM_Sans, JetBrains_Mono } from 'next/font/google';

const serif = Newsreader({
  subsets: ['latin'], variable: '--font-serif',
  weight: ['300','400','500','600'], style: ['normal','italic'],
});
const sans = DM_Sans({
  subsets: ['latin'], variable: '--font-sans',
  weight: ['400','500','600','700'],
});
const mono = JetBrains_Mono({
  subsets: ['latin'], variable: '--font-mono',
  weight: ['400','500','600'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. Exemplos de uso

```tsx
<button className="bg-terracotta text-white rounded-2 px-4 py-2 font-semibold shadow-sm">
  Fazer teste de nível
</button>

<h1 className="font-serif text-5xl font-medium tracking-tight text-ink">
  Aprenda com <em className="italic text-terracotta">sentido</em>
</h1>

<aside className="w-[264px] bg-surface-warm border-r border-border p-4">
  {/* sidebar */}
</aside>

<div className="bg-sage-soft border border-sage rounded-2 p-4 text-sage-ink">
  <b>Onde isso aparece:</b> corrida de aplicativo, salário com comissão…
</div>
```

---

## 5. Padrões de componente a portar primeiro

| Componente do protótipo  | Arquivo Next.js sugerido               |
|--------------------------|----------------------------------------|
| `Shell`                  | `components/layout/Shell.tsx`          |
| `Sidebar`                | `components/layout/Sidebar.tsx`        |
| `Topbar`                 | `components/layout/Topbar.tsx`         |
| `Btn`                    | `components/ui/Button.tsx`             |
| `Tag` + `levelTag`       | `components/ui/Tag.tsx`                |
| `Card`                   | `components/ui/Card.tsx`               |
| Callouts (ideia/erro/…)  | `components/ui/Callout.tsx` (variant)  |
| `ProgressRing`           | `components/ui/ProgressRing.tsx`       |
| `ModuleCard`             | `components/trilhas/ModuleCard.tsx`    |
| `Section` (aula)         | `components/aulas/Section.tsx`         |
