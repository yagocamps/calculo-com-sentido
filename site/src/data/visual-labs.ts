export type VisualLabKind =
  | "limit"
  | "secant"
  | "riemann"
  | "unit-circle"
  | "transformations"
  | "parabola"
  | "product-rule"
  | "ftc";

export const visualLabsByLesson: Record<string, VisualLabKind> = {
  "calculo-1/limites/limite-por-grafico": "limit",
  "calculo-1/derivadas/reta-secante-tangente": "secant",
  "calculo-1/integrais/somas-de-riemann": "riemann",
  "pre-calculo/trigonometria/ciclo-trigonometrico": "unit-circle",
  "pre-calculo/graficos/reflexoes-e-escalas": "transformations",
  "pre-calculo/funcoes/funcao-quadratica": "parabola",
  "calculo-1/derivadas/derivada-produto-quociente": "product-rule",
  "calculo-1/integrais/tfc": "ftc",
};

export function visualLabForLesson(
  track: "pre-calculo" | "calculo-1",
  moduleSlug: string,
  lessonSlug: string,
) {
  return visualLabsByLesson[`${track}/${moduleSlug}/${lessonSlug}`];
}
