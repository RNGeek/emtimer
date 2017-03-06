<template>
  <span>
    {{ days }}日
    {{ hour | pad }}時間
    {{ minutes | pad }}分
    {{ seconds | pad }}秒
    {{ cs | pad }}
  </span>
</template>

<script>
const raf = window.requestAnimationFrame;

export default {
  name: 'timer',
  data() {
    return {
      start: window.performance.now(),
      now: 0,
      time: 10 * 1000,
    };
  },
  computed: {
    remain() { return Math.max(this.time - (this.now - this.start), 0); },
    days() { return Math.trunc(this.remain / 1000 / 60 / 60 / 24); },
    hour() { return Math.trunc(this.remain / 1000 / 60 / 60) % 24; },
    minutes() { return Math.trunc(this.remain / 1000 / 60) % 60; },
    seconds() { return Math.trunc(this.remain / 1000) % 60; },
    cs() { return Math.trunc(this.remain / 10) % 100; },
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
  filters: {
    pad(value) {
      return value.toString().padStart(2, '0');
    },
  },
};
</script>

<style scoped>
</style>
