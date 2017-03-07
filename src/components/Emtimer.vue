<template>
  <div @keyup.space.prevent="start" @keydown.space.prevent="stop">
    <div>フレーム: <input v-model.number="inputDuration_f" @input="inputDuration_s = inputDuration_f / 60" /></div>
    <div>時間: <input v-model.number="inputDuration_s" @input="inputDuration_f = inputDuration_s * 60" /></div>
    <div>
      <button @click="stop">停止</button>
      <button v-show="state === 'stopped'" @click="start">開始</button>
      <button v-show="state === 'paused'" @click="resume">再開</button>
      <button v-show="state === 'started'" @click="pause">一時停止</button>
    </div>
    <duration-view :value="remainingDuration_ms" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import DurationView from './DurationView';

const raf = window.requestAnimationFrame;

export default {
  name: 'emtimer',
  components: {
    DurationView,
  },
  data() {
    return {
      remainingDuration_ms: 0,
      state: 'stopped',
      inputDuration_s: 10,
      inputDuration_f: 600,
    };
  },
  methods: {
    startRAFLoop() {
      const cb = (newTimestamp_ms, oldTimestamp_ms) => {
        if (this.remainingDuration_ms === 0) {
          this.stop();
        } else if (this.state !== 'started') {
          // Nothing
        } else { // this.state === 'started'
          this.remainingDuration_ms = Math.max(this.remainingDuration_ms - (newTimestamp_ms - oldTimestamp_ms), 0);
          raf(timestamp_ms => cb(timestamp_ms, newTimestamp_ms));
        }
      };
      this.state = 'started';
      raf(timestamp_ms => cb(timestamp_ms, window.performance.now()));
    },
    stopRAFLoop() {
      this.state = 'stopped';
    },
    pauseRAFLoop() {
      this.state = 'paused';
    },
    start() {
      if (this.state !== 'stopped') {
        throw new Error('The state of timer must be stopped to start.');
      }
      this.duration_ms = this.inputDuration_s * 1000;
      this.remainingDuration_ms = this.duration_ms;
      this.startRAFLoop();
    },
    stop() {
      this.duration_ms = 0;
      this.remainingDuration_ms = 0;
      this.stopRAFLoop();
    },
    resume() {
      if (this.state !== 'paused') throw new Error('The state of timer must be paused to resume.');
      this.startRAFLoop();
    },
    pause() {
      if (this.state !== 'started') throw new Error('The state of timer must be started to resume.');
      this.pauseRAFLoop();
    },
  },
  deactivated() {
    this.pause();
  },
};
</script>

<style scoped>
</style>
