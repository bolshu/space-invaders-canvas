import { IDrawable, TCoordinates } from '../declarations'

type TInvaderShape = 'circle' | 'square' | 'cross' | 'plus'

export class Invader {
  private readonly COLOR_CIRCLE: string = 'yellow'
  private readonly COLOR_SQUARE: string = 'aqua'
  private readonly COLOR_CROSS: string = 'lightgreen'
  private readonly COLOR_PLUS: string = 'tomato'
  private readonly shape: TInvaderShape
  private readonly gridUnit: number
  public readonly size: number
  public readonly position: TCoordinates
  public color: string = ''

  constructor (position: TCoordinates, size: number, shape: TInvaderShape) {
    this.shape = shape
    this.size = size
    this.gridUnit = this.size / 3
    this.position = position
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    switch (this.shape) {
      case 'circle':
        this.color = this.COLOR_CIRCLE
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.position.x + this.gridUnit, this.position.y, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x, this.position.y + this.gridUnit, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x + this.gridUnit, this.position.y + this.gridUnit * 2, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x + this.gridUnit * 2, this.position.y + this.gridUnit, this.gridUnit, this.gridUnit)
        ctx.closePath()
        break

      case 'square':
        this.color = this.COLOR_SQUARE
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.position.x, this.position.y, this.size, this.gridUnit)
        ctx.fillRect(this.position.x, this.position.y + this.size - this.gridUnit, this.size, this.gridUnit)
        ctx.fillRect(this.position.x, this.position.y, this.gridUnit, this.size)
        ctx.fillRect(this.position.x + this.size - this.gridUnit, this.position.y, this.gridUnit, this.size)
        ctx.closePath()
        break

      case 'cross':
        this.color = this.COLOR_CROSS
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.position.x, this.position.y, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x + this.gridUnit * 2, this.position.y, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x + this.gridUnit, this.position.y + this.gridUnit, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x, this.position.y + this.gridUnit * 2, this.gridUnit, this.gridUnit)
        ctx.fillRect(this.position.x + this.gridUnit * 2, this.position.y + this.gridUnit * 2, this.gridUnit, this.gridUnit)
        ctx.closePath()
        break

      default:
        this.color = this.COLOR_PLUS
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.fillRect(this.position.x + this.size / 2 - this.gridUnit / 2, this.position.y, this.gridUnit, this.size)
        ctx.fillRect(this.position.x, this.position.y + this.size / 2 - this.gridUnit / 2, this.size, this.gridUnit)
        ctx.closePath()
        break
    }
  }
}

export class Invaders implements IDrawable {
  private readonly INVADER_SHAPES: TInvaderShape[] = ['circle', 'square', 'cross', 'plus']
  private readonly GAP: number = 10
  private readonly INVADER_SIZE: number = 20
  private readonly ROWS_MULTIPLIER: number = 0.2
  private readonly COLS_MULTIPLIER: number = 0.5
  private readonly VELOCITY_X: number = 1.5
  private readonly VELOCITY_Y: number = this.INVADER_SIZE / 2
  private readonly cols: number
  private readonly rows: number
  private position: TCoordinates
  private velocity: TCoordinates
  public inviders: Invader[] = []
  public width: number

  constructor (canvas: HTMLCanvasElement) {
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: this.VELOCITY_X,
      y: this.VELOCITY_Y
    }
    this.cols = Math.floor(canvas.width * this.COLS_MULTIPLIER / this.INVADER_SIZE)
    this.rows = Math.floor(canvas.height * this.ROWS_MULTIPLIER / this.INVADER_SIZE)

    this.createGroup()

    this.width = this.getInvadersWidth()
  }

  private resetPosition (): void {
    this.position.x = 0
    this.position.y = 0
  }

  private getInvadersWidth (): number {
    return this.inviders[this.inviders.length - 1].position.x - this.inviders[0].position.x + this.INVADER_SIZE
  }

  public updateWidth (): void {
    this.width = this.getInvadersWidth()
  }

  public updatePositionX (): void {
    this.position.x = this.inviders[0].position.x
  }

  public createGroup (): void {
    this.resetPosition()

    for (let indexCol = 0; indexCol < this.cols; indexCol++) {
      for (let indexRow = 0; indexRow < this.rows; indexRow++) {
        const position: TCoordinates = {
          x: this.position.x + indexCol * this.INVADER_SIZE + this.GAP * indexCol,
          y: this.position.y + indexRow * this.INVADER_SIZE + this.GAP * indexRow
        }
        const shape = this.INVADER_SHAPES[Math.floor(Math.random() * this.INVADER_SHAPES.length)]

        this.inviders.push(new Invader(position, this.INVADER_SIZE, shape))
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

    if (this.position.x + this.width > canvas.width || this.position.x < 0) {
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
