import { createWave } from "../data/waves";
import { scaledEnemy } from "../data/enemies";
import { Enemy } from "../entities/Enemy";
import type { Point } from "../data/maps";

interface QueueItem {
  id: keyof typeof import("../data/enemies").ENEMIES;
  count: number;
  delay: number;
}

export class WaveSystem {
  wave = 0;

  queue: QueueItem[] = [];
  timer = 0;
  active = false;

  start(path: Point[]): void {
    if (this.active || this.queue.length > 0) {
      return;
    }

    this.wave++;

    this.queue = createWave(this.wave).map(entry => ({
      id: entry.enemy,
      count: entry.count,
      delay: entry.delay
    }));

    this.timer = 0;
    this.active = true;
  }

  update(
    dt: number,
    path: Point[],
    enemies: Enemy[]
  ): void {
    if (this.queue.length === 0) {
      this.active = enemies.length > 0;
      return;
    }

    this.timer -= dt;

    if (this.timer > 0) return;

    const item = this.queue[0];

    enemies.push(
      new Enemy(
        scaledEnemy(item.id, this.wave),
        path
      )
    );

    item.count--;
    this.timer = item.delay;

    if (item.count <= 0) {
      this.queue.shift();
    }
  }

  get finished(): boolean {
    return !this.active && this.queue.length === 0;
  }
}