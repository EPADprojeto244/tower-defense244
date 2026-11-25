import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class Healer extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.healer, path);
  }
}