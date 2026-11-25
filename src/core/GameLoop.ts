export class GameLoop {
  private frame = 0;
  private last = 0;
  private running = false;

  constructor(
    private update: (dt: number) => void,
    private render: () => void
  ) {}

  start(): void {
    if (this.running) return;

    this.running = true;
    this.last = performance.now();

    const tick = (now: number) => {
      if (!this.running) return;

      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;

      this.update(dt);
      this.render();

      this.frame = requestAnimationFrame(tick);
    };

    this.frame = requestAnimationFrame(tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frame);
  }
}