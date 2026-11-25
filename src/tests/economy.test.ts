import {
  describe,
  it,
  expect
} from "vitest";

import { EconomySystem } from "../systems/EconomySystem";

describe("EconomySystem", () => {
  it("começa com 650 moedas e 20 vidas", () => {
    const economy = new EconomySystem();

    expect(economy.gold).toBe(650);
    expect(economy.lives).toBe(20);
  });

  it("não permite gastar mais dinheiro do que existe", () => {
    const economy = new EconomySystem();

    expect(economy.spend(9999)).toBe(false);
    expect(economy.gold).toBe(650);
  });

  it("permite gastar e ganhar moedas", () => {
    const economy = new EconomySystem();

    expect(economy.spend(100)).toBe(true);

    economy.earn(25);

    expect(economy.gold).toBe(575);
  });
});
