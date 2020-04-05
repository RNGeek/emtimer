import React from 'react';
import { formatDuration } from '../lib/duration';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  unit: {
    fontSize: '0.4em',
  },
}));

export type DurationViewProps = {
  value: number;
};

export function DurationView({ value }: DurationViewProps) {
  const classes = useStyles();
  const { days, hours, minutes, seconds, cs } = formatDuration(value);
  return (
    <div>
      {days > 0 && (
        <>
          <span>{days}</span>
          <span className={classes.unit}>日</span>
        </>
      )}
      {hours > 0 && (
        <>
          <span>{hours}</span>
          <span className={classes.unit}>時間</span>
        </>
      )}

      <span>{minutes.toString().padStart(2, '0')}</span>
      <span className={classes.unit}>分</span>

      <span>{seconds.toString().padStart(2, '0')}</span>
      <span className={classes.unit}>秒</span>

      <span>{cs.toString().padStart(2, '0')}</span>
    </div>
  );
}
