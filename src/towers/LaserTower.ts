
import { Tower } from "../entities/Tower";

export class LaserTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Laser Tower",
      damage: 35,
      range: 260,
      attackSpeed: 2,
      cost: 350,
      projectileSpeed: 900,
      color: "#ff4fe0",
      damageType: "magic",
      targetMode: "nearest",
      x,
      y
    });
  }
}

