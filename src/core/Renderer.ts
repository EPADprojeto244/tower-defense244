
export class Renderer {
  readonly context: CanvasRenderingContext2D;

  private width = 0;
  private height = 0;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Não foi possível criar o Canvas 2D.");
    }

    this.context = context;
    this.resize();

    window.addEventListener("resize", this.resize);
  }

  resize = (): void => {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);

    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  get size(): { width: number; height: number } {
    return {
      width: this.width,
      height: this.height
    };
  }

  destroy(): void {
    window.removeEventListener("resize", this.resize);
  }
}

