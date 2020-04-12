import React, { useMemo } from 'react';
import Container from '@material-ui/core/Container';
import { useChainedTimer } from './hook/use-chained-timer';
import { TimerCard } from './component/TimeCard';
import { TimerController } from './component/TimerController';

export type AppProps = {};

const lapConfigs = [
  { title: 'お湯が沸くまで', duration: 3 * 1000 },
  { title: 'カップラーメンができるまで', duration: 5 * 1000 },
  { title: 'お昼休みが終わるまで', duration: 10 * 1000 },
];
const lapDurations = lapConfigs.map((lapConfig) => lapConfig.duration);

export function App(_props: AppProps) {
  const { currentLapRemain, currentLapIndex, status, start, stop } = useChainedTimer(lapDurations);
  const currentLapTitle = useMemo(() => lapConfigs[currentLapIndex].title, [currentLapIndex]);

  return (
    <Container maxWidth="lg">
      <TimerCard title={currentLapTitle} duration={currentLapRemain} />
      <TimerController status={status} onStart={start} onStop={stop} />
    </Container>
  );
}
