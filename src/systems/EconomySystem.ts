export class EconomySystem {
  gold = 650;
  lives = 20;
  earned = 0;
  spent = 0;

  earn(amount: number): void {
    this.gold += amount;
    this.earned += amount;
  }

  spend(amount: number): boolean {
    if (this.gold < amount) return false;

    this.gold -= amount;
    this.spent += amount;

    return true;
  }

  loseLife(): void {
    this.lives = Math.max(0, this.lives - 1);
  }

  reset(): void {
    this.gold = 650;
    this.lives = 20;
    this.earned = 0;
    this.spent = 0;
  }
}