export interface Point {
  x: number;
  y: number;
}

export interface GameMap {
  id: string;
  name: string;
  description: string;
  path: Point[];
}

export const MAPS: GameMap[] = [
  {
    id: "green",
    name: "Vale Verde",
    description: "Um vale antigo protegido por muralhas.",
    path: [
      { x: 0, y: 145 },
      { x: 150, y: 145 },
      { x: 150, y: 310 },
      { x: 350, y: 310 },
      { x: 350, y: 125 },
      { x: 560, y: 125 },
      { x: 560, y: 390 },
      { x: 800, y: 390 }
    ]
  },
  {
    id: "forest",
    name: "Floresta Sombria",
    description: "Uma floresta coberta por nevoeiro.",
    path: [
      { x: 0, y: 350 },
      { x: 130, y: 350 },
      { x: 130, y: 120 },
      { x: 330, y: 120 },
      { x: 330, y: 330 },
      { x: 540, y: 330 },
      { x: 540, y: 180 },
      { x: 800, y: 180 }
    ]
  },
  {
    id: "frozen",
    name: "Reino Gelado",
    description: "Passagens geladas entre montanhas.",
    path: [
      { x: 0, y: 180 },
      { x: 190, y: 180 },
      { x: 190, y: 380 },
      { x: 390, y: 380 },
      { x: 390, y: 130 },
      { x: 610, y: 130 },
      { x: 610, y: 300 },
      { x: 800, y: 300 }
    ]
  },
  {
    id: "desert",
    name: "Deserto das Cinzas",
    description: "Ruínas antigas sob o calor.",
    path: [
      { x: 0, y: 110 },
      { x: 220, y: 110 },
      { x: 220, y: 280 },
      { x: 100, y: 280 },
      { x: 100, y: 410 },
      { x: 490, y: 410 },
      { x: 490, y: 190 },
      { x: 800, y: 190 }
    ]
  },
  {
    id: "volcano",
    name: "Terras Vulcânicas",
    description: "Um caminho junto à lava.",
    path: [
      { x: 0, y: 390 },
      { x: 180, y: 390 },
      { x: 180, y: 180 },
      { x: 370, y: 180 },
      { x: 370, y: 350 },
      { x: 590, y: 350 },
      { x: 590, y: 110 },
      { x: 800, y: 110 }
    ]
  },
  {
    id: "final",
    name: "Reino Final",
    description: "A última defesa do reino.",
    path: [
      { x: 0, y: 250 },
      { x: 120, y: 250 },
      { x: 120, y: 100 },
      { x: 330, y: 100 },
      { x: 330, y: 390 },
      { x: 520, y: 390 },
      { x: 520, y: 180 },
      { x: 800, y: 180 }
    ]
  }
];