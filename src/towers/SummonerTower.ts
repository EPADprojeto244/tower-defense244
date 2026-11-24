
import { Tower } from "../entities/Tower";

export class SummonerTower extends Tower {
  constructor(x = 0, y = 0) {
    super({
      name: "Summoner Tower",
      damage: 42,
      range: 200,
      attackSpeed: 1.15,
      cost: 320,
      projectileSpeed: 380,
      color: "#b36cff",
      damageType: "magic",
      targetMode: "first",
      x,
      y
    });
  }
}

