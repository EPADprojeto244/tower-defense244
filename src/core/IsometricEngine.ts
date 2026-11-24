
export interface IsoPoint {
  x: number;
  y: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
}

export class IsometricEngine {
  constructor(
    public readonly tileWidth = 76,
    public readonly tileHeight = 38
  ) {
    if (tileWidth <= 0 || tileHeight <= 0) {
      throw new Error("As dimensões dos tiles devem ser positivas.");
    }
  }

  // Converter coordenadas da grelha para coordenadas do ecrã
  toScreen(
    point: IsoPoint,
    origin: ScreenPoint = { x: 0, y: 0 }
  ): ScreenPoint {
    return {
      x: origin.x + (point.x - point.y) * this.tileWidth / 2,
      y: origin.y + (point.x + point.y) * this.tileHeight / 2
    };
  }

  // Converter coordenadas do ecrã para coordenadas da grelha
  toGrid(
    point: ScreenPoint,
    origin: ScreenPoint = { x: 0, y: 0 }
  ): IsoPoint {
    const screenX = point.x - origin.x;
    const screenY = point.y - origin.y;

    return {
      x: screenX / this.tileWidth + screenY / this.tileHeight,
      y: screenY / this.tileHeight - screenX / this.tileWidth
    };
  }

  // Obter o centro visual de um tile
  getTileCenter(
    x: number,
    y: number,
    origin: ScreenPoint = { x: 0, y: 0 }
  ): ScreenPoint {
    return this.toScreen(
      { x: x + 0.5, y: y + 0.5 },
      origin
    );
  }

  // Descobrir o tile onde o rato está posicionado
  screenToCell(
    point: ScreenPoint,
    origin: ScreenPoint = { x: 0, y: 0 }
  ): IsoPoint {
    const grid = this.toGrid(point, origin);

    return {
      x: Math.floor(grid.x),
      y: Math.floor(grid.y)
    };
  }

  // Verificar se uma posição pertence ao mapa
  isInsideMap(
    point: IsoPoint,
    width: number,
    height: number
  ): boolean {
    return (
      Number.isInteger(point.x) &&
      Number.isInteger(point.y) &&
      point.x >= 0 &&
      point.y >= 0 &&
      point.x < width &&
      point.y < height
    );
  }

  // Calcular distância entre duas posições
  distance(a: IsoPoint, b: IsoPoint): number {
    return Math.hypot(
      b.x - a.x,
      b.y - a.y
    );
  }
}

