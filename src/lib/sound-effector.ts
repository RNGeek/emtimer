export default class SoundEffector {
  private ticitack: HTMLAudioElement // eslint-disable-line no-undef
  private ended: HTMLAudioElement // eslint-disable-line no-undef

  constructor () {
    this.ticitack = new Audio(require('../audio/ticktack.mp3'))
    this.ended = new Audio(require('../audio/ended.mp3'))
    this.ticitack.muted = true
    this.ended.muted = true
  }

  get muted () {
    return this.ticitack.muted
  }

  set muted (val: boolean) {
    this.ticitack.muted = val
    this.ended.muted = val
  }

  playTicktack (): Promise<void> {
    if (this.muted) return Promise.resolve()
    return this.ticitack.play()
  }

  playEnded (): Promise<void> {
    if (this.muted) return Promise.resolve()
    return this.ended.play()
  }
}
