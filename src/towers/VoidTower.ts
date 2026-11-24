
import { Tower } from "../entities/Tower";

export class VoidTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Void Tower",
      damage: 115,
      range: 245,
      attackSpeed: 0.7,
      cost: 500,
      projectileSpeed: 400,
      color: "#8e44ff",
      damageType: "magic",
      targetMode: "strongest",
      x,
      y
    });
  }
}

