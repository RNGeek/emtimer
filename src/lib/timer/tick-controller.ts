import { TimeController } from './time-controller';

/** タイマーの更新タイミングを制御するコントローラ */
export interface TickController {
  /** 次のタイマー更新時にコールバックを呼び出すよう予約する */
  requestTick(cb: (timestamp: number) => void): number;
  /** コールバックの呼び出し予約をキャンセルする */
  cancelTick(tickId: number): void;
}

/** AnimationFrame APIを使ってタイマーの更新タイミングを制御するコントローラ */
export class AnimationFrameTickController implements TickController {
  requestTick(cb: (timestamp: number) => void): number {
    return requestAnimationFrame(cb);
  }
  cancelTick(tickId: number): void {
    return cancelAnimationFrame(tickId);
  }
}

/** テスト向けのコントローラ */
export class TestableTickController implements TickController {
  #cbQueue: FrameRequestCallback[] = [];
  #timeController: TimeController;
  constructor(timeController: TimeController) {
    this.#timeController = timeController;
  }
  requestTick(cb: (timestamp: number) => void): number {
    const tickId = this.#cbQueue.length;
    this.#cbQueue.unshift(cb);
    return tickId;
  }
  cancelTick(tickId: number): void {
    this.#cbQueue.splice(tickId, 1);
  }
  /** タイマーを更新し，予約されたコールバックを呼び出す */
  advanceTick() {
    this.#cbQueue.forEach((cb) => cb(this.#timeController.getTime()));
    this.#cbQueue.length = 0;
  }
}
