
import { Enemy } from "../entities/Enemy";

export class Goblin extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Goblin",
      health: 65 * multiplier,
      speed: 75,
      armor: 0,
      reward: 12,
      baseDamage: 1,
      radius: 11,
      color: "#75bd45"
    });

    this.x = x;
    this.y = y;
  }
}

