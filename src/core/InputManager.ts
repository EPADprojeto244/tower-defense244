
export interface PointerPosition {
  x: number;
  y: number;
}

export class InputManager {
  pointer: PointerPosition = {
    x: 0,
    y: 0
  };

  pointerDown = false;
  pointerClicked = false;

  private readonly keys = new Set<string>();

  private readonly onPointerMove = (
    event: PointerEvent
  ): void => {
    this.updatePointer(event);
  };

  private readonly onPointerDown = (
    event: PointerEvent
  ): void => {
    this.updatePointer(event);

    if (event.button === 0) {
      this.pointerDown = true;
      this.pointerClicked = true;
    }
  };

  private readonly onPointerUp = (
    event: PointerEvent
  ): void => {
    if (event.button === 0) {
      this.pointerDown = false;
    }
  };

  private readonly onKeyDown = (
    event: KeyboardEvent
  ): void => {
    this.keys.add(event.key.toLowerCase());
  };

  private readonly onKeyUp = (
    event: KeyboardEvent
  ): void => {
    this.keys.delete(event.key.toLowerCase());
  };

  private readonly onBlur = (): void => {
    this.keys.clear();
    this.pointerDown = false;
  };

  constructor(
    private readonly canvas: HTMLCanvasElement
  ) {
    canvas.addEventListener(
      "pointermove",
      this.onPointerMove
    );

    canvas.addEventListener(
      "pointerdown",
      this.onPointerDown
    );

    window.addEventListener(
      "pointerup",
      this.onPointerUp
    );

    window.addEventListener(
      "keydown",
      this.onKeyDown
    );

    window.addEventListener(
      "keyup",
      this.onKeyUp
    );

    window.addEventListener(
      "blur",
      this.onBlur
    );
  }

  private updatePointer(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();

    this.pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  isKeyDown(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }

  consumeClick(): PointerPosition | null {
    if (!this.pointerClicked) return null;

    this.pointerClicked = false;

    return { ...this.pointer };
  }

  destroy(): void {
    this.canvas.removeEventListener(
      "pointermove",
      this.onPointerMove
    );

    this.canvas.removeEventListener(
      "pointerdown",
      this.onPointerDown
    );

    window.removeEventListener(
      "pointerup",
      this.onPointerUp
    );

    window.removeEventListener(
      "keydown",
      this.onKeyDown
    );

    window.removeEventListener(
      "keyup",
      this.onKeyUp
    );

    window.removeEventListener(
      "blur",
      this.onBlur
    );

    this.keys.clear();
  }
}
