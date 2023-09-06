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

  async playIntro() {
    await this.firstIntro()
    this.scrollOnceEvent = this.onScroll.bind(this)
    window.addEventListener('wheel', this.scrollOnceEvent)
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.playSecondIntro()
      window.removeEventListener('wheel', this.scrollOnceEvent)
    }
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()

      if (this.device === 'desktop') {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7
          })
          .to(this.room.position, {
            x: -1,
            ease: 'power1.out',
            duration: 0.7,
            onComplete: resolve
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
    })
  }

  playSecondIntro() {
    this.secondIntro()
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline()

      if (this.device === 'desktop') {
        this.secondTimeline
          .to(this.roomChildren.cube.scale, {
            x: 10,
            y: 10,
            z: 10,
            ease: 'back.out(2.5)'
          }, 'same')
          .to(this.room.position, {
            x: 0,
            x: 0,
            x: 0,
            ease: 'power1.out',
          }, 'same')
          .to(this.roomChildren.cube.rotation, {
            y: 2 * Math.PI + Math.PI / 4
          }, 'same')
          .to(this.camera.orthographicCamera.position, {
            y: 3.5
          }, 'same')
          .to(this.roomChildren.cube.position, {
            x: 0.638711,
            y: 8.5618,
            z: 1.3243
          }, 'same')
          .to(this.roomChildren.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.roomChildren.body.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.desks.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.aquarium.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.fish.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.chair.scale, {
            x: 1,
            y: 1,
            z: 1,
          }, 'chair')
          .to(this.roomChildren.chair.rotation, {
            y: 2 * Math.PI + Math.PI / 2,
          }, 'chair')
          .to(this.roomChildren.clock.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.table_stuff.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.computer.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
          .to(this.roomChildren.floor_items.scale, {
            x: 1,
            y: 1,
            z: 1,
          }, 'chair')
          .to(this.roomChildren.mini_floor.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
         .to(this.roomChildren.rectlight.scale, {
          x: 1,
          y: 1,
          z: 1,
         })
        .to(this.roomChildren.shelves.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
      } else {
        this.secondTimeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)'
            // duration: 3
          })
          .to(this.room.position, {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out',
            duration: 0.7
          })
      }
    })
  }
}
