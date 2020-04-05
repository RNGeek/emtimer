import EventEmitter from 'eventemitter3';
import { TimeController, DateTimeController, PerformanceTimeController } from './timer/time-controller';
import { TickController, AnimationFrameTickController } from './timer/tick-controller';

export type EventTypes = {
  /**
   * カウントダウンが開始した時に発火するイベント.
   * @param duration カウントダウンする時間
   */
  start: [number];
  /** タイマーが強制的に停止されることなく, カウントダウンが最後まで終了した時に発火するイベント. */
  ended: [];
  /** タイマーが強制的に停止された時に発火するイベント. */
  stop: [];
  /**
   * カウントダウン中で, かつタイマーが更新された時に発火するイベント.
   * @param remainingDuration 残り時間
   */
  tick: [number];
};

/** 高FPSで動作するよう設計されたカウントダウンタイマー */
export class Timer {
  #emitter: EventEmitter<EventTypes>;
  #timeController: TimeController;
  #tickController: TickController;
  #endTime: number;
  #timerId: number | null;

  constructor(
    timeController: TimeController = new PerformanceTimeController(),
    tickController: TickController = new AnimationFrameTickController(),
  ) {
    this.#emitter = new EventEmitter();
    this.#timeController = timeController;
    this.#tickController = tickController;
    this.#endTime = 0;
    this.#timerId = null;
  }

  /** カウントダウンが終了しているか */
  get isEnded(): boolean {
    return this.#timerId === null;
  }

  /** 残り時間 */
  get remainingDuration(): number {
    return Math.max(this.#endTime - this.#timeController.getTime(), 0);
  }

  /**
   * カウントダウンを開始する.
   * @param duration カウントダウンする時間
   * @fires start
   */
  start(duration: number) {
    if (!this.isEnded) throw new Error('Cannot start timer. Is the timer stopped?');
    const updateDuration = () => {
      const remainingDuration = this.remainingDuration;

      if (remainingDuration > 0) {
        this.#timerId = this.#tickController.requestTick(updateDuration);
        this.#emitter.emit('tick', remainingDuration);
      } else {
        this.#timerId = null;
        this.#emitter.emit('ended');
      }
    };

    this.#endTime = this.#timeController.getTime() + duration;
    this.#timerId = this.#tickController.requestTick(updateDuration);
    this.#emitter.emit('start', duration);
  }

  /**
   * カウントダウンを強制的に停止する. これにより, 残り時間が `0` となり, `tick` イベントの呼び出しも停止する.
   * @fires stop
   */
  stop() {
    if (this.isEnded) throw new Error('Cannot stop timer. Is the timer cowntdowning?');
    this.#endTime = 0;
    this.#tickController.cancelTick(this.#timerId!);
    this.#timerId = null;
    this.#emitter.emit('stop');
  }

  /**
   * イベントリスナを登録する.
   */
  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void) {
    this.#emitter.addListener(eventName, handler);
  }
}
