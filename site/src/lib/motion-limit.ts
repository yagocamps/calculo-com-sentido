export type MotionScenario = "encoder" | "firmware" | "friction";

export const APPROACH_VALUES = [0.5, 0.1, 0.01, 0.001] as const;
export const KEY_VALUES = [-0.5, -0.1, -0.01, -0.001, 0.001, 0.01, 0.1, 0.5];
export const MIN_DISTANCE = 0.001;

export function measurement(scenario: MotionScenario, value: number): number | null {
  if (!Number.isFinite(value)) return null;
  if (value === 0) return scenario === "firmware" ? 0 : null;
  // The simplified expression is valid only on the punctured domain.
  return scenario === "friction" ? (value < 0 ? 5 : -5) : 6 + value;
}

export function constrainValue(raw: number, current: number, scenario: MotionScenario, drag = false) {
  if (!Number.isFinite(raw)) return { value: current, reason: "invalid" as const };
  if (raw === 0 || (drag && Math.sign(raw) !== Math.sign(current))) {
    return { value: drag ? Math.sign(current) * MIN_DISTANCE : current, reason: "zero" as const };
  }
  const max = scenario === "friction" ? 2 : 0.5;
  const bounded = Math.sign(raw) * Math.min(max, Math.max(MIN_DISTANCE, Math.abs(raw)));
  const rounded = Math.round(bounded * 1000) / 1000;
  // Magnetism is relative to each mark, preserving access to the smallest intervals.
  const snap = drag ? KEY_VALUES.find(mark => Math.abs(rounded - mark) <= Math.abs(mark) * 0.07) : undefined;
  return { value: snap ?? rounded, reason: bounded !== raw ? "range" as const : null };
}

export function approachValue(current: number, side: -1 | 1) {
  if (Math.sign(current) !== side) return side * APPROACH_VALUES[0];
  return side * (APPROACH_VALUES.find(value => value < Math.abs(current) - 1e-8) ?? MIN_DISTANCE);
}

export function keyboardValue(current: number, direction: -1 | 1, scenario: MotionScenario) {
  const values = scenario === "friction" ? [-2, ...KEY_VALUES, 2] : KEY_VALUES;
  return direction > 0
    ? values.find(value => value > current + 1e-8) ?? values[values.length - 1]
    : [...values].reverse().find(value => value < current - 1e-8) ?? values[0];
}

export function formatReading(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}
