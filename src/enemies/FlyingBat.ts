
import { Enemy } from "../entities/Enemy";

export class FlyingBat extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Flying Bat",
      health: 55 * multiplier,
      speed: 105,
      armor: 0,
      reward: 14,
      baseDamage: 1,
      radius: 10,
      color: "#55416f",
      flying: true
    });

    this.x = x;
    this.y = y;
  }
}

