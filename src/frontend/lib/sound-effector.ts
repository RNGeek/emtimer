import ticitackURL from '../audio/ticktack.mp3'
import endedURL from '../audio/ended.mp3'

/**
 * 引数がPromiseであれば何もせず返し,
 * PromiseでなければFulfilledなPromiseを返す.
 */
function promisify (obj: Promise<void> | (() => void)): Promise<void> {
  if (obj instanceof Promise) return obj
  return Promise.resolve()
}

export default class SoundEffector {
  private ticitack: HTMLAudioElement // eslint-disable-line no-undef
  private ended: HTMLAudioElement // eslint-disable-line no-undef

  constructor () {
    this.ticitack = new Audio(ticitackURL)
    this.ended = new Audio(endedURL)
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
    this.ticitack.currentTime = 0
    console.log(this.ticitack.currentTime)
    // MS Edgeは `HTMLAudioElement.prototype.play` で
    // Promiseを返さないので無理やりPromise化する
    return promisify(this.ticitack.play())
  }

  playEnded (): Promise<void> {
    if (this.muted) return Promise.resolve()
    this.ended.currentTime = 0
    console.log(this.ended.currentTime)
    // MS Edgeは `HTMLAudioElement.prototype.play` で
    // Promiseを返さないので無理やりPromise化する
    return promisify(this.ended.play())
  }
}
