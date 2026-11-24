
import { Tower } from "../entities/Tower";

export class SniperTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Sniper Tower",
      damage: 180,
      range: 390,
      attackSpeed: 0.35,
      cost: 400,
      projectileSpeed: 1000,
      color: "#a7c6db",
      damageType: "physical",
      targetMode: "strongest",
      x,
      y
    });
  }
}

