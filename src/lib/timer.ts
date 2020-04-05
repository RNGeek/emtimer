import EventEmitter from 'eventemitter3';
import { TimeController, DateTimeController } from './timer/time-controller';
import { TickController, AnimationFrameTickController } from './timer/tick-controller';

export type EventTypes = {
  start: [number];
  ended: [];
  stop: [];
  tick: [number];
};

export class Timer {
  #emitter: EventEmitter<EventTypes>;
  #timeController: TimeController;
  #tickController: TickController;
  #endTime: number;
  #timerId: number | null;

  constructor(
    timeController: TimeController = new DateTimeController(),
    tickController: TickController = new AnimationFrameTickController(),
  ) {
    this.#emitter = new EventEmitter();
    this.#timeController = timeController;
    this.#tickController = tickController;
    this.#endTime = 0;
    this.#timerId = null;
  }

  get isEnded(): boolean {
    return this.#timerId === null;
  }

  get remainingDuration(): number {
    return Math.max(this.#endTime - this.#timeController.getTime(), 0);
  }

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

  stop() {
    if (this.isEnded) throw new Error('Cannot stop timer. Is the timer cowntdowning?');
    this.#endTime = 0;
    this.#tickController.cancelTick(this.#timerId!);
    this.#timerId = null;
    this.#emitter.emit('stop');
  }

  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void) {
    this.#emitter.addListener(eventName, handler);
  }
}
