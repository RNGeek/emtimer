import React from 'react';
import Container from '@material-ui/core/Container';
import { useChainedTimer } from './hook/use-chained-timer';
import { ChainedTimerDisplay } from './component/ChainedTimerDisplay';
import { ChainedTimerController } from './component/ChainedTimerController';

export type AppProps = {};

const lapConfigs = [
  { title: 'お湯が沸くまで', duration: 1 * 60 * 1000 },
  { title: 'カップラーメンができるまで', duration: 3 * 60 * 1000 },
  { title: 'お昼休みが終わるまで', duration: 30 * 60 * 1000 },
];
const lapDurations = lapConfigs.map((lapConfig) => lapConfig.duration);

export function App(_props: AppProps) {
  const { lapRemains, currentLapIndex, status, start, stop } = useChainedTimer(lapDurations);

  return (
    <Container maxWidth="lg">
      <ChainedTimerDisplay lapConfigs={lapConfigs} lapRemains={lapRemains} currentLapIndex={currentLapIndex} />
      <ChainedTimerController status={status} onStart={start} onStop={stop} />
    </Container>
  );
}
