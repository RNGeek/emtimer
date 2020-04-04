import { Timer, EventTypes } from './timer';
import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import {
  enableAnimationFrameMock,
  disableAnimationFrameMock,
  advanceAnimationFrame,
} from '../test-util/jest-animation-frame-mock';

// 日時を `duration` ms 進めつつ，`requestAnimationFrame` で登録されたコールバックを呼び出す
function advanceDateAndAnimationFrame(duration: number) {
  advanceBy(duration);
  advanceAnimationFrame();
}

describe('Timer', () => {
  beforeEach(() => {
    enableAnimationFrameMock();
    advanceTo(new Date(2000, 1, 1, 0, 0, 0));
  });

  afterEach(() => {
    disableAnimationFrameMock();
    clear();
  });

  describe('カウントダウンしていない時', () => {
    function createEndedTimer() {
      return new Timer();
    }
    describe('#isEnded', () => {
      test('カウントダウン中ではない', () => {
        expect(createEndedTimer().isEnded).toBe(true);
      });
    });
    describe('#remainingDuration', () => {
      test('残り時間は0', () => {
        expect(createEndedTimer().remainingDuration).toBe(0);
      });
    });
    describe('#start', () => {
      test('カウントダウンを開始できる', () => {
        const timer = createEndedTimer();
        timer.start(1000);
        expect(timer.isEnded).toBe(false);
        expect(timer.remainingDuration).toBe(1000);
      });
      test('durationが0でもカウントダウンを開始できる', () => {
        const timer = createEndedTimer();
        timer.start(0);
        expect(timer.isEnded).toBe(false);
        expect(timer.remainingDuration).toBe(0);
      });
    });
    describe('#stop', () => {
      test('例外が発生する', () => {
        expect(() => {
          createEndedTimer().stop();
        }).toThrow();
      });
    });
  });

  describe('カウントダウン中', () => {
    function createCountdowningTimer(duration = 1000) {
      const timer = new Timer();
      timer.start(duration);
      return timer;
    }
    describe('#isEnded', () => {
      test('カウントダウン中である', () => {
        expect(createCountdowningTimer().isEnded).toBe(false);
      });
    });
    describe('#remainingDuration', () => {
      test('時間が経過するにつれ，残り時間が減っていく', () => {
        const timer = createCountdowningTimer(1000);
        expect(timer.remainingDuration).toBe(1000);
        advanceDateAndAnimationFrame(500);
        expect(timer.remainingDuration).toBe(500);
      });
    });
    describe('#start', () => {
      test('例外が発生する', () => {
        expect(() => {
          createCountdowningTimer().start(1000);
        }).toThrow();
      });
    });
    describe('#stop', () => {
      test('カウントダウンを開始できる', () => {
        const timer = createCountdowningTimer(1000);
        expect(timer.isEnded).toBe(false);
        timer.stop();
        expect(timer.isEnded).toBe(true);
      });
      test('durationが0でもカウントダウン中なら #stop できる', () => {
        const timer = createCountdowningTimer(0);
        expect(timer.isEnded).toBe(false);
        timer.stop();
        expect(timer.isEnded).toBe(true);
      });
    });
  });

  describe('#addListener', () => {
    function createTimerWithListener(event: keyof EventTypes) {
      const timer = new Timer();
      const listener = jest.fn();
      timer.addListener(event, listener);
      return { timer, listener };
    }
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
        const { timer, listener } = createTimerWithListener('ended');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        advanceDateAndAnimationFrame(1000);
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
        const { timer, listener } = createTimerWithListener('stop');
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        advanceDateAndAnimationFrame(1000);
        expect(listener.mock.calls.length).toBe(0);
      });
    });
    describe(`@tick`, () => {
      test('カウントダウン中に `requestAnimationFrame` が呼ばれたら tick イベントが発火する', () => {
        const { timer, listener } = createTimerWithListener('tick');
        expect(listener.mock.calls.length).toBe(0);
        advanceAnimationFrame();
        expect(listener.mock.calls.length).toBe(0);
        timer.start(1000);
        expect(listener.mock.calls.length).toBe(0);
        advanceAnimationFrame();
        expect(listener.mock.calls.length).toBe(1);
        timer.stop();
        expect(listener.mock.calls.length).toBe(1);
      });
    });
  });
});
