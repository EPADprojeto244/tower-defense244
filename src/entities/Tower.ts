import type { TowerStats } from "../data/towers";

export class Tower {
  level = 1;
  cooldown = 0;

  constructor(
    public x: number,
    public y: number,
    public stats: TowerStats
  ) {}

  update(dt: number): void {
    this.cooldown = Math.max(
      0,
      this.cooldown - dt
    );
  }

  get damage(): number {
    return Math.round(
      this.stats.damage *
      (1 + (this.level - 1) * 0.55)
    );
  }

  get range(): number {
    return this.stats.range *
      (1 + (this.level - 1) * 0.08);
  }

  get interval(): number {
    if (this.stats.interval <= 0) return 0;

    return this.stats.interval /
      (1 + (this.level - 1) * 0.12);
  }

  upgrade(): boolean {
    if (this.level >= 3) return false;

    this.level++;
    return true;
  }
}