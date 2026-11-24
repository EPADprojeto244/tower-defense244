
import { MapDefinition, GridPoint } from "../data/maps";
import { IsometricEngine, ScreenPoint } from "../core/IsometricEngine";
import { PathPoint } from "../entities/Enemy";

export class PathSystem {
  static createScreenPath(
    map: MapDefinition,
    engine: IsometricEngine,
    origin: ScreenPoint
  ): PathPoint[] {
    return map.path.map((point: GridPoint) => {
      const center = engine.getTileCenter(
        point.x,
        point.y,
        origin
      );

      return {
        x: center.x,
        y: center.y
      };
    });
  }

  static getSpawnPoint(path: PathPoint[]): PathPoint {
    if (path.length === 0) {
      throw new Error("O caminho não possui pontos.");
    }

    return { ...path[0] };
  }

  static getEndPoint(path: PathPoint[]): PathPoint {
    if (path.length === 0) {
      throw new Error("O caminho não possui pontos.");
    }

    return { ...path[path.length - 1] };
  }

  static getPathLength(path: PathPoint[]): number {
    let length = 0;

    for (let i = 1; i < path.length; i++) {
      length += Math.hypot(
        path[i].x - path[i - 1].x,
        path[i].y - path[i - 1].y
      );
    }

    return length;
  }
}
