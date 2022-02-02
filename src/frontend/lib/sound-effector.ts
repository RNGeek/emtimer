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
    // オーディオの再生が完了すると、通常 `HTMLAudioElement.prototype.currentTime` が 0 に戻るはずであるが、
    // ブラウザによってはタイミング攻撃対策で `HTMLAudioElement.prototype.currentTime` が 0 に誤差を加えた値になる。
    // その結果、音源ファイルの再生が途中から始まり、チクタク音が聞こえないことがある。
    // ref: https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/currentTime#reduced_time_precision
    //
    // そこでここでは load を呼び出し、再生を開始する前に `HTMLAudioElement.prototype.currentTime` を強制的に 0 に戻している。
    this.ticitack.load()
    // MS Edgeは `HTMLAudioElement.prototype.play` で
    // Promiseを返さないので無理やりPromise化する
    return promisify(this.ticitack.play())
  }

  playEnded (): Promise<void> {
    if (this.muted) return Promise.resolve()
    this.ended.load()
    // MS Edgeは `HTMLAudioElement.prototype.play` で
    // Promiseを返さないので無理やりPromise化する
    return promisify(this.ended.play())
  }
}
