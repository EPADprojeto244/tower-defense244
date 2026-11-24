
export class EconomySystem {
  private coins: number;
  private totalEarned = 0;
  private totalSpent = 0;

  constructor(initialCoins = 500) {
    this.coins = Math.max(0, initialCoins);
    this.totalEarned = this.coins;
  }

  getBalance(): number {
    return this.coins;
  }

  canAfford(amount: number): boolean {
    return Number.isFinite(amount) &&
      amount >= 0 &&
      this.coins >= amount;
  }

  spend(amount: number): boolean {
    if (!Number.isFinite(amount) || amount <= 0) {
      return false;
    }

    if (!this.canAfford(amount)) {
      return false;
    }

    this.coins -= amount;
    this.totalSpent += amount;

    return true;
  }

  earn(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    this.coins += amount;
    this.totalEarned += amount;
  }

  rewardForEnemy(reward: number): void {
    this.earn(reward);
  }

  rewardForWave(wave: number): void {
    if (!Number.isFinite(wave) || wave <= 0) return;

    this.earn(50 + wave * 15);
  }

  refund(amount: number): void {
    this.earn(amount);
  }

  getStats() {
    return {
      coins: this.coins,
      totalEarned: this.totalEarned,
      totalSpent: this.totalSpent
    };
  }

  setBalance(amount: number): void {
    if (!Number.isFinite(amount) || amount < 0) return;

    this.coins = amount;
  }
}

