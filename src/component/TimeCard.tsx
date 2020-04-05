import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '3vw',
  },
  time: {
    textAlign: 'center',
    fontSize: '10vw',
  },
}));

export type TimerCardProps = {
  title: string;
  duration: number;
};

export function TimerCard({ title, duration }: TimerCardProps) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.time}>{duration} ms</Typography>
      </CardContent>
    </Card>
  );
}
