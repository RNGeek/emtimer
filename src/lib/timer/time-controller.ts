/** 時刻を制御するコントローラ */
export interface TimeController {
  getTime(): number;
}

/** Date API を用いて時刻を制御するコントローラ */
export class DateTimeController implements TimeController {
  getTime() {
    return Date.now();
  }
}

/** Performance API を用いて時刻を制御するコントローラ */
export class PerformanceTimeController implements TimeController {
  getTime() {
    return performance.now();
  }
}

/** テスト用のコントローラ */
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
