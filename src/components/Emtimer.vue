<template>
  <div @keyup.space.prevent="start" @keydown.space.prevent="stop">
    <div><input v-model.number="inputDuration_s" /></div>
    <div>
      <button v-if="!started" @click="start">開始</button>
      <button v-else @click="stop">停止</button>
    </div>
    <time-view :value="remainingDuration_ms" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import TimeView from './TimeView';

const raf = window.requestAnimationFrame;

export default {
  name: 'emtimer',
  components: {
    TimeView,
  },
  data() {
    return {
      startTime_ms: 0,
      nowTime_ms: 0,
      duration_ms: 0,
      started: false,
      inputDuration_s: 10,
    };
  },
  computed: {
    remainingDuration_ms() { return Math.max(this.duration_ms - (this.nowTime_ms - this.startTime_ms), 0); },
  },
  methods: {
    start() {
      const initProps = () => {
        this.startTime_ms = window.performance.now();
        this.nowTime_ms = this.startTime_ms;
        this.duration_ms = this.inputDuration_s * 1000;
        this.started = true;
      };
      const startRAF = () => {
        const cb = (timestamp_ms) => {
          if (this.remainingDuration_ms === 0 || !this.started) {
            this.started = false;
            return;
          }
          this.nowTime_ms = timestamp_ms;
          raf(cb);
        };
        raf(cb);
      };

      if (this.started) {
        initProps();
      } else {
        initProps();
        startRAF();
      }
    },
    stop() {
      this.duration_ms = 0; // Clear props
    },
  },
};
</script>

<style scoped>
</style>
