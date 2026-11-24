
import { GameLoop } from "./GameLoop";
import { InputManager } from "./InputManager";
import { Renderer } from "./Renderer";
import { StateManager } from "./StateManager";
import { IsometricEngine } from "./IsometricEngine";

import {
  MAPS,
  MapDefinition,
  isPathCell
} from "../data/maps";

export class Game {
  private readonly renderer: Renderer;
  private readonly input: InputManager;
  private readonly state = new StateManager();
  private readonly iso = new IsometricEngine(76, 38);
  private readonly loop: GameLoop;

  private currentMap: MapDefinition = MAPS[0];
  private animationTime = 0;

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

  setMap(mapId: string): boolean {
    const map = MAPS.find(item => item.id === mapId);

    if (!map) return false;

    this.currentMap = map;
    return true;
  }

  getCurrentMap(): MapDefinition {
    return this.currentMap;
  }

  private update(delta: number): void {
    if (!this.state.isPlaying()) return;

    this.animationTime += Math.min(delta, 0.1);
  }

  private render(): void {
    const ctx = this.renderer.context;
    const { width, height } = this.renderer.size;
    const map = this.currentMap;

    this.renderer.clear();

    ctx.fillStyle = map.background;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 30;

    // Desenhar terreno isométrico
    for (let y = 0; y < map.gridHeight; y++) {
      for (let x = 0; x < map.gridWidth; x++) {
        const pos = this.iso.toScreen({ x, y });

        const sx = centerX + pos.x;
        const sy = centerY + pos.y;

        const isPath = isPathCell(map, x, y);

        const obstacle = map.obstacles.some(
          item => item.x === x && item.y === y
        );

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 38, sy + 19);
        ctx.lineTo(sx, sy + 38);
        ctx.lineTo(sx - 38, sy + 19);
        ctx.closePath();

        if (isPath) {
          ctx.fillStyle = map.pathColor;
        } else {
          ctx.fillStyle =
            (x + y) % 2 === 0
              ? map.tileColors[0]
              : map.tileColors[1];
        }

        ctx.fill();

        ctx.strokeStyle = "rgba(30, 30, 30, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (obstacle) {
          this.drawRock(ctx, sx, sy);
        }
      }
    }

    // Desenhar decoração conforme o mapa
    this.drawEnvironment(ctx, centerX, centerY);

    // Entrada e saída do percurso
    this.drawMarker(
      ctx,
      centerX,
      centerY,
      map.path[0].x,
      map.path[0].y,
      "#55e58b",
      "ENTRADA"
    );

    const lastPoint = map.path[map.path.length - 1];

    this.drawMarker(
      ctx,
      centerX,
      centerY,
      lastPoint.x,
      lastPoint.y,
      "#ff5555",
      "BASE"
    );

    // Título
    ctx.save();

    ctx.fillStyle = "#fff2d0";
    ctx.font = "bold 25px Georgia";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 8;

    ctx.fillText("TOWER-DEFENSE244", width / 2, 42);

    ctx.shadowBlur = 0;
    ctx.font = "bold 13px Georgia";
    ctx.fillStyle = map.accentColor;

    ctx.fillText(map.name.toUpperCase(), width / 2, 65);

    ctx.restore();

    // Informação do mapa
    ctx.save();

    ctx.fillStyle = "rgba(20, 25, 20, 0.75)";
    ctx.fillRect(15, height - 65, 230, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "13px Arial";
    ctx.textAlign = "left";

    ctx.fillText(
      `Dificuldade: ${map.difficulty}/6`,
      28,
      height - 43
    );

    ctx.fillText(
      `Moedas: ${map.startingGold} | Vidas: ${map.startingLives}`,
      28,
      height - 23
    );

    ctx.restore();
  }

  private drawMarker(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    gridX: number,
    gridY: number,
    color: string,
    label: string
  ): void {
    const pos = this.iso.toScreen({
      x: gridX,
      y: gridY
    });

    const x = centerX + pos.x;
    const y = centerY + pos.y;

    ctx.save();

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.arc(x, y + 19, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - 10);

    ctx.restore();
  }

  private drawRock(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(x, y + 18, 19, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#68665e";
    ctx.beginPath();
    ctx.moveTo(x - 15, y + 13);
    ctx.lineTo(x - 12, y - 2);
    ctx.lineTo(x - 3, y - 12);
    ctx.lineTo(x + 12, y - 5);
    ctx.lineTo(x + 17, y + 12);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#99958a";
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 2);
    ctx.lineTo(x - 3, y - 12);
    ctx.lineTo(x + 4, y - 5);
    ctx.lineTo(x - 3, y + 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private drawEnvironment(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number
  ): void {
    const theme = this.currentMap.theme;

    if (theme === "forest" || theme === "dark") {
      this.drawTree(ctx, centerX - 210, centerY - 80);
      this.drawTree(ctx, centerX + 260, centerY - 100);
      this.drawTree(ctx, centerX - 280, centerY + 110);
    }

    if (theme === "desert") {
      this.drawCactus(ctx, centerX - 250, centerY);
      this.drawCactus(ctx, centerX + 280, centerY + 80);
    }

    if (theme === "ice") {
      this.drawIceCrystal(ctx, centerX - 230, centerY);
      this.drawIceCrystal(ctx, centerX + 250, centerY + 70);
    }

    if (theme === "volcano") {
      this.drawLavaRock(ctx, centerX - 250, centerY);
      this.drawLavaRock(ctx, centerX + 260, centerY + 70);
    }

    if (theme === "kingdom") {
      this.drawHouse(ctx, centerX + 180, centerY + 30);
      this.drawHouse(ctx, centerX - 220, centerY + 90);
    }
  }

  private drawTree(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

    ctx.fillStyle = "rgba(20,40,20,0.25)";
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 24, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#725039";
    ctx.fillRect(x - 5, y - 4, 10, 29);

    ctx.fillStyle = this.currentMap.theme === "dark"
      ? "#25352d"
      : "#315b36";

    ctx.beginPath();
    ctx.arc(x, y - 25, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.currentMap.theme === "dark"
      ? "#48513e"
      : "#527d42";

    ctx.beginPath();
    ctx.arc(x - 11, y - 36, 17, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private drawHouse(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

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

    ctx.restore();
  }

  private drawCactus(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

    ctx.fillStyle = "#387d49";
    ctx.fillRect(x - 5, y - 30, 10, 50);
    ctx.fillRect(x - 17, y - 12, 12, 7);
    ctx.fillRect(x - 17, y - 23, 7, 18);
    ctx.fillRect(x + 5, y - 3, 12, 7);
    ctx.fillRect(x + 10, y - 18, 7, 22);

    ctx.restore();
  }

  private drawIceCrystal(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

    ctx.fillStyle = "#a8f1ff";
    ctx.strokeStyle = "#e3ffff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, y - 42);
    ctx.lineTo(x + 15, y);
    ctx.lineTo(x, y + 15);
    ctx.lineTo(x - 15, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  private drawLavaRock(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    ctx.save();

    ctx.fillStyle = "#49332b";
    ctx.beginPath();
    ctx.arc(x, y, 23, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ff6b35";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#ff3c16";
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(x - 10, y + 7);
    ctx.lineTo(x, y - 8);
    ctx.lineTo(x + 8, y + 4);
    ctx.stroke();

    ctx.restore();
  }

  destroy(): void {
    this.loop.stop();
    this.input.destroy();
    this.renderer.destroy();
  }
}
