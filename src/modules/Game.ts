import { Canvas } from './Canvas'
import { Player } from './Player'
import { Background } from './Background'
import { Projectile } from './Projectile'

export class Game {
  private readonly COLOG_BG: string = 'black'
  private readonly canvasInstance: Canvas
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly player: Player
  private readonly background: Background
  private projectiles: Projectile[]

  constructor () {
    this.canvasInstance = new Canvas()
    this.canvas = this.canvasInstance.element
    this.ctx = this.canvasInstance.context
    this.player = new Player(this.canvas)
    this.background = new Background(this.canvas)
    this.projectiles = []

    this.init()
    this.tick = this.tick.bind(this)
  }

  private addPlayerProjectile (): void {
    this.projectiles.push(new Projectile({
      x: this.player.position.x,
      y: this.player.position.y
    }, {
      x: 0,
      y: -7
    }))
  }

  private removeProjectile (index: number): void {
    setTimeout(() => {
      this.projectiles.splice(index, 1)
    })
  }

  private addKeyDownListener (): void {
    window.addEventListener('keydown', ({ code }: KeyboardEvent) => {
      switch (code) {
        case 'ArrowLeft':
          this.player.setControl('ArrowLeft', true)
          break

        case 'ArrowRight':
          this.player.setControl('ArrowRight', true)
          break

        case 'Space':
          this.addPlayerProjectile()
          break

        default:
          break
      }
    })
  }

  private addKeyUpListener (): void {
    window.addEventListener('keyup', ({ code }: KeyboardEvent) => {
      switch (code) {
        case 'ArrowLeft':
          this.player.setControl('ArrowLeft', false)
          break

        case 'ArrowRight':
          this.player.setControl('ArrowRight', false)
          break

        default:
          break
      }
    })
  }

  private init () : void {
    this.addKeyDownListener()
    this.addKeyUpListener()
  }

  private drawBG (): void {
    this.ctx.fillStyle = this.COLOG_BG

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawProjectiles (): void {
    this.projectiles.forEach((projectile) => {
      projectile.draw(this.ctx)
    })
  }

  private draw (): void {
    this.drawBG()
    this.background.draw(this.ctx)
    this.player.draw(this.ctx)
    this.drawProjectiles()
  }

  private updateProjectiles (): void {
    this.projectiles.forEach((projectile, index) => {
      projectile.update()

      if (
        projectile.position.x < 0 || projectile.position.x > this.canvas.width ||
        projectile.position.y < 0 || projectile.position.y > this.canvas.height
      ) {
        this.removeProjectile(index)
      }
    })
  }

  private update (): void {
    this.player.update(this.canvas)
    this.background.update(this.canvas)
    this.updateProjectiles()
  }

  public start (): void {
    this.canvasInstance.startAnimation(this.tick)
  }

  private tick (): void {
    this.canvasInstance.clear()
    this.draw()
    this.update()
  }
}
