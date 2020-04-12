import { useState, useCallback, useEffect, useMemo } from 'react';
import { ChainedTimer, ChainedTimerStatus } from '../lib/chained-timer';

export type UseChainedTimerResult = {
  status: ChainedTimerStatus;
  currentLapRemain: number;
  currentLapIndex: number;
  start: () => void;
  stop: () => void;
};

type ChainedTimerState = {
  status: ChainedTimerStatus;
  currentLapRemain: number;
  currentLapIndex: number;
};

export function useChainedTimer(lapDurations: number[]): UseChainedTimerResult {
  const timer = useMemo(() => new ChainedTimer(lapDurations), [lapDurations]);
  const [state, setState] = useState<ChainedTimerState>({
    status: timer.status,
    currentLapRemain: timer.currentLapRemain,
    currentLapIndex: timer.currentLapIndex,
  });
  const syncStateWithTimer = useCallback(() => {
    setState({
      status: timer.status,
      currentLapRemain: timer.currentLapRemain,
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
    const unsubscribe = timer.addListener('tick', syncStateWithTimer);
    return unsubscribe;
  }, [syncStateWithTimer, timer]);

  return { ...state, start, stop };
}
