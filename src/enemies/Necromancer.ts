
import { Enemy } from "../entities/Enemy";

export class Necromancer extends Enemy {
  private summonTimer = 0;

  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Necromancer",
      health: 350 * multiplier,
      speed: 32,
      armor: 5,
      reward: 90,
      baseDamage: 4,
      radius: 18,
      color: "#9856ce"
    });

    this.x = x;
    this.y = y;
  }

  canSummon(delta: number): boolean {
    if (this.dead) return false;

    this.summonTimer += delta;

    if (this.summonTimer >= 8) {
      this.summonTimer = 0;
      return true;
    }

    return false;
  }
}

