export type BridgeExperience = "connect" | "step" | "ramp";
export const LEFT_HEIGHT = 2.5;
export const MIN_HEIGHT = 1.5;
export const MAX_HEIGHT = 3.5;
export const MAX_ANGLE = 12;

export function bridgeStart(experience: BridgeExperience) {
  return { height: experience === "connect" ? 3.2 : LEFT_HEIGHT, angle: experience === "ramp" ? 8 : 0 };
}

export function normalizeHeight(raw: number, current: number, drag = false) {
  if (!Number.isFinite(raw)) return current;
  const bounded = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, raw));
  if (drag && Math.abs(bounded - LEFT_HEIGHT) < 0.045) return LEFT_HEIGHT;
  return Math.round(bounded * 100) / 100;
}

export function normalizeAngle(raw: number, current: number) {
  return Number.isFinite(raw) ? Math.round(Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw))) : current;
}

export function bridgeProfile(x: number, height: number, angle: number) {
  // The seam belongs to the right section: f(0) is explicit even with a jump.
  return x < 0 ? LEFT_HEIGHT : height + x * Math.tan(angle * Math.PI / 180);
}

export function bridgeReading(height: number) {
  const difference = Math.round((height - LEFT_HEIGHT) * 100) / 100;
  return { difference, continuous: difference === 0, left: LEFT_HEIGHT, right: height, atPoint: height };
}

export function bridgeFormat(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
