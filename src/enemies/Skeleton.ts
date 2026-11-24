
import { Enemy } from "../entities/Enemy";

export class Skeleton extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Skeleton",
      health: 85 * multiplier,
      speed: 58,
      armor: 2,
      reward: 16,
      baseDamage: 1,
      radius: 12,
      color: "#e6dfc9"
    });

    this.x = x;
    this.y = y;
  }
}

