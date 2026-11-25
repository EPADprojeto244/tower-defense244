export class GameOverScreen {
  static show(message: string): void {
    const element = document.getElementById("status");

    if (element) {
      element.textContent = message;
    }
  }
}
