import { Timer, EventTypes } from './timer';
import { TestableTimeController } from './timer/time-controller';
import { TestableTickController } from './timer/tick-controller';

function createTimer() {
  const timeController = new TestableTimeController();
  const tickController = new TestableTickController(timeController);
  const timer = new Timer(timeController, tickController);
  return { timeController, tickController, timer };
}

function createCountdowningTimer(duration = 1000) {
  const { timeController, tickController, timer } = createTimer();
  timer.start(duration);
  return { timeController, tickController, timer };
}

function createTimerWithListener(event: keyof EventTypes) {
  const { timeController, tickController, timer } = createTimer();
  const listener = jest.fn();
  timer.addListener(event, listener);
  return { timeController, tickController, timer, listener };
}

describe('Timer', () => {
  describe('カウントダウンしていない時', () => {
    describe('#isEnded', () => {
      test('カウントダウン中ではない', () => {
        const { timer } = createTimer();
        expect(timer.isEnded).toBe(true);
      });
    });
    describe('#remainingDuration', () => {
      test('残り時間は0', () => {
        const { timer } = createTimer();
        expect(timer.remainingDuration).toBe(0);
      });
    });
    describe('#start', () => {
      test('カウントダウンを開始できる', () => {
        const { timer } = createTimer();
        timer.start(1000);
        expect(timer.isEnded).toBe(false);
        expect(timer.remainingDuration).toBe(1000);
      });
      test('durationが0でもカウントダウンを開始できる', () => {
        const { timer } = createTimer();
        timer.start(0);
        expect(timer.isEnded).toBe(false);
        expect(timer.remainingDuration).toBe(0);
      });
    });
    describe('#stop', () => {
      test('例外が発生する', () => {
        const { timer } = createTimer();
        expect(() => {
          timer.stop();
        }).toThrow();
      });
    });
  });

  describe('カウントダウン中', () => {
    describe('#isEnded', () => {
      test('カウントダウン中である', () => {
        const { timer } = createCountdowningTimer();
        expect(timer.isEnded).toBe(false);
      });
    });
    describe('#remainingDuration', () => {
      test('時間が経過するにつれ，残り時間が減っていく', () => {
        const { timer, timeController } = createCountdowningTimer(1000);
        expect(timer.remainingDuration).toBe(1000);
        timeController.advanceTimeBy(500);
        expect(timer.remainingDuration).toBe(500);
      });
    });
    describe('#start', () => {
      test('例外が発生する', () => {
        const { timer } = createCountdowningTimer(1000);
        expect(() => {
          timer.start(1000);
        }).toThrow();
      });
    });
    describe('#stop', () => {
      test('カウントダウンを開始できる', () => {
        const { timer } = createCountdowningTimer(1000);
        expect(timer.isEnded).toBe(false);
        timer.stop();
        expect(timer.isEnded).toBe(true);
      });
      test('durationが0でもカウントダウン中なら #stop できる', () => {
        const { timer } = createCountdowningTimer(0);
        expect(timer.isEnded).toBe(false);
        timer.stop();
        expect(timer.isEnded).toBe(true);
      });
    });
  });

  describe('#addListener', () => {
    describe(`@start`, () => {
      test('#start が呼び出されたら start イベントが発火する', () => {
        const { timer, listener } = createTimerWithListener('start');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(1);
        timer.stop();
        expect(listener.mock.calls.length).toBe(1);
      });
    });
    describe(`@ended`, () => {
      test('カウントダウンが終了したら ended イベントが発火する', () => {
        const { timer, listener, timeController, tickController } = createTimerWithListener('ended');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        timeController.advanceTimeBy(1000);
        expect(listener.mock.calls.length).toBe(0);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(1);
      });
      test('#stop した時は ended イベントは発火しない', () => {
        const { timer, listener } = createTimerWithListener('ended');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        timer.stop();
        expect(listener.mock.calls.length).toBe(0);
      });
    });
    describe(`@stop`, () => {
      test('#stop が呼び出されたら stop イベントが発火する', () => {
        const { timer, listener } = createTimerWithListener('stop');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        timer.stop();
        expect(listener.mock.calls.length).toBe(1);
      });
      test('カウントダウンが終了しても stop イベントは発生しない', () => {
        const { timer, listener, timeController, tickController } = createTimerWithListener('stop');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        timeController.advanceTimeBy(1000);
        expect(listener.mock.calls.length).toBe(0);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(0);
      });
    });
    describe(`@tick`, () => {
      test('カウントダウン中に `requestAnimationFrame` などが呼ばれたら tick イベントが発火する', () => {
        const { timer, listener, tickController } = createTimerWithListener('tick');
        expect(listener.mock.calls.length).toBe(0);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(1);
        timer.stop();
        expect(listener.mock.calls.length).toBe(1);
        tickController.advanceTick();
        expect(listener.mock.calls.length).toBe(1);
      });
    });
  });
});
