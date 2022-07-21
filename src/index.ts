import { BaseStyles } from './modules/BaseStyles'
import { Game } from './modules/Game'

BaseStyles.apply()

const game = new Game()

game.start()
