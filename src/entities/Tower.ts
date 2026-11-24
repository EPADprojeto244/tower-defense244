
import type { DamageType } from "./Enemy";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

export type TargetMode = "first" | "nearest" | "strongest";

export interface TowerConfig {
  name?: string;
  damage?: number;
  range?: number;
  attackSpeed?: number;
  cost?: number;
  projectileSpeed?: number;
  color?: string;
  damageType?: DamageType;
  targetMode?: TargetMode;
  x?: number;
  y?: number;
}

export class Tower {
  readonly name: string;
  readonly cost: number;
  readonly projectileSpeed: number;

  damage: number;
  range: number;
  attackSpeed: number;
  damageType: DamageType;
  color: string;

  x: number;
  y: number;

  level = 1;
  targetMode: TargetMode;
  cooldown = 0;
  totalDamage = 0;
  totalKills = 0;

  constructor(config: TowerConfig = {}) {
    this.name = config.name ?? "Archer Tower";
    this.damage = config.damage ?? 20;
    this.range = config.range ?? 150;
    this.attackSpeed = Math.max(0.1, config.attackSpeed ?? 1);
    this.cost = config.cost ?? 100;
    this.projectileSpeed = config.projectileSpeed ?? 350;
    this.color = config.color ?? "#d9a441";
    this.damageType = config.damageType ?? "physical";
    this.targetMode = config.targetMode ?? "first";

    this.x = config.x ?? 0;
    this.y = config.y ?? 0;
  }

  update(
    delta: number,
    enemies: Enemy[],
    projectiles: Projectile[]
  ): void {
    const dt = Math.min(Math.max(delta, 0), 0.1);

    this.cooldown = Math.max(0, this.cooldown - dt);

    if (this.cooldown > 0) return;

    const target = this.findTarget(enemies);

    if (!target) return;

    this.attack(target, projectiles);

    this.cooldown = 1 / this.attackSpeed;
  }

  private findTarget(enemies: Enemy[]): Enemy | undefined {
    const available = enemies.filter(enemy => {
      if (!enemy.isAlive) return false;

      const distance = Math.hypot(
        enemy.x - this.x,
        enemy.y - this.y
      );

      return distance <= this.range;
    });

    if (available.length === 0) return undefined;

    switch (this.targetMode) {
      case "nearest":
        return available.reduce((a, b) =>
          this.distanceTo(a) < this.distanceTo(b) ? a : b
        );

      case "strongest":
        return available.reduce((a, b) =>
          a.health > b.health ? a : b
        );

      case "first":
      default:
        return available.reduce((a, b) =>
          a.pathIndex > b.pathIndex ? a : b
        );
    }
  }

  private distanceTo(enemy: Enemy): number {
    return Math.hypot(enemy.x - this.x, enemy.y - this.y);
  }

  protected attack(
    target: Enemy,
    projectiles: Projectile[]
  ): void {
    const projectile = new Projectile({
      x: this.x,
      y: this.y,
      target,
      damage: this.damage,
      speed: this.projectileSpeed,
      color: this.color,
      damageType: this.damageType,
      onHit: (enemy, dealtDamage) => {
        this.totalDamage += dealtDamage;

        if (enemy.dead) {
          this.totalKills++;
        }
      }
    });

    projectiles.push(projectile);
  }

  upgrade(): number {
    const upgradeCost = Math.floor(this.cost * 0.65 * this.level);

    this.level++;
    this.damage = Math.round(this.damage * 1.35);
    this.range = Math.round(this.range * 1.08);
    this.attackSpeed = Math.min(5, this.attackSpeed * 1.08);

    return upgradeCost;
  }

  getUpgradeCost(): number {
    return Math.floor(this.cost * 0.65 * this.level);
  }

  getSellValue(): number {
    return Math.floor(
      this.cost * 0.6 + (this.level - 1) * this.cost * 0.3
    );
  }

  setTargetMode(mode: TargetMode): void {
    this.targetMode = mode;
  }

  getStats() {
    return {
      name: this.name,
      level: this.level,
      damage: this.damage,
      range: this.range,
      attackSpeed: this.attackSpeed,
      totalDamage: this.totalDamage,
      totalKills: this.totalKills,
      targetMode: this.targetMode
    };
  }

  drawRange(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(90, 180, 255, 0.10)";
    ctx.fill();

    ctx.strokeStyle = "rgba(120, 190, 255, 0.65)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;

    ctx.fillStyle = "#493322";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff0bd";
    ctx.beginPath();
    ctx.arc(this.x - 4, this.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

