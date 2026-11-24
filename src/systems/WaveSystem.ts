
export interface WaveConfig {
  enemyCount: number;
  spawnInterval: number;
  healthMultiplier: number;
  speedMultiplier: number;
}

export interface SpawnInfo {
  wave: number;
  enemyIndex: number;
  totalEnemies: number;
  healthMultiplier: number;
  speedMultiplier: number;
}

export class WaveSystem {
  private currentWave = 0;
  private spawnedEnemies = 0;
  private spawnTimer = 0;
  private active = false;
  private completed = true;

  private config: WaveConfig = {
    enemyCount: 5,
    spawnInterval: 1.5,
    healthMultiplier: 1,
    speedMultiplier: 1
  };

  getCurrentWave(): number {
    return this.currentWave;
  }

  isActive(): boolean {
    return this.active;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  getSpawnedEnemies(): number {
    return this.spawnedEnemies;
  }

  getTotalEnemies(): number {
    return this.config.enemyCount;
  }

  getProgress(): number {
    return this.config.enemyCount === 0
      ? 1
      : this.spawnedEnemies / this.config.enemyCount;
  }

  startWave(): boolean {
    if (this.active) return false;

    this.currentWave++;

    this.config = this.createWaveConfig(this.currentWave);

    this.spawnedEnemies = 0;
    this.spawnTimer = 0;
    this.active = true;
    this.completed = false;

    return true;
  }

  update(
    delta: number,
    aliveEnemies: number,
    spawnEnemy: (info: SpawnInfo) => void
  ): void {
    if (!this.active) return;

    const dt = Math.min(Math.max(delta, 0), 0.1);

    this.spawnTimer -= dt;

    if (
      this.spawnedEnemies < this.config.enemyCount &&
      this.spawnTimer <= 0
    ) {
      spawnEnemy({
        wave: this.currentWave,
        enemyIndex: this.spawnedEnemies,
        totalEnemies: this.config.enemyCount,
        healthMultiplier: this.config.healthMultiplier,
        speedMultiplier: this.config.speedMultiplier
      });

      this.spawnedEnemies++;
      this.spawnTimer = this.config.spawnInterval;
    }

    if (
      this.spawnedEnemies >= this.config.enemyCount &&
      aliveEnemies <= 0
    ) {
      this.active = false;
      this.completed = true;
    }
  }

  private createWaveConfig(wave: number): WaveConfig {
    return {
      enemyCount: Math.min(5 + wave * 2, 60),
      spawnInterval: Math.max(0.4, 1.5 - wave * 0.025),
      healthMultiplier: 1 + (wave - 1) * 0.18,
      speedMultiplier: 1 + Math.min((wave - 1) * 0.025, 0.5)
    };
  }

  reset(): void {
    this.currentWave = 0;
    this.spawnedEnemies = 0;
    this.spawnTimer = 0;
    this.active = false;
    this.completed = true;
  }
}

