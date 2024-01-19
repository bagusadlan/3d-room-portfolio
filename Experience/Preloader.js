import { EventEmitter } from 'events'
import Experience from './Experience'
import GSAP from 'gsap'
import convert from './Utils/convertDivsToSpans'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.world = this.experience.world
    this.device = this.sizes.device
    this.theme = this.experience.theme
    this.resources.on('ready', () => {
      this.roomClass = this.world.room
    })
    this.sizes.on('switchdevice', (device) => {
      this.device = device
    })

    this.world.on('worldready', () => {
      this.setAssets()
      this.playIntro()
    })

    this.theme.on('switch', (theme) => {
      this.themeString = theme
    })
  }

  setAssets() {
    convert(document.querySelector('.intro-text'))
    convert(document.querySelector('.hero-main-title'))
    convert(document.querySelector('.hero-main-description'))
    convert(document.querySelector('.hero-second-subheading'))
    convert(document.querySelector('.second-sub'))
    this.room = this.experience.world.room.actualRoom
    this.roomChildren = this.experience.world.room.roomChildren
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline()
      this.timeline.set('.animatedis', {
        y: 0,
        yPercent: 100
      })
      this.timeline.to('.preloader', {
        opacity: 0,
        onComplete: () => {
          document.querySelector('.preloader').classList.add('hidden')
        }
      })

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
      this.timeline
        .to('.intro-text .animatedis', {
          yPercent: 0,
          stagger: 0.04,
          ease: 'back-out(2.5)'
        })
        .to(
          '.toggle-bar',
          {
            opacity: 1,
            ease: 'back-out(2.5)'
          },
          'navigation'
        )
        .to(
          '.intro-click',
          {
            opacity: 1,
            ease: 'back-out(2.5)',
            onComplete: resolve
          },
          'navigation'
        )
    })
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline()

      // if (this.device === 'desktop') {
      this.secondTimeline
        .to('.intro-click', {
          opacity: 0,
          ease: 'back-out(2.5)'
        })
        .to('.intro-text .animatedis', {
          yPercent: 100,
          stagger: 0.04,
          ease: 'back-out(1.7)'
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10,
            y: 10,
            z: 10,
            ease: 'back.out(2.5)'
          },
          'same'
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out'
          },
          'same'
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4
          },
          'same'
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 3.5
          },
          'same'
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0.638711,
            y: 8.5618,
            z: 1.3243
          },
          'same'
        )
        .to(this.roomChildren.body.scale, {
          x: 1,
          y: 1,
          z: 1
        })
        .to(this.roomChildren.cube.scale, {
          x: 0,
          y: 0,
          z: 0
        })
        .to(
          '.hero-main-title .animatedis',
          {
            yPercent: 0,
            stagger: 0.04,
            ease: 'back-out(2.5)'
          },
          'intro-text'
        )
        .to(
          '.hero-main-description .animatedis',
          {
            yPercent: 0,
            stagger: 0.04,
            ease: 'back-out(2.5)'
          },
          'intro-text'
        )
        .to(
          '.first-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.04,
            ease: 'back-out(2.5)'
          },
          'intro-text'
        )
        .to(
          '.second-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.04,
            ease: 'back-out(2.5)'
          },
          'intro-text'
        )
        .to(this.roomChildren.desks.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(this.roomChildren.aquarium.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(this.roomChildren.fish.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1
          },
          'chair'
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: 4 * Math.PI + Math.PI / 2
          },
          'chair'
        )
        .to(this.roomChildren.clock.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(this.roomChildren.table_stuff.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(this.roomChildren.computer.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(
          this.roomChildren.floor_items.scale,
          {
            x: 1,
            y: 1,
            z: 1
          },
          'chair'
        )
        .to(this.roomChildren.mini_floor.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5
        })
        .to(this.roomChildren.shelves.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.5,
          onStart: () => {
            if (this.themeString === 'dark') {
              this.roomClass.turnOnTheLight(this.themeString)
            }
          },
          onComplete: resolve
        })
        // .to(this.roomChildren.rectlight.scale, {
        //   x: 1,
        //   y: 1,
        //   z: 1,
        //   onComplete: () => {
        //     console.log(this.roomClass)
        //     console.log(this.roomClass.turnOnTheLight)
        //     if (this.themeString === 'dark') {
        //       console.log('puspita')
        //       this.roomClass.turnOnTheLight(this.themeString)
        //       // console.log(this.room.turnOnTheLight())
        //     }
        //     resolve()
        //   }
        // })
      // } else {
      //   this.secondTimeline
      //     .to(this.roomChildren.cube.scale, {
      //       x: 1.4,
      //       y: 1.4,
      //       z: 1.4,
      //       ease: 'back.out(2.5)'
      //       // duration: 3
      //     })
      //     .to(this.room.position, {
      //       x: 0,
      //       y: 0,
      //       z: 0,
      //       ease: 'power1.out',
      //       duration: 0.7,
      //       onComplete: resolve
      //     })
      // }
    })
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListener()
      this.playSecondIntro()
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY
    let differenceY = this.initialY - currentY
    if (differenceY > 0) {
      this.removeEventListener()
      this.playSecondIntro()
    }
    this.initialY = null
  }

  removeEventListener() {
    window.removeEventListener('wheel', this.scrollOnceEvent)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    this.scaleFlag = true
    await this.firstIntro()
    this.moveFlag = true
    this.scrollOnceEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)

    window.addEventListener('wheel', this.scrollOnceEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }

  async playSecondIntro() {
    this.moveFlag = false
    await this.secondIntro()
    this.scaleFlag = false
    this.emit('enablecontrols')
  }

  scale() {
    this.roomChildren.rectlight.width = 0
    this.roomChildren.rectlight.height = 0

    if (this.device === 'desktop') {
      this.room.scale.set(0.11, 0.11, 0.11)
    } else {
      this.room.scale.set(0.07, 0.07, 0.07)
    }
  }

  move() {
    if (this.device === 'desktop') {
      this.room.position.set(-1, 0, 0)
    } else {
      this.room.position.set(0, 0, -1)
    }
  }

  update() {
    if (this.moveFlag) {
      this.move()
    }

    if (this.scaleFlag) {
      this.scale()
    }
  }
}
