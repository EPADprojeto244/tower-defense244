
import { Enemy } from "../entities/Enemy";

export class IceBeast extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Ice Beast",
      health: 500 * multiplier,
      speed: 35,
      armor: 12,
      reward: 65,
      baseDamage: 5,
      radius: 20,
      color: "#65d9ed",
      resistances: {
        ice: 0.85,
        fire: -0.2
      }
    });

    this.x = x;
    this.y = y;
  }
}

