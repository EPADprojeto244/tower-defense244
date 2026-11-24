
export type GameState =
  | "menu"
  | "playing"
  | "paused"
  | "victory"
  | "gameover";

export class StateManager {
  private currentState: GameState = "menu";

  get state(): GameState {
    return this.currentState;
  }

  setState(state: GameState): void {
    this.currentState = state;
  }

  isPlaying(): boolean {
    return this.currentState === "playing";
  }
}

