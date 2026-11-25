import type { EnemyStats } from "../data/enemies";
import type { Point } from "../data/maps";

export class Enemy {
  x: number;
  y: number;

  hp: number;
  maxHp: number;

  segment = 0;
  progress = 0;
  slowTimer = 0;
  dead = false;

  constructor(
    public stats: EnemyStats,
    private path: Point[]
  ) {
    this.x = path[0].x;
    this.y = path[0].y;

    this.hp = stats.hp;
    this.maxHp = stats.hp;
  }

  update(dt: number): boolean {
    if (this.dead) return false;

    if (this.slowTimer > 0) {
      this.slowTimer = Math.max(
        0,
        this.slowTimer - dt
      );
    }

    const a = this.path[this.segment];
    const b = this.path[this.segment + 1];

    if (!b) return true;

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;

    const speedMultiplier =
      this.slowTimer > 0 ? 0.55 : 1;

    const step =
      this.stats.speed * speedMultiplier * dt;

    this.progress += step / length;

    if (this.progress >= 1) {
      this.segment++;
      this.progress = 0;

      if (this.segment >= this.path.length - 1) {
        this.dead = true;
        return true;
      }
    }

    const current = this.path[this.segment];
    const next = this.path[this.segment + 1];

    if (!next) {
      this.x = current.x;
      this.y = current.y;
      return true;
    }

    this.x =
      current.x +
      (next.x - current.x) * this.progress;

    this.y =
      current.y +
      (next.y - current.y) * this.progress;

    return false;
  }

  takeDamage(amount: number): void {
    const finalDamage = Math.max(
      1,
      amount - this.stats.armor
    );

    this.hp -= finalDamage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.dead = true;
    }
  }

  slow(duration: number): void {
    this.slowTimer = Math.max(
      this.slowTimer,
      duration
    );
  }
}