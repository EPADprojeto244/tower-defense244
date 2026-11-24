
import { Enemy } from "../entities/Enemy";

export class Orc extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Orc",
      health: 150 * multiplier,
      speed: 43,
      armor: 5,
      reward: 22,
      baseDamage: 2,
      radius: 15,
      color: "#9b633e"
    });

    this.x = x;
    this.y = y;
  }
}

