export interface TimeController {
  getTime(): number;
}

export class DateTimeController implements TimeController {
  getTime() {
    return Date.now();
  }
}

export class TestableTimeController implements TimeController {
  #now = 0;
  getTime() {
    return this.#now;
  }
  setTime(now: number): void {
    this.#now = now;
  }
  advanceTimeBy(diff: number): void {
    this.#now += diff;
  }
}
