
import { Tower } from "../entities/Tower";
import { Enemy } from "../entities/Enemy";
import { Projectile } from "../entities/Projectile";

export class IceTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Ice Tower",
      damage: 20,
      range: 180,
      attackSpeed: 0.9,
      cost: 200,
      projectileSpeed: 340,
      color: "#55d9ff",
      damageType: "ice",
      targetMode: "first",
      x,
      y
    });
  }

  protected attack(
    target: Enemy,
    projectiles: Projectile[]
  ): void {
    projectiles.push(new Projectile({
      x: this.x,
      y: this.y,
      target,
      damage: this.damage,
      speed: this.projectileSpeed,
      color: this.color,
      damageType: "ice",
      onHit: (enemy) => {
        enemy.applySlow(0.5, 2.5);
        this.totalDamage += this.damage;
        if (enemy.dead) this.totalKills++;
      }
    }));
  }
}

