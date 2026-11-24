
import { Tower } from "../entities/Tower";

export class ArcherTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Archer Tower",
      damage: 25,
      range: 175,
      attackSpeed: 1.5,
      cost: 100,
      projectileSpeed: 450,
      color: "#d6a34a",
      damageType: "physical",
      targetMode: "first",
      x,
      y
    });
  }
}

