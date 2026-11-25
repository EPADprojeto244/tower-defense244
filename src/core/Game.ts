import { MAPS } from "../data/maps";
import {
  TOWERS,
  UPGRADE_COST,
  type TowerId
} from "../data/towers";

import { Enemy } from "../entities/Enemy";
import { Tower } from "../entities/Tower";

import { Renderer } from "./Renderer";
import { GameLoop } from "./GameLoop";
import { InputManager } from "./InputManager";
import { StateManager } from "./StateManager";

import { EconomySystem } from "../systems/EconomySystem";
import { CombatSystem } from "../systems/CombatSystem";
import { WaveSystem } from "../systems/WaveSystem";
import { UpgradeSystem } from "../systems/UpgradeSystem";
import { AbilitySystem } from "../systems/AbilitySystem";
import { SaveSystem } from "../systems/SaveSystem";
import { AudioSystem } from "../systems/AudioSystem";

export class Game {
  private renderer: Renderer;
  private loop: GameLoop;

  private state = new StateManager();
  private economy = new EconomySystem();
  private combat = new CombatSystem();
  private waves = new WaveSystem();
  private upgrades = new UpgradeSystem();
  private abilities = new AbilitySystem();
  private save = new SaveSystem();
  private audio = new AudioSystem();

  private mapIndex = 0;

  private towers: Tower[] = [];
  private enemies: Enemy[] = [];

  private selected: Tower | null = null;
  private placing: TowerId | null = null;

  private kills = 0;
  private autoTimer = 2;

