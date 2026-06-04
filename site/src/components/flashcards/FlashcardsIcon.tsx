/**
 * Ícone de flashcards: dois cartões empilhados (coral atrás, amarelo na
 * frente) com uma estrela numa janela e linhas de texto. SVG inline, sem
 * dependência. Tamanho via className (ex.: "h-7 w-7").
 */
export function FlashcardsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* cartão de trás (coral) */}
      <rect
        x="9"
        y="2.5"
        width="12.5"
        height="17"
        rx="2"
        fill="#ff6b6b"
        stroke="#1e2a3a"
        strokeWidth="1.1"
      />
      <line x1="17.4" y1="13.6" x2="19.6" y2="13.6" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />
      <line x1="17.4" y1="15.4" x2="19.6" y2="15.4" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />
      <line x1="17.4" y1="17.2" x2="19.6" y2="17.2" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />

      {/* cartão da frente (amarelo) */}
      <rect
        x="2.5"
        y="5"
        width="13"
        height="16.5"
        rx="2"
        fill="#ffce54"
        stroke="#1e2a3a"
        strokeWidth="1.1"
      />
      {/* janela branca */}
      <rect
        x="4.5"
        y="7"
        width="9"
        height="6.5"
        rx="1"
        fill="#f7f7f5"
        stroke="#1e2a3a"
        strokeWidth="1"
      />
      {/* estrela */}
      <polygon
        points="9,7.6 9.62,9.35 11.47,9.4 10,10.52 10.53,12.3 9,11.25 7.47,12.3 8,10.52 6.53,9.4 8.38,9.35"
        fill="#ffce54"
        stroke="#1e2a3a"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* linhas de texto */}
      <line x1="4.6" y1="15.6" x2="13.4" y2="15.6" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />
      <line x1="4.6" y1="17.4" x2="13.4" y2="17.4" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />
      <line x1="4.6" y1="19.2" x2="10.8" y2="19.2" stroke="#1e2a3a" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
