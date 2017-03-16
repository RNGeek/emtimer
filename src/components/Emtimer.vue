<template>
  <div class="container" @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
    <h2 class="header">エメタイマー</h2>
    <mu-card class="config-card">
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
            <duration-input hintText="0" @input="value => delayDuration = value" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            前からカウント開始
          </mu-col>
        </mu-row>

        <label class="label">切り上げ</label>
        <mu-row gutter>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input hintText="0" @input="value => durationToCutShort = value" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            早くカウント終了
          </mu-col>
        </mu-row>

        <label class="label">ループ回数</label>
        <mu-row gutter>
          <mu-col width="100" tablet="50" desktop="50">
            <mu-text-field
              v-model.number="loopCount"
              fullWidth
              :errorText="$v.loopCount.$invalid ? '不正な値です.' : ''"
            />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            回ループする
          </mu-col>
        </mu-row>

      </mu-card-text>
      <mu-card-actions>
        <mu-raised-button @click="stop()" label="停止" icon="stop" backgroundColor="#f57c00" />
        <mu-raised-button v-if="ended" @click="start()" :disabled="$v.$invalid" label="開始" icon="play_circle_outline" backgroundColor="#42a5f5" />
        <mu-raised-button v-else-if="paused && !ended" @click="resume()" label="再開" icon="play_circle_outline" backgroundColor="#66bb6a" />
        <mu-raised-button v-else-if="!paused" @click="pause()" label="一時停止" icon="pause_circle_outline" backgroundColor="#90a4ae" />
      </mu-card-actions>
    </mu-card>

    <div class="output">
      <div class="loop-view">ループ回数: {{ loopCounter }} / {{ loopCount }}</div>
      <div class="current-duration-view">
        <span v-if="currentDuration === 'delay'">開始まで</span>
        <span v-else>終了まで</span>
      </div>
      <countdown-timer class="timer" ref="timer" @ended="onended()" />
    </div>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import { card, cardTitle, cardText, cardActions } from 'muse-ui/src/card';
import { flexbox, flexboxItem } from 'muse-ui/src/flexbox';
import { row, col } from 'muse-ui/src/grid';
import raisedButton from 'muse-ui/src/raisedButton';
import CountdownTimer from './CountdownTimer';
import UnitSelect from './UnitSelect';
import DurationInput from './DurationInput';

const notNaN = value => !Number.isNaN(value);

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
    raisedButton,
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
      delayDuration: 0,
      durationToCutShort: 0,
      currentDuration: 'delay',
      loopCount: 0,
      loopCounter: 0,
    };
  },
  validations: {
    mainDuration: {
      notNaN,
    },
    delayDuration: {
      notNaN,
    },
    durationToCutShort: {
      notNaN,
    },
    loopCount: {
      required,
      between: between(0, 10000000000),
    },
  },
  methods: {
    start() {
      if (this.$v.$invalid) return;

      this.loopCounter = 0;
      this.currentDuration = 'delay';
      this.$refs.timer.start(this.delayDuration);
      this.updateState();
    },
    stop() {
      this.loopCounter = this.loopCount;
      this.currentDuration = 'main';
      this.$refs.timer.stop();
      this.updateState();
    },
    resume() {
      this.$refs.timer.start();
      this.updateState();
    },
    pause() {
      this.$refs.timer.pause();
      this.updateState();
    },
    updateState() {
      this.paused = this.$refs.timer.paused;
      this.ended = this.$refs.timer.ended;
    },
    onended() {
      this.updateState();
      if (this.currentDuration === 'delay') {
        this.currentDuration = 'main';
        this.$refs.timer.start(this.mainDuration - this.durationToCutShort);
        this.updateState();
      } else if (this.loopCounter < this.loopCount) {
        this.loopCounter = this.loopCounter + 1;
        this.currentDuration = 'delay';
        this.$refs.timer.start(this.delayDuration);
        this.updateState();
      }
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
  margin: 10px;
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

.mu-raised-button.disabled {
    color: rgba(0, 0, 0, 0.3) !important;
    cursor: not-allowed;
    background-color: #e6e6e6 !important;
    box-shadow: none;
}

.output {
  margin-top: 30px;
}

.loop-view, .current-duration-view {
  margin-left: 10vw;
  margin-bottom: 5px;
}
</style>
