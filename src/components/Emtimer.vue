<template>
  <div class="container" @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
    <h2 class="header">エメタイマー</h2>
    <mu-card class="config-card" :zDepth="1">
      <mu-card-title class="config-title" title="設定" />
      <mu-card-text>

        <label class="label">待機時間</label>
        <mu-row gutter>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input hintText="0" @input="value => mainDuration = value" />
          </mu-col>
        </mu-row>

        <label class="label">開始までの猶予</label>
        <mu-row gutter>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input hintText="0" @input="value => mainDuration = value" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            前からカウント開始
          </mu-col>
        </mu-row>

        <label class="label">切り上げ</label>
        <mu-row gutter>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input hintText="0" @input="value => mainDuration = value" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            早くカウント終了
          </mu-col>
        </mu-row>

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
import { card, cardTitle, cardText, cardActions } from 'muse-ui/src/card';
import { flexbox, flexboxItem } from 'muse-ui/src/flexbox';
import { row, col } from 'muse-ui/src/grid';
import flatButton from 'muse-ui/src/flatButton';
import CountdownTimer from './CountdownTimer';
import UnitSelect from './UnitSelect';
import DurationInput from './DurationInput';

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
    DurationInput,
    flatButton,
    flexbox,
    flexboxItem,
    row,
    col,
  },
  data() {
    return {
      paused: true,
      ended: true,
      mainDuration: 0,
    };
  },
  validations: {
    mainDuration: {
      notNaN(value) {
        return !Number.isNaN(value);
      },
    },
  },
  methods: {
    start() {
      if (this.$v.$invalid) return;

      this.$refs.timer.start(this.mainDuration);
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

.leftLabel {
  white-space: nowrap;
  min-width: 140px !important;
}

.label {
  display: inline-block;
  font-weight: bold;
  margin: 20px 0 0;

  &:first-child {
    margin: 0;
  }
}
</style>
