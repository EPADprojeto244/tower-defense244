
import { Tower } from "../entities/Tower";

export class PoisonTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Poison Tower",
      damage: 32,
      range: 185,
      attackSpeed: 1.25,
      cost: 260,
      projectileSpeed: 320,
      color: "#83d344",
      damageType: "poison",
      targetMode: "first",
      x,
      y
    });
  }
}

