import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class ShadowAssassin extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.assassin, path);
  }
}