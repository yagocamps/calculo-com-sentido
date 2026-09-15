export type RampModel = { length: number; width: number; startHeight: number; endHeight: number };
export const DEFAULT_RAMP: RampModel = { length: 6, width: 2, startHeight: 0.2, endHeight: 1.2 };
export const rampPosition = (model: RampModel, x: number) => Math.min(model.length, Math.max(0, Number.isFinite(x) ? x : 0));
export function rampHeight(model: RampModel, x: number) {
  return model.startHeight + (model.endHeight - model.startHeight) * rampPosition(model, x) / model.length;
}
export const rampSection = (model: RampModel, x: number) => model.width * rampHeight(model, x);
export function rampVolume(model: RampModel, x: number) {
  const end = rampPosition(model, x);
  return model.width * (model.startHeight * end + (model.endHeight - model.startHeight) * end * end / (2 * model.length));
}
/** Right-endpoint slices; supports rising, level and falling ramps. */
export function rampSlices(model: RampModel, x: number, count: number) {
  const n = Math.max(1, Math.min(80, Math.round(Number.isFinite(count) ? count : 1)));
  const dx = rampPosition(model, x) / n;
  return Array.from({ length: n }, (_, i) => ({ start: i * dx, end: (i + 1) * dx, height: rampHeight(model, (i + 1) * dx), volume: rampSection(model, (i + 1) * dx) * dx }));
}
export const rampFormat = (v: number, digits = 2) => v.toLocaleString("pt-BR", { maximumFractionDigits: digits });
