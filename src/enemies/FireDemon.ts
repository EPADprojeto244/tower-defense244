
import { Enemy } from "../entities/Enemy";

export class FireDemon extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Fire Demon",
      health: 420 * multiplier,
      speed: 48,
      armor: 8,
      reward: 55,
      baseDamage: 4,
      radius: 19,
      color: "#f15b32",
      resistances: {
        fire: 0.8,
        ice: -0.25
      }
    });

    this.x = x;
    this.y = y;
  }
}

