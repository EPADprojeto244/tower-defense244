import { Tower } from "../entities/Tower";
import { TOWERS } from "../data/towers";

export class CannonTower extends Tower {
  constructor(x: number, y: number) {
    super(x, y, TOWERS.cannon);
  }
}