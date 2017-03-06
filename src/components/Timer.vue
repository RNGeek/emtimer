<template>
  <time-view :value="remain" />
</template>

<script>
import TimeView from './TimeView';

const raf = window.requestAnimationFrame;

export default {
  name: 'timer',
  components: {
    TimeView,
  },
  data() {
    return {
      start: window.performance.now(),
      now: 0,
      time: 10 * 1000,
    };
  },
  computed: {
    remain() { return Math.max(this.time - (this.now - this.start), 0); },
  },
  mounted: function () {
    const cb = (timestamp) => {
      if (this.remain === 0) {
        console.log('canceled!');
        return;
      }
      this.now = timestamp;
      raf(cb);
    };
    raf(cb);
  },
};
</script>

<style scoped>
</style>
