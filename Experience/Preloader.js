import { EventEmitter } from 'events'
import Experience from './Experience'
import GSAP from 'gsap'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.world = this.experience.world
    this.device = this.sizes.device

    this.sizes.on('switchdevice', (device) => {
      this.device = device
    })

    this.world.on('worldready', () => {
      this.setAssets()
      this.playIntro()
    })
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom
    this.roomChildren = this.experience.world.room.roomChildren
  }

  playIntro() {
    this.firstIntro()
  }

  firstIntro() {
    this.timeline = new GSAP.timeline()

    if (this.device === 'desktop') {
      this.timeline
        .to(this.roomChildren.cube.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          ease: 'back.out(2.5)'
          // duration: 3
        })
        .to(this.room.position, {
          x: -1,
          ease: 'power1.out',
          duration: 0.7
        })
    } else {
      this.timeline
        .to(this.roomChildren.cube.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          ease: 'back.out(2.5)'
          // duration: 3
        })
        .to(this.room.position, {
          z: -1,
          ease: 'power1.out',
          duration: 0.7
        })
    }
  }
}
