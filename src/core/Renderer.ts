import type { GameMap } from "../data/maps";
import type { Tower } from "../entities/Tower";
import type { Enemy } from "../entities/Enemy";

export class Renderer {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {}

  draw(
    map: GameMap,
    towers: Tower[],
    enemies: Enemy[],
    selected: Tower | null
  ): void {
    const ctx = this.ctx;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    const background = ctx.createLinearGradient(
      0, 0, width, height
    );

    background.addColorStop(0, "#203b36");
    background.addColorStop(1, "#111d2b");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Grelha do terreno
    for (let x = 0; x < width; x += 48) {
      for (let y = 0; y < height; y += 48) {
        ctx.fillStyle =
          (x / 48 + y / 48) % 2
            ? "rgba(255,255,255,.025)"
            : "rgba(0,0,0,.035)";

        ctx.fillRect(x, y, 48, 48);
      }
    }

    // Caminho dos inimigos
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#b69b67";
    ctx.lineWidth = 48;

    ctx.beginPath();

    map.path.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    ctx.strokeStyle = "#6d6048";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Torres
    towers.forEach((tower) => {
      if (selected === tower) {
        ctx.beginPath();
        ctx.arc(
          tower.x,
          tower.y,
          tower.range,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(110,205,255,.10)";
        ctx.fill();

        ctx.strokeStyle = "rgba(130,220,255,.6)";
        ctx.stroke();
      }

      ctx.fillStyle = "#18202c";
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 17, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = tower.stats.color;
      ctx.beginPath();
      ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        String(tower.level),
        tower.x,
        tower.y + 4
      );
    });

    // Inimigos e barras de vida
    enemies.forEach((enemy) => {
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.beginPath();
      ctx.ellipse(
        enemy.x,
        enemy.y + enemy.stats.radius,
        enemy.stats.radius,
        4,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.fillStyle = enemy.stats.color;
      ctx.beginPath();
      ctx.arc(
        enemy.x,
        enemy.y,
        enemy.stats.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();

      const barWidth = enemy.stats.radius * 2;
      const healthPercent = Math.max(
        0,
        enemy.hp / enemy.maxHp
      );

      ctx.fillStyle = "#351e27";
      ctx.fillRect(
        enemy.x - enemy.stats.radius,
        enemy.y - enemy.stats.radius - 9,
        barWidth,
        4
      );

      ctx.fillStyle = "#7ee081";
      ctx.fillRect(
        enemy.x - enemy.stats.radius,
        enemy.y - enemy.stats.radius - 9,
        barWidth * healthPercent,
        4
      );
    });

    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(map.name, 18, 22);
  }
}