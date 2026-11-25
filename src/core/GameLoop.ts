
export class GameLoop {
  private animationFrameId: number | null = null;
  private lastTime = 0;
  private running = false;

  private readonly updateCallback: (delta: number) => void;
  private readonly renderCallback: () => void;

  private accumulator = 0;
  private readonly fixedDelta = 1 / 60;

  constructor(
    update: (delta: number) => void,
    render: () => void
  ) {
    this.updateCallback = update;
    this.renderCallback = render;
  }

  start(): void {
    if (this.running) return;

    this.running = true;
    this.lastTime = 0;
    this.accumulator = 0;

    this.animationFrameId = requestAnimationFrame(
      this.frame
    );
  }

  private frame = (timestamp: number): void => {
    if (!this.running) return;

    if (this.lastTime === 0) {
      this.lastTime = timestamp;
    }

    const elapsed = Math.min(
      (timestamp - this.lastTime) / 1000,
      0.1
    );

    this.lastTime = timestamp;
    this.accumulator += elapsed;

    while (this.accumulator >= this.fixedDelta) {
      this.updateCallback(this.fixedDelta);
      this.accumulator -= this.fixedDelta;
    }

    this.renderCallback();

    this.animationFrameId = requestAnimationFrame(
      this.frame
    );
  };

  stop(): void {
    this.running = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  get isRunning(): boolean {
    return this.running;
  }
}
