import * as THREE from 'three'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import ASScroll from '@ashthornton/asscroll'

import Experience from './Experience'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.computerVideo = this.resources.items.screen.source.data
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.room = this.experience.world.room.actualRoom
    this.floor = this.experience.circleFirst
    this.room.children.forEach((child) => {
      if (child.type === 'RectAreaLight') {
        this.rectLight = child
      }
    })
    this.circleFirst = this.experience.world.floor.circleFirst
    this.circleSecond = this.experience.world.floor.circleSecond
    this.circleThird = this.experience.world.floor.circleThird

    GSAP.registerPlugin(ScrollTrigger)

    document.querySelector('.page').style.overflow = 'visible'

    this.setEventListener()
    this.setSmoothScroll()
    this.setScrollTrigger()
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.1,
      disableRaf: true
    })

    GSAP.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value
          return
        }
        return asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      fixedMarkers: true
    })

    asscroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener('refresh', asscroll.resize)

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        )
      })
    })
    return asscroll
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  /**
   * Set up smooth scroll using other library
   */
  // setSmoothScroll() {
  //   const lenis = new Lenis()

  //   function raf(time) {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }

  //   requestAnimationFrame(raf)
  // }

  setEventListener() {
    this.userInteraction = this.handleUserInteraction.bind(this)
    window.addEventListener('click', this.userInteraction)
    // window.addEventListener('touchstart', this.userInteraction);
  }

  handleUserInteraction() {
    // Mulai video jika belum dimulai
    // if (this.computerVideo.paused) {
    this.computerVideo.muted = false

    // Hapus event listener setelah interaksi pertama
    window.removeEventListener('click', this.userInteraction)
    // window.removeEventListener('touchstart', this.userInteraction);
    // }
    console.log(this.computerVideo.muted)
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Dekstop
      '(min-width: 969px)': () => {
        this.room.scale.set(0.11, 0.11, 0.11)
        this.rectLight.width = 0.4
        this.rectLight.height = 0.7
        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }).to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0016
          }
        })

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top 300',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
          .to(
            this.room.position,
            {
              x: () => {
                return 1
              },
              z: () => {
                return this.sizes.height * 0.0042
              }
            },
            'same'
          )
          .to(
            this.room.scale,
            {
              x: 0.355,
              y: 0.355,
              z: 0.355
            },
            'same'
          )
          .to(
            this.rectLight,
            {
              width: 0.4 * 4,
              height: 0.7 * 4
            },
            'same'
          )

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }).to(this.camera.orthographicCamera.position, {
          y: -1,
          x: -4
        })
      },
      // Mobile
      '(max-width: 960px)': () => {
        this.room.scale.set(0.07, 0.07, 0.07)
        this.room.position.set(0, 0, 0)
        this.rectLight.width = 0.3
        this.rectLight.height = 0.4

        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        })
          .to(
            this.room.scale,
            {
              x: 0.1,
              y: 0.1,
              z: 0.1
            },
            'same'
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 1.35,
              height: 0.4 * 1.35
            },
            'same'
          )

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25
            },
            'same'
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3,
              height: 0.4 * 3
            },
            'same'
          )
          .to(
            this.room.position,
            {
              x: 1.8
            },
            'same'
          )

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }).to(this.room.position, {
          z: -4.5
        })
      },
      // all
      all: () => {
        this.sections = document.querySelectorAll('.section')
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector('.progress-wrapper')
          this.progressBar = section.querySelector('.progress-bar')

          if (section.classList.contains('left')) {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            })
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            })
          } else {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6
              }
            })
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            })
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false
            }
          })
        })

        // All animations ---------------------------------
        // Play Video ---------------------------------
        this.playVideoTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.play-video',
            start: '200 top',
            end: 'bottom+=600px top',
            invalidateOnRefresh: true,
            onToggle: (self) => {
              if (self.isActive) {
                this.computerVideo.play()
              } else {
                this.computerVideo.pause()
              }
            }
          }
        })

        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }).to(this.circleFirst.scale, {
          x: 3,
          y: 3,
          z: 3
        })

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        })
          .to(
            this.circleSecond.scale,
            {
              x: 3,
              y: 3,
              z: 3
            },
            'same'
          )
          .to(
            this.room.position,
            {
              y: 0.7
            },
            'same'
          )

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }).to(this.circleThird.scale, {
          x: 3,
          y: 3,
          z: 3
        })

        // Mini Platform Animation ---------------------------------
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'center center'
          }
        })

        this.room.children.forEach((child) => {
          if (child.name === 'Mini_Floor') {
            this.miniFloorAnimation = new GSAP.to(child.position, {
              x: -6.46751,
              z: 11.8908,
              duration: 0.4
            })
          }

          if (child.name === 'Mailbox') {
            this.mailboxAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(1.7)',
              duration: 0.4
            })
          }

          if (child.name === 'Lamp') {
            this.lampAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(1.7)',
              duration: 0.4
            })
          }

          if (child.name === 'Flower1') {
            this.flowerOneAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(1.7)',
              duration: 0.4
            })
          }

          if (child.name === 'Flower2') {
            this.flowerTwoAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: 'back.out(1.7)',
              duration: 0.4
            })
          }
        })

        this.secondPartTimeline.add(this.miniFloorAnimation)
        this.secondPartTimeline.add(this.mailboxAnimation)
        this.secondPartTimeline.add(this.lampAnimation)
        this.secondPartTimeline.add(this.flowerOneAnimation)
        this.secondPartTimeline.add(this.flowerTwoAnimation)
      }
    })
  }

  resize() {}

  update() {}
}
