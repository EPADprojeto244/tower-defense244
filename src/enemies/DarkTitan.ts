
import { Enemy } from "../entities/Enemy";

export class DarkTitan extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Dark Titan",
      health: 1800 * multiplier,
      speed: 19,
      armor: 30,
      reward: 150,
      baseDamage: 10,
      radius: 29,
      color: "#493b61",
      resistances: {
        physical: 0.2,
        magic: 0.25
      }
    });

    this.x = x;
    this.y = y;
  }
}

