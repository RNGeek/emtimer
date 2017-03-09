<template>
  <div @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
    <div>
      時間:
      <input v-model.number="durations.main.value" />
      <unit-select v-model="durations.main.unit" />
      <div v-show="!$v.durations.main.value.required">時間は必須です</div>
      <div v-show="!$v.durations.main.value.between">
        時間は 0 から 10,000,000,000 の範囲でなければなりません
      </div>
    </div>
    <div>
      <mu-raised-button @click="stop()" label="停止" />
      <mu-raised-button v-show="ended" @click="start()" :disabled="$v.$invalid" label="開始" />
      <mu-raised-button v-show="paused && !ended" @click="resume()" label="再開" />
      <mu-raised-button v-show="!paused" @click="pause()" label="一時停止" />
    </div>
    <countdown-timer ref="timer" @start="updateState()" @pause="updateState()" @ended="updateState()" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import raisedButton from 'muse-ui/src/raisedButton';
import CountdownTimer from './CountdownTimer';
import UnitSelect from './UnitSelect';
import { parseDuration } from '../lib/math';

export default {
  name: 'emtimer',
  mixins: [validationMixin],
  components: {
    CountdownTimer,
    UnitSelect,
    raisedButton,
  },
  data() {
    return {
      paused: true,
      ended: true,
      durations: {
        main: { value: 10, unit: 's' },
      },
    };
  },
  validations: {
    durations: {
      main: {
        value: {
          required,
          between: between(0, 10000000000),
        },
      },
    },
  },
  methods: {
    start() {
      if (this.$v.$invalid) return;

      const { value, unit } = this.durations.main;
      const duration_ms = parseDuration(value, unit);
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
