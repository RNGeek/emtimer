import EventEmitter from 'eventemitter3';
import { TimeController, PerformanceTimeController } from './timer/time-controller';
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

export type UnsubscribeFn = () => void;

/** 高FPSで動作するよう設計されたカウントダウンタイマー */
export class Timer {
  #emitter: EventEmitter<EventTypes>;
  #timeController: TimeController;
  #tickController: TickController;
  #currentTime: number;
  #endTime: number;
  #timerId: number | null;

  constructor(
    timeController: TimeController = new PerformanceTimeController(),
    tickController: TickController = new AnimationFrameTickController(),
  ) {
    this.#emitter = new EventEmitter();
    this.#timeController = timeController;
    this.#tickController = tickController;
    this.#currentTime = 0;
    this.#endTime = 0;
    this.#timerId = null;
  }

  /** カウントダウンが終了しているか */
  get isEnded(): boolean {
    return this.#timerId === null;
  }

  /** 残り時間. 値は `tick` イベントに合わせて更新される. */
  get remainingDuration(): number {
    return Math.max(this.#endTime - this.#currentTime, 0);
  }

  /**
   * カウントダウンを開始する.
   * @param duration カウントダウンする時間
   * @fires start
   */
  start(duration: number) {
    if (!this.isEnded) throw new Error('Cannot start timer. Is the timer stopped?');
    const updateDuration = (timestamp: number) => {
      this.#currentTime = timestamp;
      if (this.remainingDuration > 0) {
        this.#timerId = this.#tickController.requestTick(updateDuration);
        this.#emitter.emit('tick', this.remainingDuration);
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
    this.#currentTime = 0;
    this.#endTime = 0;
    this.#timerId = null;
    this.#tickController.cancelTick(this.#timerId!);
    this.#emitter.emit('stop');
  }

  /**
   * イベントリスナを登録する.
   */
  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void): UnsubscribeFn {
    this.#emitter.addListener(eventName, handler);
    return () => {
      this.#emitter.removeListener(eventName, handler);
    };
  }
}
