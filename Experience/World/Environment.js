import * as THREE from 'three'
import GSAP from 'gsap'

import Experience from "../Experience"

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.color = {
      colorDark: {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216
      },
      intensityDark: {
        intensity: 1
      },
      colorLight: {
        r: 1,
        g: 1,
        b: 1
      },
      intensityLight: {
        intensity: 1
      }
    }

    this.setSunlight()
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05
    
    this.sunLight.position.set(1.5, 7, 3)
    this.scene.add(this.sunLight)

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
    this.scene.add(this.ambientLight)
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, this.color.colorDark)
      GSAP.to(this.ambientLight.color, this.color.colorDark)
      GSAP.to(this.sunLight, this.color.intensityDark)
      GSAP.to(this.ambientLight, this.color.intensityDark)
    } else {
      GSAP.to(this.sunLight.color, this.color.colorLight)
      GSAP.to(this.ambientLight.color, this.color.colorLight)
      GSAP.to(this.sunLight, this.color.intensityLight)
      GSAP.to(this.ambientLight, this.color.intensityLight)
    }
  }

  resize() {

  }

  update() {

  }
}