
import { GameLoop } from "./GameLoop";
import { InputManager } from "./InputManager";
import { Renderer } from "./Renderer";
import { StateManager } from "./StateManager";
import { IsometricEngine } from "./IsometricEngine";
import { MAPS } from "../data/maps";

export class Game {
  private readonly renderer: Renderer;
  private readonly input: InputManager;
  private readonly state = new StateManager();
  private readonly iso = new IsometricEngine(76, 38);
  private readonly loop: GameLoop;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.input = new InputManager(canvas);

    this.loop = new GameLoop(
      (delta) => this.update(delta),
      () => this.render()
    );
  }

  start(): void {
    this.state.setState("playing");
    this.loop.start();
  }

  pause(): void {
    this.state.setState("paused");
  }

  resume(): void {
    this.state.setState("playing");
  }

  private update(delta: number): void {
    if (!this.state.isPlaying()) return;

    void delta;
  }

  private render(): void {
    const ctx = this.renderer.context;
    const { width, height } = this.renderer.size;
    const map = MAPS[0];

    this.renderer.clear();

    const centerX = width / 2;
    const centerY = height / 2 - 30;

    ctx.fillStyle = map.background;
    ctx.fillRect(0, 0, width, height);

    for (let y = 0; y < map.gridHeight; y++) {
      for (let x = 0; x < map.gridWidth; x++) {
        const pos = this.iso.toScreen({ x, y });
        const sx = centerX + pos.x;
        const sy = centerY + pos.y;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 38, sy + 19);
        ctx.lineTo(sx, sy + 38);
        ctx.lineTo(sx - 38, sy + 19);
        ctx.closePath();

        ctx.fillStyle = (x + y) % 2 === 0
          ? "#83a95d"
          : "#779d54";

        ctx.fill();

        ctx.strokeStyle = "rgba(39,70,38,0.12)";
        ctx.stroke();
      }
    }

    this.drawTree(ctx, centerX - 210, centerY - 80);
    this.drawTree(ctx, centerX + 260, centerY - 100);
    this.drawTree(ctx, centerX - 280, centerY + 110);
    this.drawHouse(ctx, centerX + 180, centerY + 30);

    ctx.fillStyle = "#fff2d0";
    ctx.font = "bold 25px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("TOWER-DEFENSE244", width / 2, 42);

    ctx.font = "13px Georgia";
    ctx.fillText("GREEN VALLEY", width / 2, 64);
  }

  private drawTree(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.fillStyle = "rgba(20,40,20,0.25)";
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 24, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#725039";
    ctx.fillRect(x - 5, y - 4, 10, 29);

    ctx.fillStyle = "#315b36";
    ctx.beginPath();
    ctx.arc(x, y - 25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#527d42";
    ctx.beginPath();
    ctx.arc(x - 11, y - 36, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#789b4e";
    ctx.beginPath();
    ctx.arc(x + 10, y - 40, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawHouse(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.fillStyle = "rgba(20,30,15,0.3)";
    ctx.beginPath();
    ctx.ellipse(x, y + 17, 48, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#c5a477";
    ctx.fillRect(x - 31, y - 19, 62, 43);

    ctx.fillStyle = "#853e32";
    ctx.beginPath();
    ctx.moveTo(x - 39, y - 19);
    ctx.lineTo(x, y - 49);
    ctx.lineTo(x + 39, y - 19);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#49301f";
    ctx.fillRect(x - 7, y - 2, 15, 26);

    ctx.fillStyle = "#f3d88b";
    ctx.fillRect(x - 24, y - 8, 10, 10);
  }

  destroy(): void {
    this.loop.stop();
    this.input.destroy();
    this.renderer.destroy();
  }
}

