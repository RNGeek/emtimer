import React, { useCallback, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { TimerCard } from './component/TimeCard';
import { TimerController } from './component/TimerController';
import { Timer } from './lib/timer';

export type AppProps = {};

function useTimer() {
  const [timer] = useState(new Timer());
  const [remainingDuration, setRemainingDuration] = useState(timer.remainingDuration);
  const [isEnded, setIsEnded] = useState(timer.isEnded);

  useEffect(() => {
    const unsubscribe = timer.addListener('tick', (remainingDuration) => {
      setRemainingDuration(remainingDuration);
    });
    return unsubscribe;
  }, []);

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
  }, []);

  const start = useCallback((duration) => {
    timer.start(duration);
  }, []);
  const stop = useCallback(() => {
    timer.stop();
  }, []);

  return {
    remainingDuration,
    isEnded,
    start,
    stop,
  };
}

export function App(_props: AppProps) {
  const { remainingDuration, isEnded, start, stop } = useTimer();
  const handleStart = useCallback(() => {
    start(3 * 60 * 1000);
  }, [start]);

  return (
    <Container maxWidth="lg">
      <TimerCard title={'カップラーメンができるまで'} duration={remainingDuration} />
      <TimerController isEnded={isEnded} onStart={handleStart} onStop={stop} />
    </Container>
  );
}
