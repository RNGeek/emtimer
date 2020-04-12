import EventEmitter from 'eventemitter3';
import { TimeController, PerformanceTimeController } from './timer/time-controller';
import { TickController, AnimationFrameTickController } from './timer/tick-controller';

const START_TIME_FOR_STOPPED = 0;

export type ChainedTimerStatus = 'countdowning' | 'stopped';

export type EventTypes = {
  /** カウントダウン中のタイマーが更新された時に発火するイベント. */
  tick: [];
};

export type UnsubscribeFn = () => void;

function getCurrentLap(lapDurations: number[], elapsed: number) {
  let sum = 0;
  for (let i = 0; i < lapDurations.length; i++) {
    sum += lapDurations[i];
    if (elapsed < sum) {
      return {
        currentLapIndex: i,
        currentLapRemain: sum - elapsed,
      };
    }
  }
  return {
    currentLapIndex: lapDurations.length - 1,
    currentLapRemain: 0,
  };
}

/** 高FPSで動作するよう設計された多段カウントダウンタイマー */
export class ChainedTimer {
  readonly #lapDurations: number[];
  readonly #emitter: EventEmitter<EventTypes>;
  readonly #timeController: TimeController;
  readonly #tickController: TickController;

  /** タイマーがカウントダウン中か, 停止しているかを返す */
  status: ChainedTimerStatus;
  #startTime: number;
  /** カウントダウン中のラップのインデックス. 停止中は最後のラップのインデックスが設定される. */
  currentLapRemain: number;
  /** カウントダウン中のラップの残り時間. 値は `tick` イベントに合わせて更新される. 停止中は `0` が設定される. */
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

    this.status = 'stopped';
    this.#startTime = START_TIME_FOR_STOPPED;
    this.currentLapIndex = lapDurations.length - 1;
    this.currentLapRemain = 0;
    this.#timerId = null;
  }

  /** カウントダウンを開始する. */
  start() {
    const now = this.#timeController.getTime();
    if (this.status === 'countdowning') throw new Error('Cannot start timer. Is the timer stopped?');

    const updateStateBy = (currentTime: number) => {
      const lastLapIndex = this.#lapDurations.length - 1;
      const elapsed = currentTime - this.#startTime;

      const { currentLapIndex, currentLapRemain } = getCurrentLap(this.#lapDurations, elapsed);

      if (currentLapIndex === lastLapIndex && currentLapRemain === 0) {
        this.status = 'stopped';
        this.#startTime = START_TIME_FOR_STOPPED;
        this.currentLapIndex = lastLapIndex;
        this.currentLapRemain = currentLapRemain;
      } else {
        this.status = 'countdowning';
        this.#startTime = this.#startTime;
        this.currentLapIndex = currentLapIndex;
        this.currentLapRemain = currentLapRemain;
      }
    };

    const updateDuration = (timestamp: number) => {
      updateStateBy(timestamp);
      this.#emitter.emit('tick');

      if (this.status === 'countdowning') {
        this.#timerId = this.#tickController.requestTick(updateDuration);
      } else {
        this.#timerId = null;
      }
    };

    this.status = 'countdowning';
    this.#startTime = now;
    this.currentLapIndex = 0;
    this.currentLapRemain = this.#lapDurations[0];
    this.#timerId = this.#tickController.requestTick(updateDuration);
  }

  /** カウントダウンを強制的に停止する. これにより, 各ラップの残り時間が全て `0` となり, `tick` イベントの呼び出しも停止する. */
  stop() {
    if (this.status === 'stopped') throw new Error('Cannot stop timer. Is the timer cowntdowning?');

    this.status = 'stopped';
    this.#startTime = START_TIME_FOR_STOPPED;
    this.currentLapIndex = this.#lapDurations.length - 1;
    this.currentLapRemain = 0;
    this.#tickController.cancelTick(this.#timerId!);
    this.#timerId = null;
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
