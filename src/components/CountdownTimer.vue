<template>
  <duration-view :value="duration" />
</template>

<script>
/* eslint-disable camelcase */
import DurationView from './DurationView';

const raf = window.requestAnimationFrame;

export default {
  name: 'countdown-timer',
  components: {
    DurationView,
  },
  data: function () {
    return {
      paused: true,
      ended: true,
      duration: 0,
    };
  },
  methods: {
    startRAFLoop() {
      const cb = (currentTime_ms, prevTime_ms) => {
        if (this.ended) {
          this.$emit('pause');
          this.$emit('ended');
        } else if (this.paused) {
          this.$emit('pause');
        } else { // if `this.paused` is `false`, this timer is started.
          this.updateDuration(this.duration - (currentTime_ms - prevTime_ms));
          raf(time_ms => cb(time_ms, currentTime_ms));
        }
      };
      const initialTime_ms = window.performance.now();
      raf(time_ms => cb(time_ms, initialTime_ms));
    },
    updateDuration(newDuration) {
      this.duration = Math.max(newDuration, 0);
      if (this.duration === 0) {
        if (this.paused && !this.ended) {
          this.paused = true;
          this.ended = true;
          this.$emit('ended');
        } else {
          this.paused = true;
          this.ended = true;
        }
      }
      this.$emit('durationupdate', this.duration);
    },
    start(duration = this.duration) {
      if (this.paused) {
        this.paused = false;
        this.ended = false;
        this.updateDuration(duration);
        this.startRAFLoop();
      } else {
        this.updateDuration(duration);
      }
      this.$emit('start');
    },
    stop() {
      this.updateDuration(0);
    },
    pause() {
      this.paused = true;
    },
  },
};
</script>

<style scoped>
</style>
