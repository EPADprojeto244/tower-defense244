export class IsometricEngine {
  static project(x: number, y: number) {
    return {
      x: x * 0.92 - y * 0.18,
      y: y * 0.82 + x * 0.12
    };
  }
}