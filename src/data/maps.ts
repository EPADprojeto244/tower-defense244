
export type MapTheme =
  | "forest"
  | "dark"
  | "desert"
  | "ice"
  | "volcano"
  | "kingdom";

export interface GridPoint {
  x: number;
  y: number;
}

export interface MapDefinition {
  id: string;
  name: string;
  description: string;
  theme: MapTheme;
  background: string;
  startingGold: number;
  startingLives: number;
  difficulty: number;
  gridWidth: number;
  gridHeight: number;

  path: GridPoint[];
  obstacles: GridPoint[];

  pathColor: string;
  tileColors: [string, string];
  accentColor: string;
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
    gridHeight: 12,
    pathColor: "#b89a6a",
    tileColors: ["#83a95d", "#779d54"],
    accentColor: "#c7e58b",
    path: [
      { x: 0, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 5 },
      { x: 7, y: 5 },
      { x: 7, y: 8 },
      { x: 11, y: 8 },
      { x: 11, y: 4 },
      { x: 15, y: 4 }
    ],
    obstacles: [
      { x: 1, y: 8 },
      { x: 2, y: 9 },
      { x: 5, y: 1 },
      { x: 9, y: 2 },
      { x: 13, y: 9 },
      { x: 14, y: 8 }
    ]
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
    gridHeight: 12,
    pathColor: "#77634d",
    tileColors: ["#405d43", "#344c3a"],
    accentColor: "#a17cc4",
    path: [
      { x: 0, y: 9 },
      { x: 4, y: 9 },
      { x: 4, y: 3 },
      { x: 8, y: 3 },
      { x: 8, y: 7 },
      { x: 12, y: 7 },
      { x: 12, y: 2 },
      { x: 15, y: 2 }
    ],
    obstacles: [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 6, y: 9 },
      { x: 10, y: 1 },
      { x: 14, y: 9 }
    ]
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
    gridHeight: 12,
    pathColor: "#d8b77c",
    tileColors: ["#c6a16a", "#b28b55"],
    accentColor: "#f4d28a",
    path: [
      { x: 0, y: 1 },
      { x: 5, y: 1 },
      { x: 5, y: 4 },
      { x: 2, y: 4 },
      { x: 2, y: 9 },
      { x: 9, y: 9 },
      { x: 9, y: 5 },
      { x: 15, y: 5 }
    ],
    obstacles: [
      { x: 7, y: 2 },
      { x: 11, y: 2 },
      { x: 13, y: 9 },
      { x: 6, y: 7 }
    ]
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
    gridHeight: 12,
    pathColor: "#d4e8ec",
    tileColors: ["#a9d2df", "#8ebdce"],
    accentColor: "#e5fbff",
    path: [
      { x: 0, y: 10 },
      { x: 3, y: 10 },
      { x: 3, y: 6 },
      { x: 7, y: 6 },
      { x: 7, y: 2 },
      { x: 12, y: 2 },
      { x: 12, y: 8 },
      { x: 15, y: 8 }
    ],
    obstacles: [
      { x: 1, y: 2 },
      { x: 5, y: 9 },
      { x: 10, y: 5 },
      { x: 14, y: 3 }
    ]
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
    gridHeight: 12,
    pathColor: "#a77b5b",
    tileColors: ["#80513c", "#71463a"],
    accentColor: "#ff793c",
    path: [
      { x: 0, y: 3 },
      { x: 4, y: 3 },
      { x: 4, y: 8 },
      { x: 8, y: 8 },
      { x: 8, y: 4 },
      { x: 12, y: 4 },
      { x: 12, y: 10 },
      { x: 15, y: 10 }
    ],
    obstacles: [
      { x: 2, y: 7 },
      { x: 6, y: 1 },
      { x: 10, y: 9 },
      { x: 14, y: 2 }
    ]
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
    gridHeight: 12,
    pathColor: "#c0a77d",
    tileColors: ["#95865c", "#82734f"],
    accentColor: "#f0d18a",
    path: [
      { x: 0, y: 6 },
      { x: 3, y: 6 },
      { x: 3, y: 2 },
      { x: 7, y: 2 },
      { x: 7, y: 9 },
      { x: 11, y: 9 },
      { x: 11, y: 5 },
      { x: 15, y: 5 }
    ],
    obstacles: [
      { x: 1, y: 1 },
      { x: 5, y: 5 },
      { x: 9, y: 1 },
      { x: 14, y: 9 }
    ]
  }
];

// Obter mapa através do seu identificador
export function getMapById(id: string): MapDefinition | undefined {
  return MAPS.find(map => map.id === id);
}

// Verificar se uma posição pertence ao caminho
export function isPathCell(
  map: MapDefinition,
  x: number,
  y: number
): boolean {
  for (let i = 0; i < map.path.length - 1; i++) {
    const start = map.path[i];
    const end = map.path[i + 1];

    if (start.x === end.x) {
      if (
        x === start.x &&
        y >= Math.min(start.y, end.y) &&
        y <= Math.max(start.y, end.y)
      ) {
        return true;
      }
    }

    if (start.y === end.y) {
      if (
        y === start.y &&
        x >= Math.min(start.x, end.x) &&
        x <= Math.max(start.x, end.x)
      ) {
        return true;
      }
    }
  }

  const first = map.path[0];
  const last = map.path[map.path.length - 1];

  return (
    (x === first.x && y === first.y) ||
    (x === last.x && y === last.y)
  );
}

// Verificar se é possível construir uma torre
export function isBuildableCell(
  map: MapDefinition,
  x: number,
  y: number
): boolean {
  const insideMap =
    x >= 0 &&
    y >= 0 &&
    x < map.gridWidth &&
    y < map.gridHeight;

  if (!insideMap) return false;
  if (isPathCell(map, x, y)) return false;

  return !map.obstacles.some(
    obstacle => obstacle.x === x && obstacle.y === y
  );
}


