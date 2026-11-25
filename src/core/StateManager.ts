export type GameStatus = "menu" | "playing" | "won" | "lost";

export class StateManager {
  status: GameStatus = "menu";
  paused = false;

  start(): void {
    this.status = "playing";
    this.paused = false;
  }

  pause(): void {
    if (this.status === "playing") {
      this.paused = !this.paused;
    }
  }

  end(result: "won" | "lost"): void {
    this.status = result;
    this.paused = false;
  }

  reset(): void {
    this.status = "menu";
    this.paused = false;
  }
}