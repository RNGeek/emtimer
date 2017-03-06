<template>
  <span>
    {{ days | normalize }}日
    {{ hour | normalize }}時間
    {{ minutes | normalize }}分
    {{ seconds | normalize }}秒
    {{ ms | normalize }}
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
    remain() { return this.time - (this.now - this.start); },
    days() { return Math.trunc(this.remain / 1000 / 60 / 60 / 24); },
    hour() { return Math.trunc(this.remain / 1000 / 60 / 60) % 24; },
    minutes() { return Math.trunc(this.remain / 1000 / 60) % 60; },
    seconds() { return Math.trunc(this.remain / 1000) % 60; },
    ms() { return Math.trunc(this.remain) % 1000; },
  },
  mounted: function () {
    const cb = (timestamp) => {
      if (this.remain < 0) {
        console.log('canceled!');
        return;
      }
      this.now = timestamp;
      raf(cb);
    };
    raf(cb);
  },
  filters: {
    normalize(value) { return Math.max(value, 0); },
  },
};
</script>

<style scoped>
</style>
