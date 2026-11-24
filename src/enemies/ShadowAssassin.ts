
import { Enemy } from "../entities/Enemy";

export class ShadowAssassin extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Shadow Assassin",
      health: 240 * multiplier,
      speed: 95,
      armor: 4,
      reward: 60,
      baseDamage: 3,
      radius: 13,
      color: "#342d48",
      resistances: {
        physical: 0.15
      }
    });

    this.x = x;
    this.y = y;
  }
}

