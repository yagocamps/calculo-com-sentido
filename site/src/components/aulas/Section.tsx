export function Section({
  n,
  label,
  title,
  children,
}: {
  n: number;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-2 flex items-center gap-3 font-serif text-[11.5px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        <span className="grid h-[22px] w-[22px] place-items-center rounded-md bg-terracotta-soft font-mono text-[11px] font-bold text-terracotta-ink">
          {String(n).padStart(2, "0")}
        </span>
        {label}
      </div>
      <h3 className="mb-2.5 font-serif text-[22px] font-medium tracking-tight text-ink">
        {title}
      </h3>
      {children}
    </section>
  );
}
