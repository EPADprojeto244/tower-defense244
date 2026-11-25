export class GameHUD {
  static set(id: string, value: string): void {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
    }
  }
}
