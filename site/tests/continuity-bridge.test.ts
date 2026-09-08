import assert from "node:assert/strict";
import test from "node:test";
import { bridgeProfile, bridgeReading, bridgeStart, normalizeAngle, normalizeHeight, LEFT_HEIGHT } from "../src/lib/continuity-bridge";
import { visualLabForLesson } from "../src/data/visual-labs";

test("continuity requires both approaches to agree with the defined junction height", () => {
  for (const angle of [-12, 0, 8, 12]) {
    assert.equal(bridgeReading(LEFT_HEIGHT).continuous, true);
    assert.equal(bridgeProfile(0, LEFT_HEIGHT, angle), LEFT_HEIGHT);
    assert.equal(bridgeProfile(-1e-7, LEFT_HEIGHT, angle), LEFT_HEIGHT);
    assert.ok(Math.abs(bridgeProfile(1e-7, LEFT_HEIGHT, angle) - LEFT_HEIGHT) < 1e-6);
    for (const height of [1.5, 2.49, 2.51, 3.5]) {
      assert.equal(bridgeReading(height).continuous, false);
      assert.equal(bridgeProfile(0, height, angle), height);
      assert.ok(Math.abs(bridgeProfile(1e-7, height, angle) - height) < 1e-6);
    }
  }
});

test("a connected ramp has different slopes without a jump", () => {
  const h = 0.001;
  for (const angle of [-12, 8, 12]) {
    const leftSlope = (bridgeProfile(0, 2.5, angle) - bridgeProfile(-h, 2.5, angle)) / h;
    const rightSlope = (bridgeProfile(h, 2.5, angle) - bridgeProfile(0, 2.5, angle)) / h;
    assert.equal(leftSlope, 0);
    assert.ok(Math.abs(rightSlope - Math.tan(angle * Math.PI / 180)) < 1e-10);
    assert.notEqual(rightSlope, leftSlope);
    assert.equal(bridgeReading(2.5).continuous, true);
  }
});

test("height inputs snap only when dragging and never classify a centimetre step as connected", () => {
  assert.equal(normalizeHeight(2.53, 3.2, true), 2.5);
  assert.equal(normalizeHeight(2.53, 3.2), 2.53);
  assert.equal(bridgeReading(normalizeHeight(2.51, 2.5)).continuous, false);
  assert.equal(bridgeReading(2.49).difference, -0.01);
  assert.equal(normalizeHeight(-100, 2.5), 1.5);
  assert.equal(normalizeHeight(100, 2.5), 3.5);
  for (const raw of [NaN, Infinity, -Infinity]) {
    assert.equal(normalizeHeight(raw, 2.7), 2.7);
    assert.equal(normalizeAngle(raw, 8), 8);
  }
  assert.equal(normalizeAngle(100, 0), 12);
  assert.equal(normalizeAngle(-100, 0), -12);
});

test("experience presets provide a connection challenge, an aligned bridge and a continuous ramp", () => {
  assert.equal(bridgeReading(bridgeStart("connect").height).continuous, false);
  assert.equal(bridgeReading(bridgeStart("step").height).continuous, true);
  assert.equal(bridgeReading(bridgeStart("ramp").height).continuous, true);
  for (const height of [1.5, 3.5]) for (const angle of [-12, 12]) {
    assert.ok(bridgeProfile(3.3, height, angle) - 0.24 > 0.53, "support stays above its footing");
    assert.ok(bridgeProfile(4, height, angle) > 0.3, "deck stays above the river bank");
  }
});

test("the bridge is attached to the visual continuity lesson and preserves the limits simulation", () => {
  assert.equal(visualLabForLesson("calculo-1", "continuidade", "ideia-continuidade"), "continuity-bridge");
  assert.equal(visualLabForLesson("calculo-1", "limites", "ideia-de-limite"), "motion-limit");
});
