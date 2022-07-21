type TControlCode = 'ArrowLeft' | 'ArrowRight' | 'Space'

type TControls = Record<TControlCode, {
    passed: boolean
}>

export class Player {
  private readonly WIDTH: number = 150
  private readonly HEIGHT: number = 50
  private readonly SPEED: number = 8
  private readonly OFFSET_BOTTOM: number = 20
  private readonly COLOR_GUN: string = 'gray'
  private readonly COLOR_WING: string = 'lightgray'
  private x: number
  private y: number
  private controls: TControls
  

  constructor (canvas: HTMLCanvasElement) {
    this.x = canvas.width / 2
    this.y = canvas.height - this.OFFSET_BOTTOM - this.HEIGHT
    this.controls = {
      ArrowLeft: {
        passed: false
      },
      ArrowRight: {
        passed: false
      },
      Space: {
        passed: false
      }
    }
  }

  public setControl(direction: TControlCode, value: boolean): void {
    this.controls[direction].passed = value
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    const wingXOffset = 100
    let leftWingXOffset = 0
    let rightWingXOffset = 0

    const wingYOffset = 15
    let leftWingYOffset = 0
    let rightWingYOffset = 0

    if (this.controls.ArrowLeft.passed) {
      leftWingXOffset = wingXOffset
      leftWingYOffset = wingYOffset
    } else if (this.controls.ArrowRight.passed) {
      rightWingXOffset = wingXOffset
      rightWingYOffset = wingYOffset
    } else if (this.controls.Space.passed) {
      leftWingXOffset = 0
      rightWingXOffset = 0

      leftWingYOffset = 0
      rightWingYOffset = 0
    }

    ctx.fillStyle = this.COLOR_WING

    // left wing
    ctx.beginPath()
    ctx.moveTo(this.x, this.y + leftWingYOffset)
    ctx.lineTo(this.x - this.WIDTH / 2 + leftWingXOffset, this.y + this.HEIGHT + leftWingYOffset)
    ctx.lineTo(this.x, this.y + this.OFFSET_BOTTOM + leftWingYOffset)
    ctx.closePath()
    ctx.fill()

    // right wing
    ctx.beginPath()
    ctx.moveTo(this.x, this.y + rightWingYOffset)
    ctx.lineTo(this.x + this.WIDTH / 2 - rightWingXOffset, this.y + this.HEIGHT + rightWingYOffset)
    ctx.lineTo(this.x, this.y + this.OFFSET_BOTTOM + rightWingYOffset)
    ctx.closePath()
    ctx.fill()

    // gun
    const gunWidth = 16
    const gunPeakOffset = 5
    const gunHeightOffset = 2

    ctx.fillStyle = this.COLOR_GUN

    ctx.beginPath()
    ctx.moveTo(this.x, this.y - gunPeakOffset)
    ctx.lineTo(this.x + gunWidth / 2, this.y + gunHeightOffset)
    ctx.lineTo(this.x, this.y + this.HEIGHT)
    ctx.lineTo(this.x - gunWidth / 2, this.y + gunHeightOffset)
    ctx.closePath()
    ctx.fill()
  }

  public update (canvas: HTMLCanvasElement): void {
    if (this.controls.ArrowLeft.passed) {
      if (this.x - this.WIDTH / 2 > 0) {
        this.x -= this.SPEED
      }
    } else if (this.controls.ArrowRight.passed) {
      if (this.x + this.WIDTH / 2 < canvas.width) {
        this.x += this.SPEED
      }
    } else if (this.controls.Space.passed) {
      console.log('space passed')
    }
  }
}
