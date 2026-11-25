
export interface RendererSize {
  width: number;
  height: number;
}

export class Renderer {
  readonly context: CanvasRenderingContext2D;

  private observer: ResizeObserver;
  private pixelRatio = 1;

  size: RendererSize = {
    width: 0,
    height: 0
  };

  constructor(
    private readonly canvas: HTMLCanvasElement
  ) {
    const context = canvas.getContext("2d", {
      alpha: false
    });

    if (!context) {
      throw new Error("Não foi possível criar o Canvas 2D.");
    }

    this.context = context;

    this.observer = new ResizeObserver(() => {
      this.resize();
    });

    this.observer.observe(canvas);

    this.resize();
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();

    this.pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    this.canvas.width = Math.round(
      width * this.pixelRatio
    );

    this.canvas.height = Math.round(
      height * this.pixelRatio
    );

    this.size = {
      width,
      height
    };

    this.context.setTransform(
      this.pixelRatio,
      0,
      0,
      this.pixelRatio,
      0,
      0
    );

    this.context.imageSmoothingEnabled = true;
  }

  clear(color = "#18251d"): void {
    const { width, height } = this.size;

    this.context.fillStyle = color;
    this.context.fillRect(0, 0, width, height);
  }

  getCanvasPosition(
    event: PointerEvent
  ): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  destroy(): void {
    this.observer.disconnect();
  }
}