  constructor(
    private canvas: HTMLCanvasElement
  ) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas não suportado.");
    }

    this.renderer = new Renderer(context);

    this.loop = new GameLoop(
      dt => this.update(dt),
      () => this.render()
    );

    new InputManager(
      canvas,
      (x, y) => this.onClick(x, y)
    );

    this.bindUI();
    this.refresh();
  }

  private get map() {
    return MAPS[this.mapIndex];
  }

  private bindUI(): void {
    const get = (id: string) =>
      document.getElementById(id);

    get("start")?.addEventListener(
      "click",
      () => this.start()
    );

    get("next-wave")?.addEventListener(
      "click",
      () => this.startWave()
    );

    get("pause")?.addEventListener(
      "click",
      () => {
        this.state.pause();
        this.refresh();
      }
    );

    get("upgrade")?.addEventListener(
      "click",
      () => this.upgradeSelected()
    );

    get("sell")?.addEventListener(
      "click",
      () => this.sellSelected()
    );

    get("map-select")?.addEventListener(
      "change",
      event => {
        const target = event.target as HTMLSelectElement;

        this.mapIndex = Number(target.value);
        this.reset();
      }
    );

    get("save")?.addEventListener(
      "click",
      () => {
        this.save.save({
          wave: this.waves.wave,
          gold: this.economy.gold,
          lives: this.economy.lives,
          mapId: this.map.id
        });

        this.notice("Jogo guardado.");
      }
    );

    get("load")?.addEventListener(
      "click",
      () => {
        const data = this.save.load();

        if (!data) {
          this.notice("Não existe nenhum jogo guardado.");
          return;
        }

        const index = MAPS.findIndex(
          map => map.id === data.mapId
        );

        this.mapIndex = Math.max(0, index);
        this.economy.gold = data.gold;
        this.economy.lives = data.lives;
        this.waves.wave = data.wave;

        this.notice(
          "Dados carregados. Inicia uma nova onda."
        );

        this.refresh();
      }
    );

    get("meteor")?.addEventListener(
      "click",
      () => {
        if (this.abilities.meteor(this.enemies)) {
          this.audio.play(110);
        }
      }
    );

    get("freeze")?.addEventListener(
      "click",
      () => {
        if (this.abilities.freeze(this.enemies)) {
          this.audio.play(660);
        }
      }
    );

    get("sound")?.addEventListener(
      "change",
      event => {
        this.audio.enabled =
          (event.target as HTMLInputElement).checked;
      }
    );

    document
      .querySelectorAll<HTMLButtonElement>("[data-tower]")
      .forEach(button => {
        button.addEventListener("click", () => {
          this.placing = button.dataset.tower as TowerId;
          this.selected = null;

          this.notice(
            `Escolheste ${TOWERS[this.placing].name}. Clica numa zona livre do mapa.`
          );

          this.refresh();
        });
      });
  }

  private start(): void {
    this.reset();
    this.state.start();
    this.startWave();
  }

  private reset(): void {
    this.loop.stop();

    this.towers = [];
    this.enemies = [];

    this.selected = null;
    this.placing = null;

    this.kills = 0;
    this.autoTimer = 2;

    this.economy.reset();
    this.waves = new WaveSystem();
    this.abilities = new AbilitySystem();

    this.state.start();

    this.refresh();
  }

  private startWave(): void {
    if (this.state.status !== "playing") {
      this.state.start();
    }

    this.waves.start(this.map.path);
    this.loop.start();

    this.refresh();
  }

  private onClick(x: number, y: number): void {
    if (this.state.status !== "playing") return;
    if (this.state.paused) return;

    const hit = [...this.towers]
      .reverse()
      .find(tower =>
        Math.hypot(
          tower.x - x,
          tower.y - y
        ) < 20
      );

    if (hit) {
      this.selected = hit;
      this.placing = null;
      this.refresh();
      return;
    }

    if (this.placing) {
      const nearPath = this.map.path.some(
        (a, index) => {
          const b = this.map.path[index + 1];

          if (!b) return false;

          const dx = b.x - a.x;
          const dy = b.y - a.y;

          const lengthSquared =
            dx * dx + dy * dy || 1;

          const t = Math.max(
            0,
            Math.min(
              1,
              (
                (x - a.x) * dx +
                (y - a.y) * dy
              ) / lengthSquared
            )
          );

          const closestX = a.x + t * dx;
          const closestY = a.y + t * dy;

          return Math.hypot(
            x - closestX,
            y - closestY
          ) < 38;
        }
      );

      const nearTower = this.towers.some(
        tower =>
          Math.hypot(
            tower.x - x,
            tower.y - y
          ) < 38
      );

      if (nearPath || nearTower) {
        this.notice(
          "Não podes construir nesse local."
        );
        return;
      }

      const stats = TOWERS[this.placing];

      if (this.economy.spend(stats.cost)) {
        this.towers.push(
          new Tower(x, y, stats)
        );

        this.audio.play(520);
        this.placing = null;
      } else {
        this.notice("Ouro insuficiente.");
      }

      this.refresh();
      return;
    }

    this.selected = null;
    this.refresh();
  }

  private upgradeSelected(): void {
    if (!this.selected) return;

    const success = this.upgrades.upgrade(
      this.selected,
      this.economy
    );

    this.notice(
      success
        ? "Torre melhorada."
        : "Não tens ouro suficiente ou a torre já está no nível máximo."
    );

    this.refresh();
  }

  private sellSelected(): void {
    if (!this.selected) return;

    this.upgrades.sell(
      this.selected,
      this.economy
    );

    this.towers = this.towers.filter(
      tower => tower !== this.selected
    );

    this.selected = null;

    this.refresh();
  }

  private update(dt: number): void {
    if (
      this.state.paused ||
      this.state.status !== "playing"
    ) {
      return;
    }

    this.abilities.update(dt);

    this.waves.update(
      dt,
      this.map.path,
      this.enemies
    );

    // Movimento dos inimigos
    for (const enemy of this.enemies) {
      if (enemy.update(dt)) {
        this.economy.loseLife();
      }
    }

    // Combate das torres
    const defeated = this.combat.fire(
      this.towers,
      this.enemies,
      dt
    );

    this.kills += defeated;

    // Recompensa básica por inimigo derrotado
    if (defeated > 0) {
      this.economy.earn(defeated * 8);
    }

    // Remover inimigos derrotados ou que chegaram ao fim
    this.enemies = this.enemies.filter(
      enemy => !enemy.dead
    );

    // Próxima onda automática
    this.autoTimer -= dt;

    if (
      this.waves.finished &&
      this.autoTimer <= 0
    ) {
      this.autoTimer = 3;
      this.startWave();
    }

    if (this.economy.lives <= 0) {
      this.state.end("lost");

      this.notice(
        "Derrota! Clica em Novo jogo para tentar novamente."
      );
    }

    this.refresh(false);
  }

  private render(): void {
    this.renderer.draw(
      this.map,
      this.towers,
      this.enemies,
      this.selected
    );
  }

  private refresh(render = true): void {
    const set = (
      id: string,
      value: string
    ): void => {
      const element = document.getElementById(id);

      if (element) {
        element.textContent = value;
      }
    };

    set("gold", String(this.economy.gold));
    set("lives", String(this.economy.lives));
    set("wave", String(this.waves.wave));
    set("kills", String(this.kills));

    set(
      "tower-info",
      this.selected
        ? `${this.selected.stats.name} · Nível ${this.selected.level} · Dano ${this.selected.damage} · Alcance ${Math.round(this.selected.range)}`
        : "Nenhuma torre selecionada"
    );

    const upgradeButton =
      document.getElementById(
        "upgrade"
      ) as HTMLButtonElement | null;

    if (upgradeButton) {
      upgradeButton.disabled =
        !this.selected ||
        this.selected.level >= 3;

      upgradeButton.textContent =
        this.selected &&
        this.selected.level < 3
          ? `Melhorar (${UPGRADE_COST[this.selected.level + 1]} ouro)`
          : "Melhorar torre";
    }

    const status =
      document.getElementById("status");

    if (status) {
      status.textContent = this.state.paused
        ? "Jogo em pausa"
        : this.state.status === "lost"
          ? "Derrota"
          : this.state.status === "playing"
            ? "A defender o reino"
            : "Prepara a defesa";
    }

    if (render) {
      this.render();
    }
  }

  private notice(message: string): void {
    const element =
      document.getElementById("notice");

    if (element) {
      element.textContent = message;
    }
  }
}