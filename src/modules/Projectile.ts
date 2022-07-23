import { IDrawable, TCoordinates } from '../declarations'

export class Projectile implements IDrawable {
  private readonly color: string
  private readonly velocity: TCoordinates
  public readonly radius: number = 3
  public readonly position: TCoordinates

  constructor (position: TCoordinates, velosity: TCoordinates, color: string) {
    this.position = position
    this.velocity = velosity
    this.color = color
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color

    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  public update (): void {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
