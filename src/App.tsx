import React from 'react';
import Container from '@material-ui/core/Container';
import { TimerCard } from './component/TimeCard';

export type AppProps = {};

export function App(_props: AppProps) {
  return (
    <Container maxWidth="lg">
      <TimerCard title={'カップラーメンができるまで'} duration={3 * 60 * 1000} />
    </Container>
  );
}
