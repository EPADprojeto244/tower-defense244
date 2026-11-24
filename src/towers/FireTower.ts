
import { Tower } from "../entities/Tower";

export class FireTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Fire Tower",
      damage: 48,
      range: 165,
      attackSpeed: 1.1,
      cost: 240,
      projectileSpeed: 350,
      color: "#ff572e",
      damageType: "fire",
      targetMode: "first",
      x,
      y
    });
  }
}

