import {
  describe,
  it,
  expect
} from "vitest";

import {
  TOWERS,
  towerDamage
} from "../data/towers";

describe("Torres", () => {
  it("define as doze torres", () => {
    expect(Object.keys(TOWERS)).toHaveLength(12);
  });

  it("aumenta o dano quando a torre sobe de nível", () => {
    const baseDamage = TOWERS.archer.damage;
    const upgradedDamage = towerDamage(
      TOWERS.archer,
      2
    );

    expect(upgradedDamage).toBeGreaterThan(baseDamage);
  });
});
