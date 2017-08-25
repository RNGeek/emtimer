<template>
  <div class="container" @keyup.space.prevent="start()" @keydown.space.prevent="stop()">
    <h2 class="header">エメタイマー</h2>
    <mu-card class="config-card">
      <config v-model="config" />

      <mu-card-actions>
        <mu-raised-button @click="stop()" label="停止" icon="stop" backgroundColor="#f57c00" />
        <mu-raised-button v-if="state.ended" @click="start()" :disabled="config.invalid" label="開始" icon="play_circle_outline" backgroundColor="#42a5f5" />
        <mu-raised-button v-else-if="state.paused && !state.ended" @click="resume()" label="再開" icon="play_circle_outline" backgroundColor="#66bb6a" />
        <mu-raised-button v-else-if="!state.paused" @click="pause()" label="一時停止" icon="pause_circle_outline" backgroundColor="#90a4ae" />
      </mu-card-actions>
    </mu-card>

    <div class="output">

      <div class="loop-view">
        ループ回数:
        <template v-if="state.infiniteLoop">{{ state.loopCounter }} / ∞</template>
        <template v-else>{{ state.loopCounter }} / {{ state.loopCount }}</template>
        </div>

      <div class="current-duration-view">
        <span v-if="state.currentDuration === 'delay'">開始まで</span>
        <span v-else>終了まで</span>
      </div>
      <countdown-timer class="timer" ref="timer" @ended="onended()" />
    </div>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import { card, cardActions } from 'muse-ui/src/card';
import raisedButton from 'muse-ui/src/raisedButton';
import CountdownTimer from './CountdownTimer';
import Config from './Config';

export default {
  name: 'emtimer',
  components: {
    Config,
    CountdownTimer,
    card,
    cardActions,
    raisedButton,
  },
  data() {
    const dafaultConfig = {
      mainDuration: 0,
      delayDuration: 0,
      durationToCutShort: 0,
      loopCount: 0,
      infiniteLoop: false,
      invalid: false,
    };
    return {
      config: dafaultConfig,
      state: {
        ...dafaultConfig,
        paused: true,
        ended: true,
        currentDuration: 'delay',
        loopCounter: 0,
      },
    };
  },
  methods: {
    start() {
      if (this.config.invalid) return;
      this.state = {
        ...this.config,
        loopCounter: 0,
        currentDuration: 'delay',
      };
      this.$refs.timer.start(this.state.delayDuration);
      this.updateState();
    },
    stop() {
      this.state.loopCounter = this.state.loopCount;
      this.state.infiniteLoop = false;
      this.state.currentDuration = 'main';
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
      this.state = {
        ...this.state,
        paused: this.$refs.timer.paused,
        ended: this.$refs.timer.ended,
      };
    },
    onended() {
      this.updateState();
      if (this.state.currentDuration === 'delay') {
        this.state.currentDuration = 'main';
        this.$refs.timer.start(this.state.mainDuration - this.state.durationToCutShort);
        this.updateState();
      } else if (this.state.infiniteLoop || this.state.loopCounter < this.state.loopCount) {
        this.state.loopCounter = this.state.loopCounter + 1;
        this.state.currentDuration = 'delay';
        this.$refs.timer.start(this.state.delayDuration);
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
