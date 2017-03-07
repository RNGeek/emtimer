<template>
  <div @keyup.space.prevent="start" @keydown.space.prevent="stop">
    <div><input v-model.number="inputDuration_s" /></div>
    <div>
      <button v-if="!started" @click="start">開始</button>
      <button v-else @click="stop">停止</button>
      <button @click="resume">再開</button>
      <button @click="pause">一時停止</button>
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
      remainingDuration_ms: 0,
      started: false,
      inputDuration_s: 10,
    };
  },
  methods: {
    startRAFLoop() {
      const cb = (newTimestamp_ms, oldTimestamp_ms) => {
        if (this.remainingDuration_ms === 0 || !this.started) {
          this.started = false;
          return;
        }
        this.remainingDuration_ms = Math.max(this.remainingDuration_ms - (newTimestamp_ms - oldTimestamp_ms), 0);
        raf(timestamp_ms => cb(timestamp_ms, newTimestamp_ms));
      };
      this.started = true;
      raf(timestamp_ms => cb(timestamp_ms, window.performance.now()));
    },
    stopRADLoop() {
      this.started = false;
    },
    start() {
      // 既に RAF loop が起動している場合は RAF loop を停止せずにパラメータのみを変更する
      if (this.started) {
        this.duration_ms = this.inputDuration_s * 1000;
        this.remainingDuration_ms = this.duration_ms;
      } else {
        this.duration_ms = this.inputDuration_s * 1000;
        this.remainingDuration_ms = this.duration_ms;
        this.startRAFLoop();
      }
    },
    stop() {
      this.duration_ms = 0;
      this.remainingDuration_ms = 0;
      this.stopRADLoop();
    },
    resume() {
      this.startRAFLoop();
    },
    pause() {
      this.stopRADLoop();
    },
  },
  deactivated() {
    this.stop();
  },
};
</script>

<style scoped>
</style>
