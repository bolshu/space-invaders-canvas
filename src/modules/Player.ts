import { IDrawable, TCoordinates } from '../declarations'

type TControlCode = 'ArrowLeft' | 'ArrowRight'

type TControls = Record<TControlCode, {
    passed: boolean
}>

export class Player implements IDrawable {
  private readonly HEIGHT: number = 40
  private readonly SPEED: number = 8
  private readonly OFFSET_BOTTOM: number = 20
  private readonly COLOR_BODY: string = 'gray'
  private readonly COLOR_WING: string = 'lightgray'
  public readonly width: number = 100
  private controls: TControls
  public readonly position: TCoordinates

  constructor (canvas: HTMLCanvasElement) {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height - this.OFFSET_BOTTOM - this.HEIGHT
    }
    this.controls = {
      ArrowLeft: {
        passed: false
      },
      ArrowRight: {
        passed: false
      }
    }
  }

  public setControl (direction: TControlCode, value: boolean): void {
    this.controls[direction].passed = value
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    const wingXOffset = (this.width / 3) * 2
    let leftWingXOffset = 0
    let rightWingXOffset = 0

    const wingYOffset = this.width / 10
    let leftWingYOffset = 0
    let rightWingYOffset = 0

    if (this.controls.ArrowLeft.passed) {
      leftWingXOffset = wingXOffset
      leftWingYOffset = wingYOffset
    } else if (this.controls.ArrowRight.passed) {
      rightWingXOffset = wingXOffset
      rightWingYOffset = wingYOffset
    } else {
      leftWingXOffset = 0
      rightWingXOffset = 0

      leftWingYOffset = 0
      rightWingYOffset = 0
    }

    ctx.fillStyle = this.COLOR_WING

    // left wing
    ctx.beginPath()
    ctx.moveTo(this.position.x + this.width / 2, this.position.y + leftWingYOffset)
    ctx.lineTo(this.position.x + leftWingXOffset, this.position.y + this.HEIGHT + leftWingYOffset)
    ctx.lineTo(this.position.x + this.width / 2, this.position.y + this.OFFSET_BOTTOM + leftWingYOffset)
    ctx.fill()
    ctx.closePath()

    // right wing
    ctx.beginPath()
    ctx.moveTo(this.position.x + this.width / 2, this.position.y + rightWingYOffset)
    ctx.lineTo(this.position.x + this.width - rightWingXOffset, this.position.y + this.HEIGHT + rightWingYOffset)
    ctx.lineTo(this.position.x + this.width / 2, this.position.y + this.OFFSET_BOTTOM + rightWingYOffset)
    ctx.fill()
    ctx.closePath()

    // body
    const bodyWidth = 16
    const bodyPeakOffset = 5
    const bodyHeightOffset = 2

    ctx.fillStyle = this.COLOR_BODY

    ctx.beginPath()
    ctx.moveTo(this.position.x + this.width / 2, this.position.y - bodyPeakOffset)
    ctx.lineTo(this.position.x + this.width / 2 + bodyWidth / 2, this.position.y + bodyHeightOffset)
    ctx.lineTo(this.position.x + this.width / 2, this.position.y + this.HEIGHT)
    ctx.lineTo(this.position.x + this.width / 2 - bodyWidth / 2, this.position.y + bodyHeightOffset)
    ctx.fill()
    ctx.closePath()
  }

  public update (canvas: HTMLCanvasElement): void {
    if (this.controls.ArrowLeft.passed) {
      if (this.position.x > 0) {
        this.position.x -= this.SPEED
      }
    } else if (this.controls.ArrowRight.passed) {
      if (this.position.x + this.width < canvas.width) {
        this.position.x += this.SPEED
      }
    }
  }
}
