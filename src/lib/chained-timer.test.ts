import { ChainedTimer } from './chained-timer';
import { TestableTimeController } from './timer/time-controller';
import { TestableTickController } from './timer/tick-controller';

function createTimer(lapDurations = [1000, 2000, 3000]) {
  const timeController = new TestableTimeController();
  const tickController = new TestableTickController(timeController);
  const timer = new ChainedTimer(lapDurations, timeController, tickController);
  const listener = jest.fn();
  timer.addListener('tick', listener);
  return { timeController, tickController, timer, listener };
}

function createStartedTimer(lapDurations = [1000, 2000, 3000]) {
  const { timeController, tickController, timer } = createTimer(lapDurations);
  const listener = jest.fn();
  timer.addListener('tick', listener);
  timer.start();
  return { timeController, tickController, timer, listener };
}

function createElapsedTimer(lapDurations = [1000, 2000, 3000], elapsed = 0) {
  const { timeController, tickController, timer, listener } = createStartedTimer(lapDurations);
  timeController.advanceTimeBy(elapsed);
  tickController.advanceTick();
  return { timeController, tickController, timer, listener };
}

describe('Timer', () => {
  describe('#constructor', () => {
    test('インスタンスが作成できる', () => {
      createTimer([1000, 2000, 3000]);
    });
    test('ラップ数が 0 のタイマーのインスタンスは作成できない', () => {
      expect(() => {
        createTimer([]);
      }).toThrow();
    });
  });

  describe('初期状態', () => {
    describe('#status', () => {
      test('カウントダウン中ではない', () => {
        const { timer } = createTimer();
        expect(timer.status).toBe('stopped');
      });
    });
    describe('#currentLapRemain', () => {
      test('残り時間は最初のラップのカウントダウン時間', () => {
        const { timer } = createTimer([1000, 2000]);
        expect(timer.currentLapRemain).toBe(1000);
      });
    });
    describe('#currentLapIndex', () => {
      test('最初のラップのインデックスが設定されている', () => {
        const { timer } = createTimer();
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('#start', () => {
      test('カウントダウンを開始できる', () => {
        const { timer } = createTimer();
        timer.start();
        expect(timer.status).toBe('countdowning');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('#reset', () => {
      test('リセットできる', () => {
        const { timer } = createTimer([1000, 2000]);
        timer.reset();
        expect(timer.status).toBe('stopped');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('@tick', () => {
      test('どれだけ待っても発火しない', () => {
        const { timeController, tickController, listener } = createTimer([1000, 2000]);
        expect(listener.mock.calls.length).toBe(0);
        timeController.advanceTimeBy(1);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(0);
      });
    });
  });

  describe('タイマーを開始した直後の状態', () => {
    describe('#status', () => {
      test('カウントダウン中', () => {
        const { timer } = createStartedTimer([1000, 2000]);
        expect(timer.status).toBe('countdowning');
      });
    });
    describe('#currentLapRemain', () => {
      test('残り時間は最初のラップのカウントダウン時間', () => {
        const { timer } = createStartedTimer([1000, 2000]);
        expect(timer.currentLapRemain).toBe(1000);
      });
    });
    describe('#currentLapIndex', () => {
      test('最初のラップのインデックスが設定されている', () => {
        const { timer } = createStartedTimer([1000, 2000]);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('#start', () => {
      test('例外が発生する', () => {
        const { timer } = createStartedTimer([1000, 2000]);
        expect(() => {
          timer.start();
        }).toThrow();
        expect(timer.status).toBe('countdowning');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('#reset', () => {
      test('リセットできる', () => {
        const { timer } = createStartedTimer([1000, 2000]);
        timer.reset();
        expect(timer.status).toBe('stopped');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('@tick', () => {
      test('TickController#advanceTick を呼び出す度に発火する', () => {
        const { timeController, tickController, listener } = createStartedTimer([1000, 2000]);
        expect(listener.mock.calls.length).toBe(0);
        timeController.advanceTimeBy(1);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(1);
      });
    });
  });

  describe('タイマーを開始してから少し時間が経過した状態', () => {
    describe('#status', () => {
      test('カウントダウン中', () => {
        const { timer } = createElapsedTimer([1000, 2000], 1500);
        expect(timer.status).toBe('countdowning');
      });
    });
    describe('#currentLapRemain', () => {
      test('残り時間が更新されている', () => {
        const { timer } = createElapsedTimer([1000, 2000], 1500);
        expect(timer.currentLapRemain).toBe(1500);
      });
    });
    describe('#currentLapIndex', () => {
      test('現在のラップのインデックスが更新されている', () => {
        const { timer } = createElapsedTimer([1000, 2000], 1500);
        expect(timer.currentLapIndex).toBe(1);
      });
    });
    describe('#start', () => {
      test('例外が発生する', () => {
        const { timer } = createElapsedTimer([1000, 2000], 1500);
        expect(() => {
          timer.start();
        }).toThrow();
        expect(timer.status).toBe('countdowning');
        expect(timer.currentLapRemain).toBe(1500);
        expect(timer.currentLapIndex).toBe(1);
      });
    });
    describe('#reset', () => {
      test('リセットできる', () => {
        const { timer } = createElapsedTimer([1000, 2000], 1500);
        timer.reset();
        expect(timer.status).toBe('stopped');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('@tick', () => {
      test('TickController#advanceTick を呼び出す度に発火する', () => {
        const { timeController, tickController, listener } = createElapsedTimer([1000, 2000], 1500);
        expect(listener.mock.calls.length).toBe(1);
        timeController.advanceTimeBy(1);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(2);
      });
    });
  });

  describe('タイマーを開始してから十分時間が経過した状態', () => {
    describe('#status', () => {
      test('カウントダウン終了', () => {
        const { timer } = createElapsedTimer([1000, 2000], 3000);
        expect(timer.status).toBe('stopped');
      });
    });
    describe('#currentLapRemain', () => {
      test('残り時間は 0 になる', () => {
        const { timer } = createElapsedTimer([1000, 2000], 3000);
        expect(timer.currentLapRemain).toBe(0);
      });
    });
    describe('#currentLapIndex', () => {
      test('現在のラップのインデックスは最終ラップのインデックスになる', () => {
        const { timer } = createElapsedTimer([1000, 2000], 3000);
        expect(timer.currentLapIndex).toBe(1);
      });
    });
    describe('#start', () => {
      test('カウントダウンを開始できる', () => {
        const { timer } = createElapsedTimer([1000, 2000], 3000);
        timer.start();
        expect(timer.status).toBe('countdowning');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('#reset', () => {
      test('リセットできる', () => {
        const { timer } = createElapsedTimer([1000, 2000], 3000);
        timer.reset();
        expect(timer.status).toBe('stopped');
        expect(timer.currentLapRemain).toBe(1000);
        expect(timer.currentLapIndex).toBe(0);
      });
    });
    describe('@tick', () => {
      test('どれだけ待っても発火しない', () => {
        const { timeController, tickController, listener } = createElapsedTimer([1000, 2000], 3000);
        expect(listener.mock.calls.length).toBe(1);
        timeController.advanceTimeBy(1);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(1);
      });
    });
  });
});
