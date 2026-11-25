import "./style.css";

import { Game } from "./core/Game";
import { MAPS } from "./data/maps";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Elemento #app não encontrado.");
}

app.innerHTML = `
<header class="topbar">
  <div class="brand">
    <span class="crest">✦</span>

    <div>
      <strong>TOWER-DEFENSE<span>244</span></strong>
      <small>DEFENDE O REINO</small>
    </div>
  </div>

  <div class="stats">
    <div>
      <small>OURO</small>
      <b id="gold">650</b>
    </div>

    <div>
      <small>VIDAS</small>
      <b id="lives">20</b>
    </div>

    <div>
      <small>ONDA</small>
      <b id="wave">0</b>
    </div>

    <div>
      <small>ELIMINAÇÕES</small>
      <b id="kills">0</b>
    </div>
  </div>
</header>

<main class="layout">
  <section class="game-panel">

    <div class="panel-heading">
      <div>
        <span class="eyebrow">CAMPO DE BATALHA</span>
        <h1>Defesa do Reino</h1>
        <p id="status">Prepara a defesa</p>
      </div>

      <div class="actions">
        <button id="start" class="primary">
          Novo jogo
        </button>

        <button id="next-wave">
          Próxima onda
        </button>

        <button id="pause">
          Pausa
        </button>
      </div>
    </div>

    <div class="canvas-wrap">
      <canvas
        id="game"
        width="800"
        height="500"
        aria-label="Campo de batalha do jogo"
      ></canvas>
    </div>

    <p id="notice" class="notice">
      Escolhe uma torre e clica no mapa para a construir.
    </p>

    <div class="bottom-tools">
      <label>
        Mapa

        <select id="map-select">
          ${MAPS.map((map, index) =>
            `<option value="${index}">${map.name}</option>`
          ).join("")}
        </select>
      </label>

      <div>
        <button id="meteor">☄ Meteoro</button>
        <button id="freeze">❄ Congelar</button>
      </div>

      <div>
        <button id="save">Guardar</button>
        <button id="load">Carregar</button>
      </div>
    </div>
  </section>

  <aside class="sidebar">

    <section class="card">
      <span class="eyebrow">ARSENAL</span>
      <h2>Construir torres</h2>

      <div class="tower-grid">
        <button class="tower-button" data-tower="archer">
          <span>🏹</span>
          <b>Arqueiros</b>
          <small>100 ouro</small>
        </button>

        <button class="tower-button" data-tower="cannon">
          <span>💣</span>
          <b>Canhão</b>
          <small>180 ouro</small>
        </button>

        <button class="tower-button" data-tower="fire">
          <span>🔥</span>
          <b>Fogo</b>
          <small>160 ouro</small>
        </button>

        <button class="tower-button" data-tower="ice">
          <span>❄️</span>
          <b>Gelo</b>
          <small>150 ouro</small>
        </button>

        <button class="tower-button" data-tower="lightning">
          <span>⚡</span>
          <b>Elétrica</b>
          <small>240 ouro</small>
        </button>

        <button class="tower-button" data-tower="bomb">
          <span>💥</span>
          <b>Bombas</b>
          <small>220 ouro</small>
        </button>

        <button class="tower-button" data-tower="laser">
          <span>🔮</span>
          <b>Laser</b>
          <small>300 ouro</small>
        </button>

        <button class="tower-button" data-tower="poison">
          <span>☠️</span>
          <b>Veneno</b>
          <small>190 ouro</small>
        </button>

        <button class="tower-button" data-tower="sniper">
          <span>🎯</span>
          <b>Precisão</b>
          <small>280 ouro</small>
        </button>

        <button class="tower-button" data-tower="summoner">
          <span>🌀</span>
          <b>Invocador</b>
          <small>260 ouro</small>
        </button>

        <button class="tower-button" data-tower="support">
          <span>🛡️</span>
          <b>Apoio</b>
          <small>200 ouro</small>
        </button>

        <button class="tower-button" data-tower="void">
          <span>🌑</span>
          <b>Vazio</b>
          <small>350 ouro</small>
        </button>
      </div>
    </section>

    <section class="card selected-card">
      <span class="eyebrow">TORRE SELECIONADA</span>

      <p id="tower-info">
        Nenhuma torre selecionada
      </p>

      <div class="upgrade-row">
        <button id="upgrade">
          Melhorar torre
        </button>

        <button id="sell" class="danger">
          Vender
        </button>
      </div>
    </section>

    <section class="card">
      <span class="eyebrow">DEFINIÇÕES</span>

      <label class="toggle">
        <input type="checkbox" id="sound" checked>
        Efeitos sonoros
      </label>

      <p class="tip">
        Dica: combina torres de grande alcance,
        velocidade e dano de área para defender o reino.
      </p>
    </section>

  </aside>
</main>

<footer>
  TOWER-DEFENSE244
  <span>·</span>
  Versão 1.0
  <span>·</span>
  Feito com TypeScript
</footer>
`;

const canvas =
  document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Canvas não encontrado.");
}

new Game(canvas);