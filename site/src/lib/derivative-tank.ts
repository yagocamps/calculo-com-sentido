export type TankExperience = "fill" | "compare" | "drain";
export const MAX_TANK_TIME = 6;
export const TANK_CAPACITY = 100;
export const TANK_INTERVALS = [2, 1, 0.5, 0.1, 0.01] as const;

export function tankVolume(time: number, drain = false) {
  return drain ? 90 - time ** 2 : 10 + time ** 2;
}

export function tankRate(time: number, drain = false) {
  return time === 0 ? 0 : (drain ? -2 : 2) * time;
}

export function tankAverage(time: number, interval: number, drain = false): number | null {
  if (!Number.isFinite(time) || !Number.isFinite(interval) || interval === 0) return null;
  // Algebraically equivalent to the difference quotient on a nonzero interval.
  return (drain ? -1 : 1) * (2 * time + interval);
}

export function normalizeTankTime(raw: number, current: number) {
  return Number.isFinite(raw) ? Math.round(Math.min(MAX_TANK_TIME, Math.max(0, raw)) * 100) / 100 : current;
}

export function closerTankInterval(current: number) {
  return TANK_INTERVALS.find(interval => interval < current) ?? TANK_INTERVALS[TANK_INTERVALS.length - 1];
}

export function tankFormat(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
