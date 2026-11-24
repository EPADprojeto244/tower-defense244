
export class GameLoop {
  private animationId = 0;
  private lastTime = 0;
  private running = false;

  constructor(
    private readonly update: (delta: number) => void,
    private readonly render: () => void
  ) {}

  start(): void {
    if (this.running) return;

    this.running = true;
    this.lastTime = performance.now();

    this.tick(this.lastTime);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }

  private tick = (time: number): void => {
    if (!this.running) return;

    const delta = Math.min((time - this.lastTime) / 1000, 0.05);

    this.lastTime = time;

    this.update(delta);
    this.render();

    this.animationId = requestAnimationFrame(this.tick);
  };
}

