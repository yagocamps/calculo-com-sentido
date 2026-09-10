/** IDs fazem parte da URL pública; títulos podem mudar sem quebrar links. */
export const exercisePath = (id: string) => `/exercicios/${encodeURIComponent(id)}`;
