
import type { DamageType } from "./Enemy";
import type { Enemy } from "./Enemy";

export interface ProjectileConfig {
  x: number;
  y: number;
  target: Enemy;
  damage: number;
  speed?: number;
  color?: string;
  radius?: number;
  damageType?: DamageType;
  splashRadius?: number;
  onHit?: (target: Enemy, damage: number) => void;
}

export class Projectile {
  x: number;
  y: number;

  readonly target: Enemy;
  readonly damage: number;
  readonly speed: number;
  readonly color: string;
  readonly radius: number;
  readonly damageType: DamageType;
  readonly splashRadius: number;

  active = true;
  private readonly onHit?: ProjectileConfig["onHit"];

  constructor(config: ProjectileConfig) {
    this.x = config.x;
    this.y = config.y;
    this.target = config.target;
    this.damage = config.damage;
    this.speed = config.speed ?? 350;
    this.color = config.color ?? "#ffd166";
    this.radius = config.radius ?? 5;
    this.damageType = config.damageType ?? "physical";
    this.splashRadius = config.splashRadius ?? 0;
    this.onHit = config.onHit;
  }

  update(delta: number): void {
    if (!this.active) return;

    if (this.target.dead || this.target.reachedEnd) {
      this.active = false;
      return;
    }

    const dt = Math.min(Math.max(delta, 0), 0.1);
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const distance = Math.hypot(dx, dy);
    const movement = this.speed * dt;

    if (distance <= movement + this.target.radius) {
      this.x = this.target.x;
      this.y = this.target.y;
      this.hitTarget();
      return;
    }

    if (distance > 0) {
      this.x += (dx / distance) * movement;
      this.y += (dy / distance) * movement;
    }
  }

  private hitTarget(): void {
    if (!this.active) return;

    this.active = false;

    const dealtDamage = this.target.takeDamage(
      this.damage,
      this.damageType
    );

    this.onHit?.(this.target, dealtDamage);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;

    ctx.save();

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

