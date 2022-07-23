export type TCoordinates = {
  x: number
  y: number
}

export interface IDrawable {
    update: (canvas: HTMLCanvasElement) => void
    draw: (context: CanvasRenderingContext2D) => void
}
