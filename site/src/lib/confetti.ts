// Confete leve, sem dependências, via Web Animations API.
// Respeita prefers-reduced-motion (não dispara).

const COLORS = ["#2f5d8c", "#ce7a45", "#8675bc", "#d7a52e"];

export function burstConfetti(x: number, y: number, count = 16) {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 5;
    piece.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:2px;background:${COLORS[i % COLORS.length]};pointer-events:none;z-index:9999;will-change:transform,opacity`;
    document.body.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 90;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 50; // leve viés para cima
    const rot = (Math.random() - 0.5) * 540;

    const anim = piece.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 700 + Math.random() * 400,
        easing: "cubic-bezier(0.2, 0.6, 0.3, 1)",
      },
    );
    anim.onfinish = () => piece.remove();
  }
}
