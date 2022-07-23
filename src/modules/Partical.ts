import { IDrawable, TCoordinates } from '../daclarations'

export class Partical implements IDrawable {
  private readonly OPACITY_DECREMENT: number = 0.007
  private readonly RADIUS_MULTIPLIER: number = 2
  private readonly VELOCITY_MULTIPLIER: number = 3
  private readonly color: string
  private readonly velocity: TCoordinates
  private readonly radius: number
  private readonly position: TCoordinates
  public opacity: number

  constructor (position: TCoordinates, velocity: TCoordinates, color: string) {
    this.position = { x: position.x, y: position.y }
    this.velocity = {
      x: velocity.x * this.VELOCITY_MULTIPLIER,
      y: velocity.y * this.VELOCITY_MULTIPLIER
    }
    this.color = color
    this.radius = Math.random() * this.RADIUS_MULTIPLIER
    this.opacity = 1
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  public update (): void {
    this.opacity -= this.OPACITY_DECREMENT
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
