import * as THREE from 'three'
import GSAP from "gsap"
import { CustomEase } from "gsap/CustomEase"
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene
    this.roomChildren = {}
    GSAP.registerPlugin(CustomEase)

    this.lampControl = GSAP.timeline()

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

      if (child.name === "Mini_Floor") {
        child.position.x = -0.932838
        child.position.z = 6.35613
      }

      if (child.name === "Mailbox" ||
      child.name === "Lamp" ||
      child.name === "Flower1" ||
      child.name === "Flower2") {
        child.scale.set(0, 0, 0)
      }

      child.scale.set(0, 0, 0)

      if (child.name === 'Cube') {
        child.scale.set(1, 1, 1)
        child.position.set(0, -1.5, 0)
        child.rotation.y = Math.PI / 4
      }

      this.roomChildren[child.name.toLowerCase()] = child
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

    this.roomChildren['rectlight'] = this.rectLight
  }

  turnOnTheLight(theme) {
    if (theme === "dark") {
      this.lampControl.fromTo(this.rectLight, {intensity: 0}, {
        intensity: 40,
        duration: 2,
        ease: CustomEase.create("custom", "M0,0,C0.054,0.164,0.064,0.552,0.064,0.552,0.064,0.552,0.128,0,0.128,0,0.128,0,0.182,0.762,0.182,0.762,0.182,0.762,0.266,0,0.266,0,0.266,0,0.358,1,0.358,1,0.358,1,0.464,0,0.464,0,0.464,0,0.56,0.724,0.56,0.724,0.56,0.724,0.636,0,0.636,0,0.636,0,0.754,0.574,0.754,0.574,0.754,0.574,0.838,0,0.838,0,0.838,0,0.958,0,0.958,0,0.958,0,0.995,1.001,1,1"),
      })
    } else {
      this.lampControl.progress(0).clear()
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