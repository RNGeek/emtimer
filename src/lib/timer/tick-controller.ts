import { TimeController } from './time-controller';

export interface TickController {
  requestTick(cb: (timestamp: number) => void): number;
  cancelTick(tickId: number): void;
}

export class AnimationFrameTickController implements TickController {
  requestTick(cb: (timestamp: number) => void): number {
    return requestAnimationFrame(cb);
  }
  cancelTick(tickId: number): void {
    return cancelAnimationFrame(tickId);
  }
}

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
  advanceTick() {
    this.#cbQueue.forEach((cb) => cb(this.#timeController.getTime()));
    this.#cbQueue.length = 0;
  }
}
