
export type GameState =
  | "menu"
  | "map-selection"
  | "playing"
  | "paused"
  | "victory"
  | "game-over";

export class StateManager {
  private currentState: GameState = "menu";

  private readonly listeners = new Set<
    (state: GameState) => void
  >();

  getState(): GameState {
    return this.currentState;
  }

  setState(state: GameState): void {
    if (state === this.currentState) return;

    this.currentState = state;

    for (const listener of this.listeners) {
      listener(state);
    }
  }

  isPlaying(): boolean {
    return this.currentState === "playing";
  }

  isPaused(): boolean {
    return this.currentState === "paused";
  }

  subscribe(
    listener: (state: GameState) => void
  ): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }
}
