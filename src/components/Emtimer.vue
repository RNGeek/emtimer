<template>
  <div class="container">
    <h2 class="header">エメタイマー</h2>
    <mu-card class="config-card">
      <config v-model="config" />

      <audio ref="ticktack" src="../audio/ticktack.mp3"></audio>
      <audio ref="ended" src="../audio/ended.mp3"></audio>

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
        <template v-else>{{ state.loopCounter }} / {{ state.loop }}</template>
        </div>

      <div class="current-duration-view">
        <span v-if="state.mode === 'waiting'">開始まで</span>
        <span v-else>終了まで</span>
      </div>
      <countdown-timer
        class="timer"
        ref="timer"
        @ended="onended()"
        @durationupdate="soundTicktack" />
    </div>

  </div>
</template>

<script>
/* eslint-disable camelcase */
import { card, cardActions } from 'muse-ui/src/card';
import raisedButton from 'muse-ui/src/raisedButton';
import CountdownTimer from './CountdownTimer';
import Config from './Config';

const genListener = fn => (e) => {
  if (e.key === ' ') { // スペースが入力された場合
    fn();
    e.preventDefault(); // イベントをキャンセル
  }
};

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
      duration: 10 * 1000,
      waitingDuration: 0,
      cuttedDuration: 0,
      loop: 0,
      infiniteLoop: false,
      invalid: false,
      sound: false,
      soundDuration: 10 * 1000,
    };
    return {
      config: dafaultConfig,
      state: {
        ...dafaultConfig,
        paused: true,
        ended: true,
        mode: 'waiting',
        loopCounter: 0,
        beforeDuration: 0,
      },
      keyupListener: genListener(this.start),
      keydownListener: genListener(this.stop),
    };
  },
  methods: {
    start() {
      if (this.config.invalid) return;
      this.state = {
        ...this.config,
        loopCounter: 0,
        mode: 'waiting',
      };
      this.$refs.timer.start(this.state.waitingDuration);
      this.updateState();
    },
    stop() {
      this.state.loopCounter = this.state.loop;
      this.state.infiniteLoop = false;
      this.state.mode = 'main';
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
      if (this.state.mode === 'waiting') {
        this.state.mode = 'main';
        this.$refs.timer.start(this.state.duration - this.state.cuttedDuration);
        this.updateState();
      } else {
        if (this.state.infiniteLoop || this.state.loopCounter < this.state.loop) {
          this.state.loopCounter = this.state.loopCounter + 1;
          this.state.mode = 'waiting';
          this.$refs.timer.start(this.state.waitingDuration);
          this.updateState();
        }
        this.soundEnded();
      }
    },
    soundTicktack(duration) {
      if (this.state.sound && duration <= this.state.soundDuration) {
        // サウンド機能が有効かつ残り時間が指定時間以内の場合, 音を鳴らす
        const duration_s = Math.floor(duration / 1000);
        const beforeDuration_s = Math.floor(this.beforeDuration / 1000);

        // タイムスタンプの秒の桁が以前のものから変わっていれば音を鳴らす
        if (duration_s !== beforeDuration_s) this.$refs.ticktack.play();
      }
      this.beforeDuration = duration;
    },
    soundEnded() {
      // サウンド機能が有効なら音を鳴らす
      if (this.state.sound) this.$refs.ended.play();
    },
  },
  deactivated() {
    this.pause();
  },
  mounted() {
    // add event listener
    document.addEventListener('keyup', this.keyupListener);
    document.addEventListener('keydown', this.keydownListener);
  },
  destroyed() {
    // remote event listener
    document.removeEventListener('keyup', this.keyupListener);
    document.removeEventListener('keydown', this.keydownListener);
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
