import { IDrawable, TCoordinates } from './declaration'

type TInvaderShape = 'circle' | 'square' | 'cross' | 'plus'

class Invader {
  private readonly COLOR_CIRCLE: string = 'yellow'
  private readonly COLOR_SQUARE: string = 'aqua'
  private readonly COLOR_CROSS: string = 'lightgreen'
  private readonly COLOR_PLUS: string = 'tomato'
  private readonly shape: TInvaderShape
  private readonly size: number
  private readonly width: number
  public position: TCoordinates

  constructor (position: TCoordinates, size: number, shape: TInvaderShape) {
    this.shape = shape
    this.size = size
    this.width = this.size / 3
    this.position = position
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    switch (this.shape) {
      case 'circle':
        ctx.fillStyle = this.COLOR_CIRCLE
        ctx.beginPath()
        ctx.fillRect(this.position.x + this.width, this.position.y, this.width, this.width)
        ctx.fillRect(this.position.x, this.position.y + this.width, this.width, this.width)
        ctx.fillRect(this.position.x + this.width, this.position.y + this.width * 2, this.width, this.width)
        ctx.fillRect(this.position.x + this.width * 2, this.position.y + this.width, this.width, this.width)
        ctx.closePath()
        break

      case 'square':
        ctx.fillStyle = this.COLOR_SQUARE
        ctx.beginPath()
        ctx.fillRect(this.position.x, this.position.y, this.size, this.width)
        ctx.fillRect(this.position.x, this.position.y + this.size - this.width, this.size, this.width)
        ctx.fillRect(this.position.x, this.position.y, this.width, this.size)
        ctx.fillRect(this.position.x + this.size - this.width, this.position.y, this.width, this.size)
        ctx.closePath()
        break

      case 'cross':
        ctx.fillStyle = this.COLOR_CROSS
        ctx.beginPath()
        ctx.fillRect(this.position.x, this.position.y, this.width, this.width)
        ctx.fillRect(this.position.x + this.width * 2, this.position.y, this.width, this.width)
        ctx.fillRect(this.position.x + this.width, this.position.y + this.width, this.width, this.width)
        ctx.fillRect(this.position.x, this.position.y + this.width * 2, this.width, this.width)
        ctx.fillRect(this.position.x + this.width * 2, this.position.y + this.width * 2, this.width, this.width)
        ctx.closePath()
        break

      default:
        ctx.fillStyle = this.COLOR_PLUS
        ctx.beginPath()
        ctx.fillRect(this.position.x + this.size / 2 - this.width / 2, this.position.y, this.width, this.size)
        ctx.fillRect(this.position.x, this.position.y + this.size / 2 - this.width / 2, this.size, this.width)
        ctx.closePath()
        break
    }
  }
}

export class Invaders implements IDrawable {
  private readonly INVADER_SHAPES: TInvaderShape[] = ['circle', 'square', 'cross', 'plus']
  private readonly GAP: number = 10
  private readonly SIZE: number = 40
  private readonly ROWS_MULTIPLIER: number = 0.25
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
        const shape = this.INVADER_SHAPES[Math.floor(Math.random() * this.INVADER_SHAPES.length)]

        this.inviders.push(new Invader(position, this.SIZE, shape))
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

    if (this.position.x + this.SIZE * this.cols + this.GAP * this.cols > canvas.width || this.position.x < 0) {
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
