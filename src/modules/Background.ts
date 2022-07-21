import { IDrawable, TCoordinates } from './declaration'

type TStar = {
  position: TCoordinates
  radius: number
  speed: number
}

export class Background implements IDrawable {
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

  private getStars (canvas: HTMLCanvasElement): TStar[] {
    const stars: TStar[] = []

    for (let i = 0; i < this.STARS_COUNT; i++) {
      stars.push({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.width
        },
        radius: Math.random(),
        speed: Math.random() + this.SPEED_MIN
      })
    }

    return stars
  }

  public draw (ctx: CanvasRenderingContext2D): void {
    this.stars.forEach((star) => {
      ctx.fillStyle = this.COLOG_START

      ctx.beginPath()
      ctx.arc(star.position.x, star.position.y, star.radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  public update (canvas: HTMLCanvasElement): void {
    this.stars.forEach((_, index) => {
      this.stars[index].position.x += this.stars[index].speed * this.SPEED_X * this.stars[index].radius
      this.stars[index].position.y += this.stars[index].speed * this.SPEED_Y * this.stars[index].radius

      if (this.stars[index].position.x > canvas.width) {
        this.stars[index].position.x = 0
      }

      if (this.stars[index].position.y > canvas.height) {
        this.stars[index].position.y = 0
      }
    })
  }
}
