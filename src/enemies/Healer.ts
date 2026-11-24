
import { Enemy } from "../entities/Enemy";

export class Healer extends Enemy {
  private healTimer = 0;

  constructor(x = 0, y = 0, multiplier = 1) {
    super({
      name: "Healer",
      health: 180 * multiplier,
      speed: 38,
      armor: 3,
      reward: 45,
      baseDamage: 2,
      radius: 14,
      color: "#54d6b1"
    });

    this.x = x;
    this.y = y;
  }

  healNearby(enemies: Enemy[], delta: number): void {
    if (this.dead) return;

    this.healTimer += delta;

    if (this.healTimer < 2) return;

    this.healTimer = 0;

    for (const enemy of enemies) {
      if (enemy === this || !enemy.isAlive) continue;

      const distance = Math.hypot(
        enemy.x - this.x,
        enemy.y - this.y
      );

      if (distance <= 95) {
        enemy.heal(25);
      }
    }
  }
}

