
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
  ) {}

  toScreen(point: IsoPoint): ScreenPoint {
    return {
      x: (point.x - point.y) * this.tileWidth / 2,
      y: (point.x + point.y) * this.tileHeight / 2
    };
  }

  toGrid(point: ScreenPoint): IsoPoint {
    return {
      x: point.x / this.tileWidth + point.y / this.tileHeight,
      y: point.y / this.tileHeight - point.x / this.tileWidth
    };
  }
}
