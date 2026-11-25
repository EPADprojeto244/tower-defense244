import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class Orc extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.orc, path);
  }
}