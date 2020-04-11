import EventEmitter from 'eventemitter3';
import { TimeController, PerformanceTimeController } from './timer/time-controller';
import { TickController, AnimationFrameTickController } from './timer/tick-controller';

export type ChainedTimerStatus = 'countdowning' | 'stopped';

export type EventTypes = {
  /** カウントダウン中で, かつタイマーが更新された時に発火するイベント. */
  tick: [];
  /** タイマーが強制的に停止されることなく, カウントダウンが最後まで終了した時に発火するイベント. */
  ended: [];
};

export type UnsubscribeFn = () => void;

/** 高FPSで動作するよう設計された多段カウントダウンタイマー */
export class ChainedTimer {
  #lapDurations: number[];
  #emitter: EventEmitter<EventTypes>;
  #timeController: TimeController;
  #tickController: TickController;
  #currentTime: number;
  #endTime: number;
  currentLapIndex: number;
  #timerId: number | null;

  /**
   * @param lapDurations ラップごとのカウントダウン時間
   */
  constructor(
    lapDurations: number[],
    timeController: TimeController = new PerformanceTimeController(),
    tickController: TickController = new AnimationFrameTickController(),
  ) {
    this.#lapDurations = lapDurations;
    this.#emitter = new EventEmitter();
    this.#timeController = timeController;
    this.#tickController = tickController;
    this.#currentTime = 0;
    this.#endTime = 0;
    this.currentLapIndex = 0;
    this.#timerId = null;
  }

  /** タイマーがカウントダウン中か, 停止しているかを返す */
  get status(): ChainedTimerStatus {
    return this.#timerId === null ? 'stopped' : 'countdowning';
  }

  /** 各ラップの残り時間. 値は `tick` イベントに合わせて更新される. */
  get lapRemains(): number[] {
    return [];
  }

  /** カウントダウンを開始する. */
  start() {}

  /** カウントダウンを強制的に停止する. これにより, 各ラップの残り時間が全て `0` となり, `tick` イベントの呼び出しも停止する. */
  stop() {}

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
