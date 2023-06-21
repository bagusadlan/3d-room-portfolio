import * as THREE from 'three'
import GSAP from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.room = this.experience.world.room.actualRoom
    this.room.children.forEach(child => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child
      }
    })
    GSAP.registerPlugin(ScrollTrigger)

    this.setScrollTrigger()
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Dekstop
      "(min-width: 969px)": () => {
        this.room.scale.set(0.11, 0.11, 0.11)
        this.rectLight.width = 0.4
        this.rectLight.height = 0.7
        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
          .to(this.room.position, {
            x: () => {
              return this.sizes.width * 0.0016
            },
          })

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true
          }})
          .to(this.room.position, {
            x: () => {
              return 1
            },
            z: () => {
              return this.sizes.height * 0.0032
            }
          }, "same")
          .to(this.room.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4
          }, "same")
          .to(this.rectLight, {
            width: 0.4 * 4,
            height: 0.7 * 4
          }, "same")

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
          .to(this.camera.orthographicCamera.position, {
            y: -1,
            x: -4
          })
      },
      // Mobile
      "(max-width: 960px)": () => {
        this.room.scale.set(0.07, 0.07, 0.07)
        this.room.position.set(0, 0, 0)
        this.rectLight.width = 0.3
        this.rectLight.height = 0.4
        
        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
          .to(this.room.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          }, "same")
          .to(this.rectLight, {
            width: 0.3 * 1.35,
            height: 0.4 * 1.35,
          }, "same")

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true
          }})
          .to(this.room.scale, {
            x: 0.25,
            y: 0.25,
            z: 0.25,
          }, "same")
          .to(this.rectLight, {
            width: 0.3 * 3,
            height: 0.4 * 3,
          }, "same")
          .to(this.room.position, {
            x: 1.8
          }, "same")

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
          .to(this.room.position, {
            z: -4.5
          })
      },
      // all 
      "all": () => {
        // Third Move ---------------------------------
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center"
          }
        })

        this.room.children.forEach(child => {
          if (child.name === "Mini_Floor") {
            this.miniFloorAnimation = new GSAP.to(child.position, {
              x: -6.46751,
              z: 11.8908,
              duration: 0.4
            })
          }

          if (child.name === "Mailbox") {
            this.mailboxAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(1.7)",
              duration: 0.4
            })
          }

          if (child.name === "Lamp") {
            this.lampAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(1.7)",
              duration: 0.4
            })
          }

          if (child.name === "Flower1") {
            this.flowerOneAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(1.7)",
              duration: 0.4
            })
          }

          if (child.name === "Flower2") {
            this.flowerTwoAnimation = new GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(1.7)",
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

  resize() {

  }

  update() {

  }
}