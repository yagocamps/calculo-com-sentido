import assert from "node:assert/strict";
import test from "node:test";
import { approachValue, constrainValue, formatReading, keyboardValue, measurement, type MotionScenario } from "../src/lib/motion-limit";

test("encoder preserves the hole while both sides converge with three-digit precision", () => {
  assert.equal(measurement("encoder", 0), null);
  assert.equal(formatReading(measurement("encoder", -0.001)!), "5,999");
  assert.equal(formatReading(measurement("encoder", 0.001)!), "6,001");
  for (const dt of [-0.5, -0.1, -0.01, -0.001, 0.001, 0.01, 0.1, 0.5]) {
    const original = ((3 + dt) ** 2 - 9) / dt;
    assert.ok(Math.abs(measurement("encoder", dt)! - original) < 1e-10);
  }
});

test("firmware changes only the value at zero; friction has distinct one-sided limits", () => {
  assert.equal(measurement("firmware", 0), 0);
  for (const v of [-0.5, -0.001, 0.001, 0.5]) {
    assert.equal(measurement("firmware", v), measurement("encoder", v));
    assert.equal(measurement("friction", v), v < 0 ? 5 : -5);
  }
  assert.equal(measurement("friction", 0), null);
});

test("dragging across zero stops on the original side in all scenarios", () => {
  for (const scenario of ["encoder", "firmware", "friction"] satisfies MotionScenario[]) {
    assert.deepEqual(constrainValue(0.3, -0.1, scenario, true), { value: -0.001, reason: "zero" });
    assert.deepEqual(constrainValue(-0.3, 0.1, scenario, true), { value: 0.001, reason: "zero" });
    assert.equal(constrainValue(0, 0.1, scenario).value, 0.1);
    assert.equal(constrainValue(0, -0.1, scenario, true).value, -0.001);
    for (const bad of [NaN, Infinity, -Infinity]) {
      assert.equal(constrainValue(bad, -0.1, scenario).value, -0.1);
      assert.equal(measurement(scenario, bad), null);
    }
  }
});

test("input bounds, rounding and magnetism never produce zero", () => {
  assert.equal(constrainValue(10, -0.1, "encoder").value, 0.5);
  assert.equal(constrainValue(-10, -0.1, "friction").value, -2);
  assert.equal(constrainValue(0.00001, -0.1, "encoder").value, 0.001);
  assert.equal(constrainValue(-0.0104, -0.1, "encoder", true).value, -0.01);
  for (let raw = -2; raw <= 2; raw += 0.0003) {
    assert.notEqual(constrainValue(raw, -0.1, "friction", true).value, 0);
  }
});

test("each approach click takes one step and remains at the last nonzero mark", () => {
  for (const side of [-1, 1] as const) {
    let current = -side * 0.001;
    for (const mark of [0.5, 0.1, 0.01, 0.001, 0.001]) {
      current = approachValue(current, side);
      assert.equal(current, side * mark);
    }
  }
});

test("keyboard can reach both sides without evaluating the missing point", () => {
  assert.equal(keyboardValue(-0.001, 1, "encoder"), 0.001);
  assert.equal(keyboardValue(0.001, -1, "encoder"), -0.001);
  assert.equal(keyboardValue(0.5, 1, "friction"), 2);
  assert.equal(keyboardValue(-0.5, -1, "friction"), -2);
  assert.equal(keyboardValue(0.5, 1, "encoder"), 0.5);
});
