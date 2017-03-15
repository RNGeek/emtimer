<template>
  <div class="container" @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
    <h2 class="header">エメタイマー</h2>
    <mu-card class="config-card" :zDepth="1">
      <mu-card-title class="config-title" title="設定" />
      <mu-card-text>
        <mu-flexbox class="duration-group" align="flex-end">
          <mu-flexbox-item>
            <mu-text-field fullWidth v-model.number="durations.main.value" :errorText="getErrorText('main')" label="時間" hintText="10" />
          </mu-flexbox-item>
          <mu-flexbox-item>
            <unit-select class="unit-select" v-model="durations.main.unit" />
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button @click="stop()" label="停止" icon="stop" color="#e36209" />
        <mu-flat-button v-if="ended" @click="start()" :disabled="$v.$invalid" label="開始" icon="play_circle_outline" color="blue" />
        <mu-flat-button v-else-if="paused && !ended" @click="resume()" label="再開" icon="play_circle_outline" color="green" />
        <mu-flat-button v-else-if="!paused" @click="pause()" label="一時停止" icon="pause_circle_outline" color="gray" />
      </mu-card-actions>
    </mu-card>

    <countdown-timer class="timer" ref="timer" @start="updateState()" @pause="updateState()" @ended="updateState()" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import { card, cardTitle, cardText, cardActions } from 'muse-ui/src/card';
import { flexbox, flexboxItem } from 'muse-ui/src/flexbox';
import textField from 'muse-ui/src/textField';
import flatButton from 'muse-ui/src/flatButton';
import CountdownTimer from './CountdownTimer';
import UnitSelect from './UnitSelect';
import { parseDuration } from '../lib/math';

export default {
  name: 'emtimer',
  mixins: [validationMixin],
  components: {
    CountdownTimer,
    UnitSelect,
    card,
    cardTitle,
    cardText,
    cardActions,
    flexbox,
    flexboxItem,
    textField,
    flatButton,
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
    getErrorText(durationName) {
      const valid = this.$v.durations[durationName];
      let text = '';
      if (!valid.value.required) {
        text += '時間は必須です. ';
      }
      if (!valid.value.between) {
        text += '時間は 0 以上 10,000,000,000 以下の数値でなければなりません. ';
      }
      return text;
    },
  },
  deactivated() {
    this.pause();
  },
};
</script>

<style scoped>

/**
 * --- start ---
 * The MIT License (MIT)
 * Copyright (c) 2011-2017 Twitter, Inc.
 * Copyright (c) 2011-2017 The Bootstrap Authors
 * https://github.com/twbs/bootstrap/blob/v4-dev/LICENSE
 */
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    width: 750px;
  }
}
/* --- end --- */

.header {
  border-bottom: 1px solid #eee;
}

.timer {
  margin: 30px;
  font-size: 8vw;
  @media (min-width: 768px) {
    font-size: 60px;
  }
}
</style>
