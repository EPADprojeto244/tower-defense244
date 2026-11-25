import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class ArmoredKnight extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.knight, path);
  }
}