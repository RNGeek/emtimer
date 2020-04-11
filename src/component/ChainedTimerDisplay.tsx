import React, { useMemo } from 'react';
import { TimerCard } from './TimeCard';

function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  return array1.slice(0, array2.length).map((val, i) => [val, array2[i]]);
}

export type LapConfig = {
  title: string;
  duration: number;
};

export type LapState = {
  title: string;
  duration: number;
  remain: number;
};

export type ChainedTimerDisplayProps = {
  lapConfigs: LapConfig[];
  lapRemains: number[];
  currentLapIndex: number;
};

export function ChainedTimerDisplay({ lapConfigs, lapRemains }: ChainedTimerDisplayProps) {
  const lapStates: LapState[] = useMemo(() => {
    return zip(lapConfigs, lapRemains).map(([lapConfig, lapRemain]) => ({ ...lapConfig, remain: lapRemain }));
  }, [lapConfigs, lapRemains]);

  return (
    <div>
      {lapStates.map((state, i) => (
        <TimerCard key={i} title={state.title} duration={state.remain} />
      ))}
    </div>
  );
}
