import { IDrawable, TCoordinates } from './declaration'

class Invader {
  private readonly size: number
  public position: TCoordinates

  constructor (position: TCoordinates, size: number) {
    this.position = position
    this.size = size
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.rect(this.position.x, this.position.y, this.size, this.size)
    ctx.stroke()
    ctx.closePath()
  }
}

export class Invaders implements IDrawable {
  private readonly GAP: number = 5
  private readonly SIZE: number = 40
  private readonly ROWS_MULTIPLIER: number = 0.2
  private readonly COLS_MULTIPLIER: number = 0.7
  private readonly VELOCITY_X: number = 0.5
  private readonly VELOCITY_Y: number = this.SIZE / 2
  private position: TCoordinates
  private velocity: TCoordinates
  private cols: number
  private rows: number
  private inviders: Invader[] = []

  constructor (canvas: HTMLCanvasElement) {
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: this.VELOCITY_X,
      y: this.VELOCITY_Y
    }
    this.cols = Math.floor(canvas.width * this.COLS_MULTIPLIER / this.SIZE)
    this.rows = Math.floor(canvas.width * this.ROWS_MULTIPLIER / this.SIZE)

    this.createGroup()
  }

  public createGroup (): void {
    for (let indexCol = 0; indexCol < this.cols; indexCol++) {
      for (let indexRow = 0; indexRow < this.rows; indexRow++) {
        const position: TCoordinates = {
          x: this.position.x + indexCol * this.SIZE + this.GAP * indexCol,
          y: this.position.y + indexRow * this.SIZE + this.GAP * indexRow
        }
        this.inviders.push(new Invader(position, this.SIZE))
      }
    }
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    this.inviders.forEach((invader) => {
      invader.draw(ctx)
    })
  }

  public update (canvas: HTMLCanvasElement): void {
    this.velocity.y = 0

    if (this.position.x + this.SIZE * this.cols + this.GAP * this.cols >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = this.VELOCITY_Y
    }

    this.inviders.forEach((invader) => {
      invader.position.x += this.velocity.x
      invader.position.y += this.velocity.y
    })

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
