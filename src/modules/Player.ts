export class Player {
  private readonly WIDTH: number = 150
  private readonly HEIGHT: number = 50
  private readonly SPEED: number = 8
  private readonly OFFSET_BOTTOM: number = 20
  private readonly COLOR_GUN: string = 'gray'
  private readonly COLOR_WING: string = 'lightgray'
  private x: number
  private direction: 'left' | 'right' | 'forward'

  constructor (canvas: HTMLCanvasElement) {
    this.x = canvas.width / 2
    this.direction = 'forward'
  }

  public moveLeft (): void {
    if (this.x - this.WIDTH / 2 > 0) {
      this.x -= this.SPEED
      this.direction = 'left'
    }
  }

  public moveRight (canvas: HTMLCanvasElement): void {
    if (this.x + this.WIDTH / 2 < canvas.width) {
      this.x += this.SPEED
      this.direction = 'right'
    }
  }

  public stop (): void {
    this.direction = 'forward'
  }

  public draw (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const wingXOffset = 100
    let leftWingXOffset = 0
    let rightWingXOffset = 0

    const wingYOffset = 5
    let leftWingYOffset = 0
    let rightWingYOffset = 0

    if (this.direction === 'left') {
      leftWingXOffset = wingXOffset
      leftWingYOffset = wingYOffset
    } else if (this.direction === 'right') {
      rightWingXOffset = wingXOffset
      rightWingYOffset = wingYOffset
    } else if (this.direction === 'forward') {
      leftWingXOffset = 0
      rightWingXOffset = 0

      leftWingYOffset = 0
      rightWingYOffset = 0
    }

    ctx.fillStyle = this.COLOR_WING

    // left wing
    ctx.beginPath()
    ctx.moveTo(this.x, canvas.height - this.OFFSET_BOTTOM - this.HEIGHT + leftWingYOffset)
    ctx.lineTo(this.x - this.WIDTH / 2 + leftWingXOffset, canvas.height - this.OFFSET_BOTTOM + leftWingYOffset)
    ctx.lineTo(this.x, canvas.height - this.HEIGHT + leftWingYOffset)
    ctx.closePath()
    ctx.fill()

    // right wing
    ctx.beginPath()
    ctx.moveTo(this.x, canvas.height - this.OFFSET_BOTTOM - this.HEIGHT + rightWingYOffset)
    ctx.lineTo(this.x + this.WIDTH / 2 - rightWingXOffset, canvas.height - this.OFFSET_BOTTOM + rightWingYOffset)
    ctx.lineTo(this.x, canvas.height - this.HEIGHT + rightWingYOffset)
    ctx.closePath()
    ctx.fill()

    // gun
    const gunWidth = 16
    const gunPeakOffset = 5
    const gunHeightOffset = 2

    ctx.fillStyle = this.COLOR_GUN

    ctx.beginPath()
    ctx.moveTo(this.x, canvas.height - this.OFFSET_BOTTOM - this.HEIGHT - gunPeakOffset)
    ctx.lineTo(this.x + gunWidth / 2, canvas.height - this.OFFSET_BOTTOM - this.HEIGHT + gunHeightOffset)
    ctx.lineTo(this.x, canvas.height - this.OFFSET_BOTTOM)
    ctx.lineTo(this.x - gunWidth / 2, canvas.height - this.OFFSET_BOTTOM - this.HEIGHT + gunHeightOffset)
    ctx.closePath()
    ctx.fill()
  }

  public update (): void {

  }
}
