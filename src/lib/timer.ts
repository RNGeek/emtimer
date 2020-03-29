import EventEmitter from 'eventemitter3';

type EventTypes = {
  onstart: [number];
  onend: [];
  ontick: [number];
};

export class Timer {
  #emitter: EventEmitter<EventTypes>;
  #endTime: number;

  constructor() {
    this.#emitter = new EventEmitter();
    this.#endTime = 0;
  }

  start(duration: number) {
    const updateDuration = () => {
      const remainingDuration = this.#endTime - Date.now();

      if (remainingDuration > 0) {
        requestAnimationFrame(updateDuration);
        this.#emitter.emit('ontick', remainingDuration);
      } else {
        this.#emitter.emit('onend');
      }
    };

    this.#endTime = Date.now() + duration;
    requestAnimationFrame(updateDuration);
    this.#emitter.emit('onstart', duration);
  }

  reset() {}

  addListener<T extends keyof EventTypes>(eventName: T, handler: (...args: EventTypes[T]) => void) {
    this.#emitter.addListener(eventName, handler);
  }
}
