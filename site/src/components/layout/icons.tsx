export function NavIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    home: "M3 11l9-8 9 8M5 10v10h14V10",
    teste: "M9 11l3 3 8-8M20 12v7H4V5h9",
    exerc: "M4 6h16M4 12h10M4 18h16",
    resumos: "M8 4h9l3 3v13H8zM8 4v3H5v13h3",
    gloss: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
    prog: "M3 17l6-6 4 4 8-8",
    sobre: "M12 8v4M12 16h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z",
    search: "M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M18 6L6 18M6 6l12 12",
    express: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
  };

  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name] ?? paths.home} />
    </svg>
  );
}
