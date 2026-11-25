import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class GiantTroll extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.troll, path);
  }
}