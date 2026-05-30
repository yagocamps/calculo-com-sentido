import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  padding = "p-5",
}: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2 border border-border bg-surface shadow-sm",
        padding,
        className,
      )}
    >
      {children}
    </div>
  );
}
