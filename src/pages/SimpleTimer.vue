<template>
  <div>
    <ad />
    <container title="シンプルタイマー">
      <mu-card class="config-card">
        <config v-model="config" @soundenable="onSoundenable" />
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

      <audio muted ref="ticktack" src="../audio/ticktack.mp3"></audio>
      <audio muted ref="ended" src="../audio/ended.mp3"></audio>

      <footer-controller
        :start-disabled="config.invalid"
        v-bind="state"
        @stop="stop"
        @start="start"
        @resume="resume"
        @pause="pause" />

    </container>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Ad from './Ad';
import Container from '../components/Container';
import CountdownTimer from '../components/CountdownTimer';
import Config from '../components/Config';
import FooterController from '../components/FooterController';
import { canTicktack } from '../lib/util';

const genListener = fn => (e) => {
  if (e.key === ' ') { // スペースが入力された場合
    fn();
    e.preventDefault(); // イベントをキャンセル
  }
};

export default {
  name: 'simple-timer',
  components: {
    Container,
    Ad,
    Config,
    CountdownTimer,
    FooterController,
  },
  data() {
    const dafaultConfig = {
      duration: 10 * 1000,
      waitingDuration: 0,
      cuttedDuration: 0,
      loop: 0,
      infiniteLoop: false,
      invalid: false,
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
      // サウンド機能が有効で, 残り時間が指定時間以内,
      // かつ秒の桁が切り替わる時, 音を鳴らす
      if (
        duration <= this.state.soundDuration &&
        duration !== 0 &&
        canTicktack(duration, this.beforeDuration)
      ) {
        this.$refs.ticktack.play()
          .then(() => {
            console.log('fulfilled');
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.beforeDuration = duration;
    },
    soundEnded() {
      this.$refs.ended.play()
        .then(() => {
          console.log('fulfilled');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSoundenable(isSoundEnabled) {
      /*
       * 非同期APIを複数回経由するとユーザ操作を契機とするミュートの切り替えと
       * 判定されないので直接DOM APIを操作している.
       * @see https://github.com/RNGeek/emtimer/issues/8#issuecomment-351261926
       */
      this.$refs.ticktack.muted = !isSoundEnabled;
      this.$refs.ended.muted = !isSoundEnabled;
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
.timer {
  margin: 10px;
  font-size: 8vw;
  @media (min-width: 768px) {
    font-size: 60px;
  }
}

.output {
  margin-top: 30px;
}

.loop-view, .current-duration-view {
  margin-left: 10vw;
  margin-bottom: 5px;
}
</style>

<style>
body {
  margin-bottom: 56px;
}
</style>
