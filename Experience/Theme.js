import { EventEmitter } from 'events';

export default class Theme extends EventEmitter {
  constructor() {
    super()

    this.theme = "light"

    this.toggleButton = document.querySelector(".toggle-button")
    this.toggleCircle = document.querySelector(".toggle-circle")

    this.setEventListener()
  }

  setEventListener() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleCircle.classList.toggle("slide")
    })
  }
}