<template>
  <div @keyup.space.prevent="start" @keydown.space.prevent="stop">
    <div>
      時間:
      <input
        v-model.number="inputDuration"
      />
      <select v-model="inputDurationUnit">
        <option value="s">秒</option>
        <option value="f">フレーム</option>
      </select>
      <div v-show="!$v.inputDuration.required">時間は必須です</div>
      <div v-show="!$v.inputDuration.between">
        時間は 0 から 10,000,000,000 の範囲でなければなりません
      </div>
    </div>
    <div>
      <button @click="stop">停止</button>
      <button v-show="state === 'stopped'" @click="start" :disabled="$v.$invalid">開始</button>
      <button v-show="state === 'paused'" @click="resume">再開</button>
      <button v-show="state === 'started'" @click="pause">一時停止</button>
    </div>
    <duration-view :value="remainingDuration_ms" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import DurationView from './DurationView';

const raf = window.requestAnimationFrame;

export default {
  name: 'emtimer',
  mixins: [validationMixin],
  components: {
    DurationView,
  },
  data() {
    return {
      duration_ms: 0,
      remainingDuration_ms: 0,
      state: 'stopped',
      inputDuration: 10,
      inputDurationUnit: 's',
    };
  },
  validations: {
    inputDuration: {
      required,
      between: between(0, 10000000000),
    },
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
      } else if (this.$v.$invalid) {
        return;
      }
      this.duration_ms = (this.inputDurationUnit === 's')
        ? (this.inputDuration * 1000)
        : ((this.inputDuration / 60) * 1000);
      this.remainingDuration_ms = this.duration_ms;
      this.startRAFLoop();
    },
    stop() {
      this.duration_ms = 0;
      this.remainingDuration_ms = 0;
      this.stopRAFLoop();
    },
    resume() {
      if (this.state !== 'paused') {
        throw new Error('The state of timer must be paused to resume.');
      }
      this.startRAFLoop();
    },
    pause() {
      if (this.state !== 'started') {
        throw new Error('The state of timer must be started to resume.');
      }
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
