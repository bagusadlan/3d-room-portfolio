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
        // First Move ---------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0016
          },
        })

        // Second Move ---------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true
          }})
        this.secondMoveTimeline.to(this.room.position, {
          x: () => {
            return 1
          },
          z: () => {
            return this.sizes.height * 0.0032
          }
        }, "same")
        this.secondMoveTimeline.to(this.room.scale, {
          x: 0.4,
          y: 0.4,
          z: 0.4
        }, "same")
        this.secondMoveTimeline.to(this.rectLight, {
          width: 0.4 * 4,
          height: 0.7 * 4
        }, "same")

        // Third Move ---------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }})
        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          y: -1,
          x: -4
        })
      },
      // Mobile
      "(max-width: 960px)": () => {
        
      },
      // all 
      "all": function() {

      }
    })
  }

  resize() {

  }

  update() {

  }
}