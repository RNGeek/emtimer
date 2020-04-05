import React from 'react';
import Button from '@material-ui/core/Button';

export type TimerControllerProps = {
  isEnded: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function TimerController({ isEnded, onStart, onStop }: TimerControllerProps) {
  return (
    <div>
      <Button disabled={isEnded} onClick={onStop}>
        停止
      </Button>
      <Button disabled={!isEnded} onClick={onStart}>
        開始
      </Button>
    </div>
  );
}
