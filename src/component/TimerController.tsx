import React from 'react';
import Button from '@material-ui/core/Button';
import { ChainedTimerStatus } from '../lib/chained-timer';

export type TimerControllerProps = {
  status: ChainedTimerStatus;
  onStart: () => void;
  onStop: () => void;
};

export function TimerController({ status, onStart, onStop }: TimerControllerProps) {
  return (
    <div>
      <Button key="1" onClick={status === 'stopped' ? onStart : onStop}>
        {status === 'stopped' ? '開始' : '停止'}
      </Button>
    </div>
  );
}
