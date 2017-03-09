<template>
  <div @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
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
      <button @click="stop()">停止</button>
      <button v-show="ended" @click="start()" :disabled="$v.$invalid">開始</button>
      <button v-show="paused && !ended" @click="resume()">再開</button>
      <button v-show="!paused" @click="pause()">一時停止</button>
    </div>
    <countdown-timer ref="timer" @start="updateState()" @pause="updateState()" @ended="updateState()" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import CountdownTimer from './CountdownTimer';

export default {
  name: 'emtimer',
  mixins: [validationMixin],
  components: {
    CountdownTimer,
  },
  data() {
    return {
      paused: true,
      ended: true,
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
    start() {
      if (this.$v.$invalid) return;

      const duration_ms = (this.inputDurationUnit === 's')
        ? (this.inputDuration * 1000)
        : ((this.inputDuration / 60) * 1000);
      this.$refs.timer.start(duration_ms);
    },
    stop() {
      this.$refs.timer.stop();
    },
    resume() {
      this.$refs.timer.start();
    },
    pause() {
      this.$refs.timer.pause();
    },
    updateState() {
      this.paused = this.$refs.timer.paused;
      this.ended = this.$refs.timer.ended;
    },
  },
  deactivated() {
    this.pause();
  },
};
</script>

<style scoped>
</style>
