export type TowerId =
  | "archer" | "cannon" | "fire" | "ice"
  | "lightning" | "bomb" | "laser" | "poison"
  | "sniper" | "summoner" | "support" | "void";

export interface TowerStats {
  id: TowerId;
  name: string;
  cost: number;
  damage: number;
  interval: number;
  range: number;
  color: string;
  description: string;
  splash?: number;
  slow?: number;
  slowDuration?: number;
  damageType: "physical" | "fire" | "ice" | "magic" | "poison";
}

export const TOWERS: Record<TowerId, TowerStats> = {
  archer: {
    id: "archer",
    name: "Torre de Arqueiros",
    cost: 100,
    damage: 18,
    interval: 0.7,
    range: 150,
    color: "#78d66b",
    description: "Disparos rápidos e equilibrados.",
    damageType: "physical"
  },
  cannon: {
    id: "cannon",
    name: "Canhão",
    cost: 180,
    damage: 65,
    interval: 1.8,
    range: 125,
    color: "#a8aeb9",
    description: "Explosões de área.",
    splash: 48,
    damageType: "physical"
  },
  fire: {
    id: "fire",
    name: "Torre de Fogo",
    cost: 160,
    damage: 22,
    interval: 0.9,
    range: 135,
    color: "#ff7547",
    description: "Dano de fogo em área.",
    splash: 25,
    damageType: "fire"
  },
  ice: {
    id: "ice",
    name: "Torre de Gelo",
    cost: 150,
    damage: 12,
    interval: 0.8,
    range: 140,
    color: "#74dfff",
    description: "Abranda os inimigos.",
    slow: 0.45,
    slowDuration: 1.8,
    damageType: "ice"
  },
  lightning: {
    id: "lightning",
    name: "Torre Elétrica",
    cost: 240,
    damage: 40,
    interval: 1.2,
    range: 165,
    color: "#f6e36b",
    description: "Ataques elétricos poderosos.",
    damageType: "magic"
  },
  bomb: {
    id: "bomb",
    name: "Torre de Bombas",
    cost: 220,
    damage: 85,
    interval: 2.2,
    range: 120,
    color: "#ff9c4a",
    description: "Dano elevado em área.",
    splash: 58,
    damageType: "physical"
  },
  laser: {
    id: "laser",
    name: "Torre Laser",
    cost: 300,
    damage: 32,
    interval: 0.35,
    range: 180,
    color: "#e879ff",
    description: "Ataques de energia rápidos.",
    damageType: "magic"
  },
  poison: {
    id: "poison",
    name: "Torre de Veneno",
    cost: 190,
    damage: 10,
    interval: 0.75,
    range: 145,
    color: "#9ee65a",
    description: "Dano de veneno.",
    damageType: "poison"
  },
  sniper: {
    id: "sniper",
    name: "Torre de Precisão",
    cost: 280,
    damage: 150,
    interval: 2.8,
    range: 260,
    color: "#d5c4a1",
    description: "Grande alcance e dano.",
    damageType: "physical"
  },
  summoner: {
    id: "summoner",
    name: "Invocador",
    cost: 260,
    damage: 24,
    interval: 1.4,
    range: 155,
    color: "#c18cff",
    description: "Projéteis de energia arcana.",
    damageType: "magic"
  },
  support: {
    id: "support",
    name: "Torre de Apoio",
    cost: 200,
    damage: 0,
    interval: 0,
    range: 145,
    color: "#5ed3b0",
    description: "Apoia as torres próximas.",
    damageType: "magic"
  },
  void: {
    id: "void",
    name: "Torre do Vazio",
    cost: 350,
    damage: 75,
    interval: 1.5,
    range: 175,
    color: "#8b72e8",
    description: "Poder sombrio de grande impacto.",
    splash: 20,
    damageType: "magic"
  }
};

export const UPGRADE_COST = [0, 90, 150, 230];

export function towerDamage(tower: TowerStats, level: number): number {
  return Math.round(
    tower.damage * (1 + Math.max(0, level - 1) * 0.55)
  );
}
