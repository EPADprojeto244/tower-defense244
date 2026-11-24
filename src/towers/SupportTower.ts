
import { Tower } from "../entities/Tower";

export class SupportTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Support Tower",
      damage: 12,
      range: 230,
      attackSpeed: 1.4,
      cost: 280,
      projectileSpeed: 400,
      color: "#56e0b0",
      damageType: "magic",
      targetMode: "nearest",
      x,
      y
    });
  }
}

