export class SettingsMenu {
  static setSound(enabled: boolean): void {
    const element = document.getElementById(
      "sound"
    ) as HTMLInputElement | null;

    if (element) {
      element.checked = enabled;
    }
  }
}
