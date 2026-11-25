import { Tower } from "../entities/Tower";
import { UPGRADE_COST } from "../data/towers";
import { EconomySystem } from "./EconomySystem";

export class UpgradeSystem {
  upgrade(
    tower: Tower,
    economy: EconomySystem
  ): boolean {
    const cost = UPGRADE_COST[tower.level + 1];

    if (
      !cost ||
      tower.level >= 3 ||
      !economy.spend(cost)
    ) {
      return false;
    }

    return tower.upgrade();
  }

  sell(
    tower: Tower,
    economy: EconomySystem
  ): void {
    const refund = Math.round(
      tower.stats.cost * 0.7 +
      (tower.level - 1) * 45
    );

    economy.earn(refund);
  }
}
