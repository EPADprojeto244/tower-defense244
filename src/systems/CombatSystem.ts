import { Tower } from "../entities/Tower";
import { Enemy } from "../entities/Enemy";

export class CombatSystem {
  fire(
    towers: Tower[],
    enemies: Enemy[],
    dt: number
  ): number {
    let kills = 0;

    for (const tower of towers) {
      tower.update(dt);

      if (
        tower.stats.id === "support" ||
        tower.cooldown > 0
      ) {
        continue;
      }

      const target = enemies
        .filter(enemy =>
          !enemy.dead &&
          Math.hypot(
            enemy.x - tower.x,
            enemy.y - tower.y
          ) <= tower.range
        )
        .sort(
          (a, b) =>
            b.segment - a.segment ||
            b.progress - a.progress
        )[0];

      if (!target) continue;

      tower.cooldown = tower.interval;

      for (const enemy of enemies) {
        if (enemy.dead) continue;

        const distance = Math.hypot(
          enemy.x - target.x,
          enemy.y - target.y
        );

        const isTarget = enemy === target;
        const inSplash =
          tower.stats.splash !== undefined &&
          distance <= tower.stats.splash;

        if (!isTarget && !inSplash) continue;

        const damage = isTarget
          ? tower.damage
          : tower.damage * 0.55;

        const wasAlive = !enemy.dead;

        enemy.takeDamage(damage);

        if (tower.stats.slow) {
          enemy.slow(
            tower.stats.slowDuration ?? 1
          );
        }

        if (wasAlive && enemy.dead) {
          kills++;
        }
      }
    }

    return kills;
  }
}