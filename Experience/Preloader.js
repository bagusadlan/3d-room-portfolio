import { EventEmitter } from 'events'
import Experience from './Experience'
import GSAP from 'gsap'
import convert from './Utils/convertDivsToSpans'
import {
  convertNodeToSpans as convertNode,
  giveClassNameToSpans as addAnimation
} from './Utils/convertNodeToSpans'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.computerVideo = this.resources.items.screen.source.data
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

    this.pageWrapper = document.querySelector('.page-wrapper')
  }

  setAssets() {
    convertNode(document.querySelectorAll('.intro-appear-first'))
    addAnimation(document.querySelectorAll('.intro-hidden-first'))
    convert(document.querySelector('.hero-main-title'))
    convert(document.querySelector('.hero-main-description'))
    // convert(document.querySelector('.hero-desc-mobile'))
    // convert(document.querySelector('.hero-desc-desktop'))
    // convert(document.querySelector('.hero-second-subheading'))
    // convert(document.querySelector('.second-sub'))
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
      this.timeline.set('.intro-hidden-first .animate-second', {
        y: 0,
        yPercent: -100
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
          })
          .to(this.room.position, {
            z: -1,
            ease: 'power1.out',
            duration: 0.7
          })
      }
      this.timeline
        .to('.intro-appear-first .animatedis', {
          yPercent: 0,
          stagger: 0.04,
          ease: 'back.out(2.5)'
        })
        .to(
          '.toggle-bar',
          {
            opacity: 1,
            ease: 'back.out(2.5)'
          },
          'navigation'
        )
        .to(
          '.intro-click',
          {
            opacity: 1,
            onComplete: resolve
          },
          'navigation'
        )
    })
  }

  secondIntro() {
    // let introTextUnit = document.querySelectorAll('.intro-hidden-first')

    return new Promise((resolve) => {
      // let introAppearFirst = document.querySelectorAll('.intro-appear-first')

      // introAppearFirst.forEach((element) => {
      //   element.style.overflow = 'visible'
      // })

      this.secondTimeline = new GSAP.timeline()

      this.secondTimeline
        .to('.intro-click', {
          opacity: 0
        })
        .to('.intro-appear-firstTwo .animatedis', {
          x: 50.47,
          ease: 'power1.out'
        })
        .to(
          '.intro-hidden-first',
          {
            duration: 0,
            display: 'table-cell'
          },
          'text-shift'
        )
        .to(
          '.intro-appear-firstTwo',
          {
            x: -50.47,
            duration: 0
          },
          'text-shift'
        )
        .to(
          '.intro-text',
          {
            x: 7.5,
            duration: 0
          },
          'text-shift'
        )
      // .to('.intro-appear-firstTwo .animatedis', {
      //   x: 50.47,
      //   ease: 'power1.out',
      //   onComplete: () => {
      //     let localTimeline = new GSAP.timeline()

      //     introTextUnit.forEach((element) => {
      //       localTimeline.to(
      //         element,
      //         {
      //           duration: 0,
      //           display: 'table-cell'
      //         },
      //         'text-shift'
      //       )
      //     })

      //     localTimeline
      //       .to(
      //         '.intro-appear-firstTwo',
      //         {
      //           x: -50.47,
      //           duration: 0
      //         },
      //         'text-shift'
      //       )
      //       .to(
      //         '.intro-text',
      //         {
      //           x: 11.5,
      //           duration: 0
      //         },
      //         'text-shift'
      //       )
      //   }
      // })

      this.secondTimeline
        .to('.intro-hidden-first .animate-second', {
          delay: 0.3,
          yPercent: 0,
          stagger: 0.04,
          ease: 'back.out(2.5)'
        })
        .to('.intro-hidden-first .animate-second', {
          yPercent: 0,
          stagger: 0.04,
          ease: 'back.out(2.5)'
        })

      this.secondTimeline
        .to('.intro-text .animateall', {
          yPercent: 100,
          stagger: 0.04,
          ease: 'back.in(2)'
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10,
            y: 10,
            z: 10
          },
          'same'
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0
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
            ease: 'back.out(1.8)'
          },
          'intro-text'
        )
        .to(
          '.hero-main-description .animatedis',
          {
            yPercent: 0,
            stagger: 0.04,
            ease: 'back.out(1.8)'
          },
          'intro-text'
        )
        // .to(
        //   '.first-sub .animatedis',
        //   {
        //     yPercent: 0,
        //     stagger: 0.04,
        //     ease: 'back.out(1.8)'
        //   },
        //   'intro-text'
        // )
        // .to(
        //   '.hero-desc-mobile .animatedis',
        //   {
        //     yPercent: 0,
        //     stagger: 0.04,
        //     ease: 'back.out(1.8)'
        //   },
        //   'intro-text'
        // )
        // .to(
        //   '.hero-desc-desktop .animatedis',
        //   {
        //     yPercent: 0,
        //     stagger: 0.04,
        //     ease: 'back.out(1.8)'
        //   },
        //   'intro-text'
        // )
        .to(
          '.social-link',
          {
            stagger: 0.2,
            opacity: 1
          },
          'intro-text'
        )
        .to(
          this.roomChildren.desks.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          '<+=0.3'
        )
        .to(
          this.roomChildren.aquarium.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          '<+=0.3'
        )
        .to(
          this.roomChildren.fish.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          7
        )
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)'
          },
          7
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: 4 * Math.PI + Math.PI / 2
          },
          7
        )
        .to(
          this.roomChildren.floor_items.scale,
          {
            x: 1,
            y: 1,
            z: 1
          },
          7
        )
        .to(
          this.roomChildren.mini_floor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5
          },
          7
        )
        .to(
          this.roomChildren.clock.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          7.25
        )
        .to(
          this.roomChildren.table_stuff.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          7.25
        )
        .to(
          this.roomChildren.computer.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5
          },
          '>-0.3'
        )
        .to(
          this.roomChildren.shelves.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
            onStart: () => {
              if (this.themeString === 'dark') {
                this.roomClass.turnOnTheLight(this.themeString)
              }
            },
            onComplete: resolve
          },
          '<+=0.1'
        )
    })
  }

  removeEventListener() {
    this.pageWrapper.removeEventListener('click', this.userInteraction)
  }

  handleUserInteraction() {
    // Mulai video jika belum dimulai
    this.computerVideo.muted = false
    this.removeEventListener()
    this.playSecondIntro()
  }

  async playIntro() {
    this.scaleFlag = true
    let introTextUnit = document.querySelectorAll('.intro-hidden-first')

    for (let element of introTextUnit) {
      element.style.display = 'none'
    }
    await this.firstIntro()
    this.moveFlag = true
    this.userInteraction = this.handleUserInteraction.bind(this)

    this.pageWrapper.addEventListener('click', this.userInteraction)
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
