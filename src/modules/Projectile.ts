import { IDrawable, TCoordinates } from './declaration'

export class Projectile implements IDrawable {
  private readonly RADIUS: number = 3
  private readonly COLOR: string = 'white'
  private readonly velocity: TCoordinates
  public readonly position: TCoordinates
  public readonly radius: number

  constructor (position: TCoordinates, velosity: TCoordinates, radius?: number) {
    this.position = position
    this.velocity = velosity
    this.radius = radius || this.RADIUS
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.COLOR

    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  public update (): void {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
