import { Tower } from "../entities/Tower";
import { TOWERS } from "../data/towers";

export class LaserTower extends Tower {
  constructor(x: number, y: number) {
    super(x, y, TOWERS.laser);
  }
}