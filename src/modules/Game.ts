import { Canvas } from './Canvas'
import { Player } from './Player'
import { Background } from './Background'

type TControlCode = 'ArrowLeft' | 'ArrowRight' | 'Space'

type TControls = Record<TControlCode, {
    passed: boolean
}>

export class Game {
  private readonly canvasInstance: Canvas
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly player: Player
  private readonly background: Background
  private readonly controls: TControls

  constructor () {
    this.canvasInstance = new Canvas()
    this.canvas = this.canvasInstance.element
    this.ctx = this.canvasInstance.context
    this.player = new Player(this.canvas)
    this.background = new Background(this.canvas)
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

    this.init()
    this.tick = this.tick.bind(this)
  }

  private addKeyDownListener(): void {
    window.addEventListener('keydown', ({ code }: KeyboardEvent) => {
        switch (code) {
          case 'ArrowLeft':
            this.controls.ArrowLeft.passed = true
            break
  
          case 'ArrowRight':
            this.controls.ArrowRight.passed = true
            break
  
          case 'Space':
            this.controls.Space.passed = true
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
          this.controls.ArrowLeft.passed = false
          break

        case 'ArrowRight':
          this.controls.ArrowRight.passed = false
          break

        case 'Space':
          this.controls.Space.passed = false
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

  private draw (): void {
    this.background.draw(this.ctx, this.canvas)
    this.player.draw(this.ctx, this.canvas)
  }

  private updateControls (): void {
    if (this.controls.ArrowLeft.passed) {
      this.player.moveLeft()
    } else if (this.controls.ArrowRight.passed) {
      this.player.moveRight(this.canvas)
    } else if (this.controls.Space.passed) {
      console.log('space passed')
    }

    if (!this.controls.ArrowLeft.passed && !this.controls.ArrowRight.passed) {
      this.player.stop()
    }
  }

  private update (): void {
    this.updateControls()
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
