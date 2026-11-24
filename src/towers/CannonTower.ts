
import { Tower } from "../entities/Tower";

export class CannonTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Cannon Tower",
      damage: 65,
      range: 195,
      attackSpeed: 0.65,
      cost: 220,
      projectileSpeed: 300,
      color: "#8c929d",
      damageType: "physical",
      targetMode: "first",
      x,
      y
    });
  }
}

