
import { Game } from "./core/Game";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Elemento #app não encontrado.");
}

app.innerHTML = `
  <main class="game-shell">

    <header class="topbar">
      <div class="brand">
        <span class="brand-icon">♜</span>

        <div>
          <h1>TOWER-DEFENSE244</h1>
          <p>FANTASY MEDIEVAL TOWER DEFENSE</p>
        </div>
      </div>

      <div class="resources">
        <span>🪙 <strong>500</strong></span>
        <span>❤️ <strong>20</strong></span>
        <span>⚔️ <strong>WAVE 1</strong></span>
      </div>
    </header>

    <section class="game-area">
      <canvas
        id="game-canvas"
        aria-label="Tower-Defense244 Green Valley"
      ></canvas>
    </section>

    <footer class="game-footer">

      <div class="map-information">
        <span class="status-dot"></span>
        GREEN VALLEY
      </div>

      <div class="game-controls">
        <button id="pause-button">Ⅱ PAUSE</button>
        <button id="start-button">▶ START</button>
      </div>

    </footer>
  </main>
`;

const canvas = document.querySelector<HTMLCanvasElement>(
  "#game-canvas"
);

if (!canvas) {
  throw new Error("Canvas não encontrado.");
}

const game = new Game(canvas);

document.querySelector("#start-button")
  ?.addEventListener("click", () => game.start());

document.querySelector("#pause-button")
  ?.addEventListener("click", () => game.pause());

window.addEventListener("beforeunload", () => {
  game.destroy();
});

