export class TowerShop {
  static select(id: string): void {
    document
      .querySelector<HTMLButtonElement>(
        `[data-tower="${id}"]`
      )
      ?.click();
  }
}
