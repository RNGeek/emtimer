import EventEmitter from 'eventemitter3';

type EventTypes = {
  start: [number];
  ended: [];
  stop: [];
  remainingdurationupdate: [number];
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

  start(duration: number) {
    const updateDuration = () => {
      const remainingDuration = this.#endTime - Date.now();

      if (remainingDuration > 0) {
        this.#rafId = requestAnimationFrame(updateDuration);
        this.#emitter.emit('remainingdurationupdate', remainingDuration);
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
    if (!this.isEnded) {
      this.#endTime = 0;
      if (this.#rafId) cancelAnimationFrame(this.#rafId);
      this.#emitter.emit('stop');
    }
  }

  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void) {
    this.#emitter.addListener(eventName, handler);
  }
}
