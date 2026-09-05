import Link from "next/link";
import type { AulaFutureUse } from "@/data/aulas/types";

export function FutureUseLinks({ items }: { items: AulaFutureUse[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="mt-4 rounded-2 border border-sage/50 bg-sage-soft/40 px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-sage-ink">
        Você usará isto em
      </p>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {items.slice(0, 4).map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border border-border bg-surface px-3 py-2 transition-colors hover:border-sage"
            >
              <span className="block text-[12px] font-semibold text-ink">
                {item.label} →
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-relaxed text-ink-muted">
                {item.detail}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
