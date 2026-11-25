import type { Point } from "../data/maps";

export class PathSystem {
  constructor(public path: Point[]) {}

  get length(): number {
    return this.path.reduce((total, point, index) => {
      if (index === 0) return total;

      const previous = this.path[index - 1];

      return total + Math.hypot(
        point.x - previous.x,
        point.y - previous.y
      );
    }, 0);
  }
}