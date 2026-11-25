import type { Enemy } from "../entities/Enemy";

export class AbilitySystem {
  cooldowns: Record<string, number> = {
    meteor: 0,
    freeze: 0,
    heal: 0
  };

  update(dt: number): void {
    for (const key of Object.keys(this.cooldowns)) {
      this.cooldowns[key] = Math.max(
        0,
        this.cooldowns[key] - dt
      );
    }
  }

  freeze(enemies: Enemy[]): boolean {
    if (this.cooldowns.freeze > 0) return false;

    enemies.forEach(enemy => enemy.slow(4));

    this.cooldowns.freeze = 18;

    return true;
  }

  meteor(enemies: Enemy[]): boolean {
    if (this.cooldowns.meteor > 0) return false;

    enemies.forEach(enemy => enemy.takeDamage(120));

    this.cooldowns.meteor = 25;

    return true;
  }
}
