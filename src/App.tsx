import React, { useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { TimerCard } from './component/TimeCard';
import { TimerController } from './component/TimerController';
import { useTimer } from './hook/use-timer';

export type AppProps = {};

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
