import * as THREE from 'three'
import GSAP from "gsap"
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene
    
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel()
    this.setAnimation()
    this.setLampligt()
    this.onMouseMove()
  }

  setModel() {
    this.actualRoom.children.forEach(child => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach(groupchild => {
          groupchild.castShadow = true
          groupchild.receiveShadow = true
        })
      }

      if (child.name === "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial()
        child.children[0].material.roughness = 0
        child.children[0].material.color.set(0x549dd2)
        child.children[0].material.ior = 3
        child.children[0].material.transmission = 1
        child.children[0].material.opacity = 1
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen
        })
      }
    })

    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.11, 0.11, 0.11)
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom)
    this.swim = this.mixer.clipAction(this.room.animations[0])
    this.swim.play()
  }

  setLampligt() {
    const width = 0.4
    const height = 0.7
    const intensity = 1
    this.rectLight = new THREE.RectAreaLight(
      0xd13bd1,
      intensity,
      width,
      height
    )
    this.rectLight.position.set(8.53993, 6.39, -1.50045)
    this.rectLight.rotation.x = -Math.PI / 2
    this.rectLight.rotation.z = Math.PI / 4
    this.actualRoom.add(this.rectLight)

    // const rectLightHelper = new RectAreaLightHelper( rectLight )
    // rectLight.add( rectLightHelper )
    this.scene.add(this.actualRoom)
  }

  turnOnTheLight(theme) {
    if (theme === "dark") {
      setTimeout(() => {
        // this.rectLight.intensity = 20
        GSAP.to(this.rectLight, { intensity: 40, duration: 1 })
      }, 1500)
    } else {
      this.rectLight.intensity = 0
    }
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.2
    })
  }

  resize() {

  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    )

    this.actualRoom.rotation.y = this.lerp.current
    
    this.mixer.update(this.time.delta * 0.0009)
  }
}