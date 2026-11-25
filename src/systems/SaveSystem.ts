export interface SaveData {
  wave: number;
  gold: number;
  lives: number;
  mapId: string;
}

const SAVE_KEY = "tower-defense244-save";

export class SaveSystem {
  save(data: SaveData): void {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(data)
    );
  }

  load(): SaveData | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY);

      return raw
        ? JSON.parse(raw) as SaveData
        : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(SAVE_KEY);
  }
}
