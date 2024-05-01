import { EventEmitter } from 'events'

export default class Theme extends EventEmitter {
  constructor() {
    super()

    this.theme = 'light'

    this.toggleButton = document.querySelector('label')

    this.setEventListener()
  }

  setEventListener() {
    this.toggleButton.addEventListener('click', () => {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.body.classList.toggle('light-theme')
      document.body.classList.toggle('dark-theme')

      this.emit('switch', this.theme)
    })
  }
}
