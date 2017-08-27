<template>
  <div>
    <app-bar />
    <simple-timer />
    <app-footer />
  </div>
</template>

<script>
import AppBar from './components/AppBar';
import SimpleTimer from './components/SimpleTimer';
import AppFooter from './components/AppFooter';

export default {
  name: 'app',
  components: {
    AppBar,
    SimpleTimer,
    AppFooter,
  },
};
</script>
