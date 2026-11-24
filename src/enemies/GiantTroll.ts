
import { Enemy } from "../entities/Enemy";

export class GiantTroll extends Enemy {
  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Giant Troll",
      health: 750 * multiplier,
      speed: 24,
      armor: 15,
      reward: 85,
      baseDamage: 7,
      radius: 25,
      color: "#66834b"
    });

    this.x = x;
    this.y = y;
  }
}

