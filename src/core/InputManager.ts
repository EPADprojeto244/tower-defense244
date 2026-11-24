
export interface PointerPosition {
  x: number;
  y: number;
}

export class InputManager {
  pointer: PointerPosition = { x: 0, y: 0 };
  clicked = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointermove", this.onMove);
    canvas.addEventListener("pointerdown", this.onDown);
    window.addEventListener("pointerup", this.onUp);
  }

  private onMove = (event: PointerEvent): void => {
    const rect = this.canvas.getBoundingClientRect();

    this.pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  private onDown = (): void => {
    this.clicked = true;
  };

  private onUp = (): void => {
    this.clicked = false;
  };

  destroy(): void {
    this.canvas.removeEventListener("pointermove", this.onMove);
    this.canvas.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointerup", this.onUp);
  }
}

