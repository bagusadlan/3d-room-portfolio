import * as THREE from 'three'

import Experience from "../Experience";

import Room from './Room';
import Floor from './Floor';
import Controls from './Controls';
import Environment from "../World/Environment";

export default class World {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resources = this.experience.resources
    this.theme = this.experience.theme
    this.room = this.experience.room

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.room = new Room()
      this.floor = new Floor()
      this.controls = new Controls()
    })

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme)
    })
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme)
    }
    if (this.room) {
      this.room.turnOnTheLight(theme)
    }
  }

  resize() {

  }

  update() {
    if (this.room) {
      this.room.update()
    }

    if (this.controls) {
      this.controls.update()
    }
  }
}