export class AchievementSystem {
  unlocked = new Set<string>();

  check(wave: number, kills: number): void {
    if (wave >= 1) {
      this.unlocked.add("first-wave");
    }

    if (wave >= 10) {
      this.unlocked.add("veteran");
    }

    if (kills >= 100) {
      this.unlocked.add("hunter");
    }
  }
}
