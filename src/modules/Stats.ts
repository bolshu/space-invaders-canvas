export class Stats {
  private readonly OFFSET: number = 20
  private readonly COLOG_TEXT: string = 'white'
  private score: number

  constructor () {
    this.score = 0
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.COLOG_TEXT
    ctx.font = '20px monospace'
    ctx.beginPath()
    ctx.fillText(`Score: ${this.score}`, this.OFFSET, this.OFFSET)
    ctx.fill()
  }

  public updateScore (increment: number) {
    this.score += increment
  }
}
