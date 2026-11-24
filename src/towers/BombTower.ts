
import { Tower } from "../entities/Tower";

export class BombTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Bomb Tower",
      damage: 95,
      range: 135,
      attackSpeed: 0.45,
      cost: 180,
      projectileSpeed: 230,
      color: "#ed713b",
      damageType: "physical",
      targetMode: "strongest",
      x,
      y
    });
  }
}

