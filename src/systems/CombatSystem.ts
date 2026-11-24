
import { Enemy } from "../entities/Enemy";
import { Tower } from "../entities/Tower";
import { Projectile } from "../entities/Projectile";

export interface CombatCallbacks {
  onEnemyKilled?: (enemy: Enemy) => void;
  onEnemyReachedBase?: (enemy: Enemy) => void;
}

export class CombatSystem {
  update(
    delta: number,
    enemies: Enemy[],
    towers: Tower[],
    projectiles: Projectile[],
    callbacks: CombatCallbacks = {}
  ): void {
    // Atualizar movimento dos inimigos
    for (const enemy of enemies) {
      enemy.update(delta);
    }

    // Atualizar ataques das torres
    for (const tower of towers) {
      tower.update(delta, enemies, projectiles);
    }

    // Atualizar projéteis
    for (const projectile of projectiles) {
      projectile.update(delta);
    }

    // Remover projéteis inativos
    for (let i = projectiles.length - 1; i >= 0; i--) {
      if (!projectiles[i].active) {
        projectiles.splice(i, 1);
      }
    }

    // Processar inimigos eliminados e os que chegaram à base
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];

      if (enemy.dead) {
        callbacks.onEnemyKilled?.(enemy);
        enemies.splice(i, 1);
        continue;
      }

      if (enemy.reachedEnd) {
        callbacks.onEnemyReachedBase?.(enemy);
        enemies.splice(i, 1);
      }
    }
  }
}

