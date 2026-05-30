export function ProgressRing({
  value = 0,
  size = 92,
  color = "var(--terracotta)",
  label,
}: {
  value?: number;
  size?: number;
  color?: string;
  label?: string;
}) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;

  const ariaLabel = label
    ? `${value}% · ${label}`
    : `${value}% de progresso`;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="img"
        aria-label={ariaLabel}
      >
        <svg width={size} height={size} aria-hidden>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="var(--border-soft)"
            strokeWidth={8}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={off}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center font-serif text-[22px] font-medium text-ink">
          {value}%
        </div>
      </div>
      {label && (
        <p className="mt-2 text-center text-[11.5px] tracking-wide text-ink-muted">
          {label}
        </p>
      )}
    </div>
  );
}
