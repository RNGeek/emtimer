import React from 'react';
import Button from '@material-ui/core/Button';
import { TimerStatus } from '../hook/use-chained-timer';

export type ChainedTimerControllerProps = {
  status: TimerStatus;
  onStart: () => void;
  onStop: () => void;
};

export function ChainedTimerController({ status, onStart, onStop }: ChainedTimerControllerProps) {
  return (
    <div>
      <Button disabled={status === 'stopped'} onClick={onStop}>
        停止
      </Button>
      <Button disabled={status === 'countdowning'} onClick={onStart}>
        開始
      </Button>
    </div>
  );
}
