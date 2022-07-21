type TStar = {
  x: number
  y: number
  r: number
  s: number
}

export class Background {
  private readonly STARS_COUNT: number = 100
  private readonly SPEED_X: number = 0.5
  private readonly SPEED_Y: number = 2
  private readonly SPEED_MIN: number = 0.3
  private readonly COLOG_BG: string = 'black'
  private readonly COLOG_START: string = 'white'
  private stars: TStar[]

  constructor (canvas: HTMLCanvasElement) {
    this.stars = this.getStars(canvas)
  }

  private getStars(canvas: HTMLCanvasElement): TStar[] {
    const stars: TStar[] = []

    for (let i = 0; i < this.STARS_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.width,
        r: Math.random(),
        s: Math.random() + this.SPEED_MIN
      })
    }

    return stars
  }

  public draw (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = this.COLOG_BG

    ctx.fillRect(0, 0, canvas.width, canvas.height)

    this.stars.forEach((star) => {
      ctx.fillStyle = this.COLOG_START

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  public update (canvas: HTMLCanvasElement): void {
    this.stars.forEach((_, index) => {
      this.stars[index].x += this.stars[index].s * this.SPEED_X * this.stars[index].r
      this.stars[index].y += this.stars[index].s * this.SPEED_Y * this.stars[index].r

      if (this.stars[index].x > canvas.width) {
        this.stars[index].x = 0
      }

      if (this.stars[index].y > canvas.height) {
        this.stars[index].y = 0
      }
    })
  }
}
