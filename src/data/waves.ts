import type { EnemyId } from "./enemies";

export interface WaveEntry {
  enemy: EnemyId;
  count: number;
  delay: number;
}

const enemyOrder: EnemyId[] = [
  "goblin",
  "skeleton",
  "orc",
  "bat",
  "knight",
  "healer",
  "iceBeast",
  "fireDemon",
  "troll",
  "necromancer",
  "assassin",
  "darkTitan"
];

export function createWave(wave: number): WaveEntry[] {
  const tier = Math.min(
    enemyOrder.length - 1,
    Math.floor((wave - 1) / 3)
  );

  const entries: WaveEntry[] = [
    {
      enemy: enemyOrder[tier],
      count: 5 + wave * 2,
      delay: Math.max(0.28, 1.05 - wave * 0.025)
    }
  ];

  if (wave >= 4) {
    entries.push({
      enemy: enemyOrder[Math.max(0, tier - 1)],
      count: Math.ceil(wave * 1.3),
      delay: 0.55
    });
  }

  if (wave % 10 === 0) {
    entries.push({
      enemy: "darkTitan",
      count: 1,
      delay: 1
    });
  }

  return entries;
}
