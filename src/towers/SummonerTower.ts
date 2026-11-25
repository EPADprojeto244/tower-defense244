import { Tower } from "../entities/Tower";
import { TOWERS } from "../data/towers";

export class SummonerTower extends Tower {
  constructor(x: number, y: number) {
    super(x, y, TOWERS.summoner);
  }
}