import { Enemy } from "./Enemy";

export class Boss extends Enemy {
  phase = 1;

  update(dt: number): boolean {
    const result = super.update(dt);

    this.phase =
      this.hp < this.maxHp * 0.5 ? 2 : 1;

    return result;
  }
}
