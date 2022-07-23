import { Canvas } from './Canvas'
import { Player } from './Player'
import { Background } from './Background'
import { Projectile } from './Projectile'
import { Invaders, Invader } from './Invaders'
import { Partical } from './Partical'
import { Stats } from './Stats'

export class Game {
  private readonly SCORE_POINT_INVADER: number = 5
  private readonly SCORE_POINT_INVADER_GROUP: number = 100
  private readonly COLOG_PLAYER_PROJECTILE: string = 'white'
  private readonly COLOG_BG: string = 'black'
  private readonly INVADERS_SHOOT_SPEED: number = 75
  private readonly PROJECTILE_Y_VELOCITY: number = 7
  private readonly canvasInstance: Canvas
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly player: Player
  private readonly background: Background
  private readonly invaders: Invaders
  private readonly stats: Stats
  private frames: number
  private projectiles: Projectile[] = []
  private invaderProjectile: Projectile[] = []
  private particals: Partical[] = []

  constructor () {
    this.canvasInstance = new Canvas()
    this.canvas = this.canvasInstance.element
    this.ctx = this.canvasInstance.context
    this.player = new Player(this.canvas)
    this.background = new Background(this.canvas)
    this.invaders = new Invaders(this.canvas)
    this.stats = new Stats()
    this.frames = 0

    this.init()
    this.tick = this.tick.bind(this)
  }

  private addPlayerProjectile (): void {
    this.projectiles.push(new Projectile({
      x: this.player.position.x + this.player.width / 2,
      y: this.player.position.y
    }, {
      x: 0,
      y: -this.PROJECTILE_Y_VELOCITY
    }, this.COLOG_PLAYER_PROJECTILE))
  }

  private addInvaderProjectile (invader: Invader): void {
    this.invaderProjectile.push(new Projectile({
      x: invader.position.x + invader.size / 2,
      y: invader.position.y + invader.size / 2
    }, {
      x: 0,
      y: this.PROJECTILE_Y_VELOCITY
    }, invader.color))
  }

  private addPartical (invader: Invader): void {
    for (let i = 0; i < 15; i++) {
      this.particals.push(new Partical(
        { x: invader.position.x, y: invader.position.y },
        { x: Math.random() - 0.5, y: Math.random() - 0.5 },
        invader.color
      ))
    }
  }

  private removeProjectile (index: number): void {
    setTimeout(() => {
      this.projectiles.splice(index, 1)
    })
  }

  private removeInvaderProjectile (index: number): void {
    setTimeout(() => {
      this.invaderProjectile.splice(index, 1)
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

  private drawInvadersProjectiles (): void {
    this.invaderProjectile.forEach((projectile) => {
      projectile.draw(this.ctx)
    })
  }

  private drawParticals (): void {
    this.particals.forEach((partical) => {
      partical.draw(this.ctx)
    })
  }

  private draw (): void {
    this.drawBG()
    this.background.draw(this.ctx)
    this.player.draw(this.ctx)
    this.invaders.draw(this.ctx)
    this.drawProjectiles()
    this.drawInvadersProjectiles()
    this.drawParticals()
    this.stats.draw(this.ctx)
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

  private updateInvadersProjectiles (): void {
    this.invaderProjectile.forEach((projectile, index) => {
      projectile.update()

      if (
        projectile.position.x < 0 || projectile.position.x > this.canvas.width ||
        projectile.position.y < 0 || projectile.position.y > this.canvas.height
      ) {
        this.removeInvaderProjectile(index)
      }
    })
  }

  private updateParticals (): void {
    this.particals.forEach((partical, index) => {
      if (partical.opacity <= 0) {
        setTimeout(() => {
          this.particals.splice(index, 1)
        })
      } else {
        partical.update()
      }
    })
  }

  private updateFrames (): void {
    this.frames += 1
  }

  private update (): void {
    this.updateFrames()

    this.player.update(this.canvas)
    this.background.update(this.canvas)
    this.invaders.update(this.canvas)
    this.updateProjectiles()
    this.updateInvadersProjectiles()
    this.updateParticals()

    if (this.frames % this.INVADERS_SHOOT_SPEED === 0 && this.invaders.inviders.length) {
      this.addInvaderProjectile(
        this.invaders.inviders[Math.floor(Math.random() * this.invaders.inviders.length)]
      )
    }

    this.invaderProjectile.forEach((projectile) => {
      if (
        (projectile.position.x > this.player.position.x && projectile.position.x < this.player.position.x + this.player.width) &&
        (projectile.position.y > this.player.position.y)
      ) {
        this.stop()
      }
    })

    this.invaders.inviders.forEach((invader, invaderIndex) => {
      this.projectiles.forEach((projectile, projectileIndex) => {
        if (
          (projectile.position.x > invader.position.x && projectile.position.x < invader.position.x + invader.size) &&
          (projectile.position.y > invader.position.y && projectile.position.y < invader.position.y + invader.size)
        ) {
          setTimeout(() => {
            this.addPartical(invader)

            this.projectiles.splice(projectileIndex, 1)
            this.invaders.inviders.splice(invaderIndex, 1)

            if (this.invaders.inviders.length > 0) {
              this.invaders.updateWidth()
              this.invaders.updatePositionX()
            }

            this.stats.updateScore(this.SCORE_POINT_INVADER)
          })
        }
      })

      if (invader.position.y + invader.size > this.canvas.height) {
        this.stop()
      }
    })

    if (!this.invaders.inviders.length) {
      this.invaders.createGroup()
      this.stats.updateScore(this.SCORE_POINT_INVADER_GROUP)
    }
  }

  public start (): void {
    this.canvasInstance.startAnimation(this.tick)
  }

  public stop (): void {
    this.canvasInstance.stopAnimation()
  }

  private tick (): void {
    this.canvasInstance.clear()
    this.draw()
    this.update()
  }
}
