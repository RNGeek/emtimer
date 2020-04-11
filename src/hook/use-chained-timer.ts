import { useState, useCallback, useEffect, useMemo } from 'react';
import { ChainedTimer, ChainedTimerStatus } from '../lib/chained-timer';

export type UseChainedTimerResult = {
  status: ChainedTimerStatus;
  lapRemains: number[];
  currentLapIndex: number;
  start: () => void;
  stop: () => void;
};

type ChainedTimerState = {
  status: ChainedTimerStatus;
  lapRemains: number[];
  currentLapIndex: number;
};

export function useChainedTimer(lapDurations: number[]): UseChainedTimerResult {
  const timer = useMemo(() => new ChainedTimer(lapDurations), [lapDurations]);
  const [state, setState] = useState<ChainedTimerState>({
    status: 'stopped',
    lapRemains: [],
    currentLapIndex: 0,
  });
  const syncStateWithTimer = useCallback(() => {
    setState({
      status: timer.status,
      lapRemains: timer.lapRemains,
      currentLapIndex: timer.currentLapIndex,
    });
  }, [timer]);

  const start = useCallback(() => {
    timer.start();
    syncStateWithTimer();
  }, [syncStateWithTimer, timer]);
  const stop = useCallback(() => {
    timer.stop();
    syncStateWithTimer();
  }, [syncStateWithTimer, timer]);

  useEffect(() => {
    const unsubscribe1 = timer.addListener('tick', syncStateWithTimer);
    const unsubscribe2 = timer.addListener('ended', syncStateWithTimer);
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [syncStateWithTimer, timer]);

  return { ...state, start, stop };
}
