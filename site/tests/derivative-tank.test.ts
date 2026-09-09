import assert from "node:assert/strict";
import test from "node:test";
import { closerTankInterval, MAX_TANK_TIME, normalizeTankTime, TANK_CAPACITY, tankAverage, tankRate, tankVolume } from "../src/lib/derivative-tank";
import { visualLabForLesson } from "../src/data/visual-labs";

test("instantaneous rate agrees with a symmetric difference of the volume in both modes", () => {
  const h = 0.001;
  for (const drain of [false, true]) for (const t of [0.5, 2, 3.47, 6]) {
    const slope = (tankVolume(t + h, drain) - tankVolume(t - h, drain)) / (2 * h);
    assert.ok(Math.abs(slope - tankRate(t, drain)) < 1e-9);
  }
  assert.equal(tankRate(0), 0);
  assert.equal(tankRate(0, true), 0);
  assert.equal(tankVolume(2), 14);
  assert.equal(tankRate(2), 4);
  assert.equal(tankVolume(2, true), 86);
  assert.equal(tankRate(2, true), -4);
});

test("shorter measurements converge to the derivative without evaluating a zero interval", () => {
  for (const drain of [false, true]) {
    let interval = 2;
    let lastError = Infinity;
    for (const expected of [2, 1, 0.5, 0.1, 0.01]) {
      assert.equal(interval, expected);
      const avg = tankAverage(3, interval, drain)!;
      const quotient = (tankVolume(3 + interval, drain) - tankVolume(3, drain)) / interval;
      assert.ok(Math.abs(avg - quotient) < 1e-10);
      const error = Math.abs(avg - tankRate(3, drain));
      assert.ok(error < lastError);
      lastError = error;
      interval = closerTankInterval(interval);
    }
    assert.equal(interval, 0.01);
    assert.equal(tankAverage(3, 0, drain), null);
  }
  assert.equal(tankAverage(3, NaN), null);
  assert.equal(tankAverage(Infinity, 1), null);
});

test("the observed volume change over a full second is distinct from the instantaneous rate", () => {
  assert.equal(tankVolume(3) - tankVolume(2), 5);
  assert.equal(tankRate(2), 4);
  assert.equal(tankAverage(2, 1), 5);
  assert.equal(tankVolume(3, true) - tankVolume(2, true), -5);
  assert.equal(tankRate(2, true), -4);
});

test("time input and the longest observation window stay within the reservoir capacity", () => {
  assert.equal(normalizeTankTime(-1, 2), 0);
  assert.equal(normalizeTankTime(99, 2), MAX_TANK_TIME);
  assert.equal(normalizeTankTime(2.345, 2), 2.35);
  for (const raw of [NaN, Infinity, -Infinity]) assert.equal(normalizeTankTime(raw, 2.34), 2.34);
  for (let t = 0; t <= MAX_TANK_TIME + 2; t += 0.05) for (const drain of [false, true]) {
    assert.ok(tankVolume(t, drain) > 0);
    assert.ok(tankVolume(t, drain) < TANK_CAPACITY);
  }
});

test("the reservoir belongs to instantaneous variation and preserves the existing tangent lesson", () => {
  assert.equal(visualLabForLesson("calculo-1", "derivadas", "variacao-instantanea"), "derivative-tank");
  assert.equal(visualLabForLesson("calculo-1", "derivadas", "reta-secante-tangente"), "secant");
  assert.equal(visualLabForLesson("calculo-1", "continuidade", "ideia-continuidade"), "continuity-bridge");
  assert.equal(visualLabForLesson("calculo-1", "limites", "ideia-de-limite"), "motion-limit");
});
