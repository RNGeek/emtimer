import EventEmitter from 'eventemitter3';

export type EventTypes = {
  start: [number];
  ended: [];
  stop: [];
  tick: [number];
};

export class Timer {
  #emitter: EventEmitter<EventTypes>;
  #endTime: number;
  #rafId: number | null;

  constructor() {
    this.#emitter = new EventEmitter();
    this.#endTime = 0;
    this.#rafId = null;
  }

  get isEnded(): boolean {
    return this.#rafId === null;
  }

  get remainingDuration(): number {
    return Math.max(this.#endTime - Date.now(), 0);
  }

  start(duration: number) {
    if (!this.isEnded) throw new Error('Cannot start timer. Is the timer stopped?');
    const updateDuration = () => {
      const remainingDuration = this.remainingDuration;

      if (remainingDuration > 0) {
        this.#rafId = requestAnimationFrame(updateDuration);
        this.#emitter.emit('tick', remainingDuration);
      } else {
        this.#rafId = null;
        this.#emitter.emit('ended');
      }
    };

    this.#endTime = Date.now() + duration;
    this.#rafId = requestAnimationFrame(updateDuration);
    this.#emitter.emit('start', duration);
  }

  stop() {
    if (this.isEnded) throw new Error('Cannot stop timer. Is the timer cowntdowning?');
    this.#endTime = 0;
    cancelAnimationFrame(this.#rafId!);
    this.#rafId = null;
    this.#emitter.emit('stop');
  }

  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void) {
    this.#emitter.addListener(eventName, handler);
  }
}
