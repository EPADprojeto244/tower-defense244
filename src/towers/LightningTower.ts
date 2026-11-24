
import { Tower } from "../entities/Tower";

export class LightningTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Lightning Tower",
      damage: 75,
      range: 210,
      attackSpeed: 0.8,
      cost: 300,
      projectileSpeed: 650,
      color: "#ffe34d",
      damageType: "electric",
      targetMode: "strongest",
      x,
      y
    });
  }
}

