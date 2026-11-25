import { Enemy } from "../entities/Enemy";
import { ENEMIES } from "../data/enemies";
import type { Point } from "../data/maps";

export class IceBeast extends Enemy {
  constructor(path: Point[]) {
    super(ENEMIES.iceBeast, path);
  }
}