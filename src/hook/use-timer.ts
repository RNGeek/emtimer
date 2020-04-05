import { useCallback, useState, useEffect } from 'react';
import { Timer } from '../lib/timer';

export function useTimer() {
  const [timer] = useState(new Timer());
  const [remainingDuration, setRemainingDuration] = useState(timer.remainingDuration);
  const [isEnded, setIsEnded] = useState(timer.isEnded);

  useEffect(() => {
    const unsubscribe = timer.addListener('tick', (remainingDuration) => {
      setRemainingDuration(remainingDuration);
    });
    return unsubscribe;
  }, [timer]);

  useEffect(() => {
    const unsubscribe1 = timer.addListener('ended', () => {
      setIsEnded(timer.isEnded);
    });
    const unsubscribe2 = timer.addListener('stop', () => {
      setIsEnded(timer.isEnded);
      setRemainingDuration(timer.remainingDuration);
    });
    const unsubscribe3 = timer.addListener('start', () => {
      setIsEnded(timer.isEnded);
    });
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, [timer]);

  const start = useCallback(
    (duration) => {
      timer.start(duration);
    },
    [timer],
  );
  const stop = useCallback(() => {
    timer.stop();
  }, [timer]);

  return {
    remainingDuration,
    isEnded,
    start,
    stop,
  };
}
