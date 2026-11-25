export class UpgradePanel {
  static refresh(text: string): void {
    const element =
      document.getElementById("tower-info");

    if (element) {
      element.textContent = text;
    }
  }
}
