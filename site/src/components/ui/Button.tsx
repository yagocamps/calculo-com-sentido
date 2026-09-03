"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

// `text-bg` faz o texto inverter junto com o tema (é o oposto de `ink` nos
// dois modos): branco/off-white sobre fundo escuro, e escuro sobre fundo
// claro. Evita "texto invisível" no modo escuro.
const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-bg border border-transparent shadow-[inset_0_-1px_0_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.08)]",
  dark: "bg-ink text-bg border border-transparent",
  ghost: "bg-transparent text-ink border border-border",
  soft: "bg-surface text-ink border border-border shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[12.5px]",
  md: "px-4 py-2 text-sm",
  lg: "px-[22px] py-3 text-[15px]",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-[10px] font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-px active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const disabledClasses = disabled ? "cursor-not-allowed opacity-50 hover:opacity-50 pointer-events-none" : "";
    return (
      <Link
        href={disabled ? "#" : href}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          } else if (onClick) {
            onClick();
          }
        }}
        className={cn(classes, disabledClasses)}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(classes, disabled && "cursor-not-allowed opacity-50 hover:opacity-50")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
