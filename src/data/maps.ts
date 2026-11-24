
export interface MapDefinition {
  id: string;
  name: string;
  description: string;
  theme: "forest" | "dark" | "desert" | "ice" | "volcano" | "kingdom";
  background: string;
  startingGold: number;
  startingLives: number;
  difficulty: number;
  gridWidth: number;
  gridHeight: number;
}

export const MAPS: MapDefinition[] = [
  {
    id: "green-valley",
    name: "Green Valley",
    description: "Um vale verde protegido por antigas florestas.",
    theme: "forest",
    background: "#668d50",
    startingGold: 500,
    startingLives: 20,
    difficulty: 1,
    gridWidth: 16,
    gridHeight: 12
  },
  {
    id: "dark-forest",
    name: "Dark Forest",
    description: "Uma floresta dominada pelas forças obscuras.",
    theme: "dark",
    background: "#354b3c",
    startingGold: 500,
    startingLives: 20,
    difficulty: 2,
    gridWidth: 16,
    gridHeight: 12
  },
  {
    id: "desert-of-ashes",
    name: "Desert of Ashes",
    description: "Um deserto marcado por guerras antigas.",
    theme: "desert",
    background: "#b28b55",
    startingGold: 550,
    startingLives: 20,
    difficulty: 3,
    gridWidth: 16,
    gridHeight: 12
  },
  {
    id: "frozen-kingdom",
    name: "Frozen Kingdom",
    description: "Um reino coberto por gelo e neve.",
    theme: "ice",
    background: "#9ac6d6",
    startingGold: 550,
    startingLives: 20,
    difficulty: 4,
    gridWidth: 16,
    gridHeight: 12
  },
  {
    id: "volcanic-lands",
    name: "Volcanic Lands",
    description: "Terras devastadas pelo fogo.",
    theme: "volcano",
    background: "#71463a",
    startingGold: 600,
    startingLives: 20,
    difficulty: 5,
    gridWidth: 16,
    gridHeight: 12
  },
  {
    id: "final-kingdom",
    name: "Final Kingdom",
    description: "A última fortaleza contra as trevas.",
    theme: "kingdom",
    background: "#82734f",
    startingGold: 650,
    startingLives: 25,
    difficulty: 6,
    gridWidth: 16,
    gridHeight: 12
  }
];

