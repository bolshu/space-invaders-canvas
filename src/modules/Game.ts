import { Canvas } from './Canvas'
import { Player } from './Player'
import { Background } from './Background'

export class Game {
  private readonly COLOG_BG: string = 'black'
  private readonly canvasInstance: Canvas
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly player: Player
  private readonly background: Background

  constructor () {
    this.canvasInstance = new Canvas()
    this.canvas = this.canvasInstance.element
    this.ctx = this.canvasInstance.context
    this.player = new Player(this.canvas)
    this.background = new Background(this.canvas)

    this.init()
    this.tick = this.tick.bind(this)
  }

  private addKeyDownListener(): void {
    window.addEventListener('keydown', ({ code }: KeyboardEvent) => {
        switch (code) {
          case 'ArrowLeft':
            this.player.setControl('ArrowLeft', true)
            break
  
          case 'ArrowRight':
            this.player.setControl('ArrowRight', true)
            break
  
          case 'Space':
            this.player.setControl('Space', true)
            break
  
          default:
            break
        }
      })
  }

  private addKeyUpListener(): void {
    window.addEventListener('keyup', ({ code }: KeyboardEvent) => {
      switch (code) {
        case 'ArrowLeft':
          this.player.setControl('ArrowLeft', false)
          break

        case 'ArrowRight':
            this.player.setControl('ArrowRight', false)
          break

        case 'Space':
          this.player.setControl('Space', false)
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

  private drawBG(): void {
    this.ctx.fillStyle = this.COLOG_BG

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private draw (): void {
    this.drawBG()
    this.background.draw(this.ctx)
    this.player.draw(this.ctx)
  }
  private update (): void {
    this.player.update(this.canvas)
    this.background.update(this.canvas)
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
