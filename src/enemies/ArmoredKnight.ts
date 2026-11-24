
import { Enemy } from "../entities/Enemy";

export class ArmoredKnight extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Armored Knight",
      health: 280 * multiplier,
      speed: 30,
      armor: 18,
      reward: 35,
      baseDamage: 3,
      radius: 17,
      color: "#8294a8",
      resistances: {
        physical: 0.1
      }
    });

    this.x = x;
    this.y = y;
  }
}

