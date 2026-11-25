export class InputManager {
  constructor(
    private canvas: HTMLCanvasElement,
    private onClick: (x: number, y: number) => void
  ) {
    canvas.addEventListener("click", (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) *
        canvas.width / rect.width;

      const y =
        (event.clientY - rect.top) *
        canvas.height / rect.height;

      this.onClick(x, y);
    });
  }
}