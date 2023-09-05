import { EventEmitter } from 'events'
import Experience from './Experience'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.world = this.experience.world

    this.world.on('worldready', () => {
      this.playIntro()
    })
  }

  playIntro() {
      
  }
}
