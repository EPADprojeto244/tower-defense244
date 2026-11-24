
export type DamageType =
  | "physical"
  | "fire"
  | "ice"
  | "poison"
  | "electric"
  | "magic";

export interface EnemyConfig {
  name?: string;
  health?: number;
  speed?: number;
  armor?: number;
  reward?: number;
  baseDamage?: number;
  radius?: number;
  x?: number;
  y?: number;
  color?: string;
  flying?: boolean;
  resistances?: Partial<Record<DamageType, number>>;
}

export interface PathPoint {
  x: number;
  y: number;
}

export class Enemy {
  readonly name: string;
  readonly maxHealth: number;
  readonly speed: number;
  readonly reward: number;
  readonly baseDamage: number;
  readonly radius: number;
  readonly flying: boolean;

  health: number;
  armor: number;
  x: number;
  y: number;
  color: string;

  path: PathPoint[] = [];
  pathIndex = 0;

  dead = false;
  reachedEnd = false;

  slowMultiplier = 1;
  slowTimer = 0;

  direction = 0;
  animationTime = 0;

  resistances: Partial<Record<DamageType, number>>;

  constructor(config: EnemyConfig = {}) {
    this.name = config.name ?? "Goblin";
    this.maxHealth = Math.max(1, config.health ?? 100);
    this.health = this.maxHealth;

    this.speed = Math.max(0, config.speed ?? 45);
    this.armor = Math.max(0, config.armor ?? 0);
    this.reward = Math.max(0, config.reward ?? 10);
    this.baseDamage = Math.max(0, config.baseDamage ?? 1);
    this.radius = Math.max(2, config.radius ?? 12);

    this.x = config.x ?? 0;
    this.y = config.y ?? 0;

    this.color = config.color ?? "#78a84b";
    this.flying = config.flying ?? false;

    this.resistances = config.resistances ?? {};
  }

  setPath(path: PathPoint[]): void {
    if (path.length < 2) {
      throw new Error("O caminho deve possuir pelo menos dois pontos.");
    }

    if (path.some(point =>
      !Number.isFinite(point.x) || !Number.isFinite(point.y)
    )) {
      throw new Error("O caminho contém coordenadas inválidas.");
    }

    this.path = path.map(point => ({ ...point }));
    this.pathIndex = 1;

    this.x = this.path[0].x;
    this.y = this.path[0].y;

    this.reachedEnd = false;
  }

  update(delta: number): void {
    if (this.dead || this.reachedEnd) return;

    const dt = Math.min(Math.max(delta, 0), 0.1);

    this.animationTime += dt;

    if (this.slowTimer > 0) {
      this.slowTimer = Math.max(0, this.slowTimer - dt);

      if (this.slowTimer === 0) {
        this.slowMultiplier = 1;
      }
    }

    let remainingMovement =
      this.speed * this.slowMultiplier * dt;

    while (remainingMovement > 0 && this.pathIndex < this.path.length) {
      const target = this.path[this.pathIndex];

      const dx = target.x - this.x;
      const dy = target.y - this.y;

      const distance = Math.hypot(dx, dy);

      if (distance < 0.001) {
        this.x = target.x;
        this.y = target.y;
        this.pathIndex++;
        continue;
      }

      this.direction = Math.atan2(dy, dx);

      if (remainingMovement >= distance) {
        this.x = target.x;
        this.y = target.y;

        remainingMovement -= distance;
        this.pathIndex++;
      } else {
        this.x += (dx / distance) * remainingMovement;
        this.y += (dy / distance) * remainingMovement;

        remainingMovement = 0;
      }
    }

    if (this.pathIndex >= this.path.length) {
      this.reachedEnd = true;
    }
  }

  takeDamage(amount: number, type: DamageType = "physical"): number {
    if (
      this.dead ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return 0;
    }

    const resistance = Math.min(
      0.9,
      Math.max(-1, this.resistances[type] ?? 0)
    );

    const reducedDamage =
      type === "physical"
        ? Math.max(1, amount - this.armor)
        : amount;

    const finalDamage = Math.max(
      0,
      reducedDamage * (1 - resistance)
    );

    this.health = Math.max(0, this.health - finalDamage);

    if (this.health <= 0) {
      this.dead = true;
    }

    return finalDamage;
  }

  applySlow(multiplier: number, duration: number): void {
    if (
      this.dead ||
      !Number.isFinite(multiplier) ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      return;
    }

    this.slowMultiplier = Math.min(
      this.slowMultiplier,
      Math.max(0.1, Math.min(1, multiplier))
    );

    this.slowTimer = Math.max(this.slowTimer, duration);
  }

  heal(amount: number): number {
    if (
      this.dead ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return 0;
    }

    const previousHealth = this.health;

    this.health = Math.min(
      this.maxHealth,
      this.health + amount
    );

    return this.health - previousHealth;
  }

  getHealthPercentage(): number {
    return Math.max(0, this.health / this.maxHealth);
  }

  get isAlive(): boolean {
    return !this.dead && !this.reachedEnd;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.isAlive) return;

    const bob = this.flying
      ? Math.sin(this.animationTime * 7) * 5
      : Math.abs(Math.sin(this.animationTime * 9)) * 2;

    const drawY = this.y + bob;

    ctx.save();

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y + this.radius * 0.7,
      this.radius * 1.1,
      this.radius * 0.45,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Corpo
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.flying ? 12 : 4;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x,
      drawY,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.shadowBlur = 0;

    // Olhos
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x + 4, drawY - 3, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#211b18";
    ctx.beginPath();
    ctx.arc(this.x + 5, drawY - 3, 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Barra de vida
    const barWidth = this.radius * 2.5;
    const barHeight = 4;
    const healthWidth = barWidth * this.getHealthPercentage();

    ctx.fillStyle = "#351d1d";
    ctx.fillRect(
      this.x - barWidth / 2,
      drawY - this.radius - 10,
      barWidth,
      barHeight
    );

    ctx.fillStyle =
      this.getHealthPercentage() > 0.5
        ? "#55dc72"
        : this.getHealthPercentage() > 0.25
          ? "#f3cb4d"
          : "#ed4949";

    ctx.fillRect(
      this.x - barWidth / 2,
      drawY - this.radius - 10,
      healthWidth,
      barHeight
    );

    ctx.restore();
  }
}


