import {
  describe,
  it,
  expect
} from "vitest";

import { createWave } from "../data/waves";

describe("Sistema de ondas", () => {
  it("cria inimigos para a primeira onda", () => {
    const wave = createWave(1);

    expect(wave.length).toBeGreaterThan(0);
    expect(wave[0].count).toBeGreaterThan(0);
  });

  it("inclui um Titã Sombrio na décima onda", () => {
    const wave = createWave(10);

    expect(
      wave.some(entry => entry.enemy === "darkTitan")
    ).toBe(true);
  });
});
