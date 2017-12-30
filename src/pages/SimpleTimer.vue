<template>
  <div>
    <ad />
    <container title="シンプルタイマー">
      <vue-snotify/>

      <mu-card class="config-card">
        <config v-model="config" @soundenable="onSoundenable" />
      </mu-card>

      <!-- TODO: SoundPlayerクラスをつくる -->
      <audio muted ref="ticktack" src="../audio/ticktack.mp3"/>
      <audio muted ref="ended" src="../audio/ended.mp3"/>

      <div class="output">
        <loop-view class="loop-view" :loop="state.loop" :max-loop="configInUse.maxLoop" />
        <mode-view class="mode-view" :couting-timer-id="state.coutingTimerId" />
        <countdown-timer
          :counting="state.counting"
          :duration="state.duration"
          @ticktack="onTicktack"
          @countdownend="onCountdownEnd"
        />
      </div>

      <footer-controller
        :start-disabled="config.invalid || state.counting"
        @stop="stop"
        @start="start" />

    </container>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import Vue from 'vue'
import Ad from '../components/Ad.vue'
import Container from '../components/Container.vue'
import CountdownTimer from '../components/CountdownTimer.vue'
import Config from '../components/Config.vue'
import FooterController from '../components/FooterController.vue'
import DurationView from '../components/DurationView.vue'
import LoopView from '../components/LoopView.vue'
import ModeView from '../components/ModeView.vue'
import 'vue-snotify'

const genListener = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === ' ') { // スペースが入力された場合
    fn()
    e.preventDefault() // イベントをキャンセル
  }
}

export default Vue.extend({
  name: 'SimpleTimer',
  components: {
    Container,
    Ad,
    Config,
    CountdownTimer,
    FooterController,
    DurationView,
    LoopView,
    ModeView,
  },
  data () {
    const defaultConfig = {
      duration: 10 * 1000,
      waitingDuration: 0,
      cuttedDuration: 0,
      maxLoop: 0,
      infiniteLoop: false,
      invalid: false,
      soundDuration: 10 * 1000,
    }
    return {
      config: {...defaultConfig}, // 初期設定をコピー
      configInUse: {...defaultConfig}, // 初期設定をコピー
      state: {
        duration: 0,
        coutingTimerId: 1,
        counting: false,
        loop: 0,
      },
      keyupListener: genListener(() => {}),
      keydownListener: genListener(() => {}),
    }
  },
  mounted () {
    // add event listener
    this.keyupListener = genListener(this.start)
    this.keydownListener = genListener(this.stop)
    document.addEventListener('keyup', this.keyupListener)
    document.addEventListener('keydown', this.keydownListener)
  },
  destroyed () {
    // remove event listener
    this.stop()
    document.removeEventListener('keyup', this.keyupListener)
    document.removeEventListener('keydown', this.keydownListener)
  },
  computed: {
    isLastPhase (): boolean {
      return (this.state.coutingTimerId === 1) && (this.state.loop === this.configInUse.maxLoop)
    },
  },
  methods: {
    // Events from footer-controller
    start (): void {
      if (this.config.invalid) {
        this.$snotify.error('正しい設定を入力して下さい.', 'Error!')
        return
      }
      this.configInUse = this.config
      this.state.counting = true
      this.state.loop = 0
      this.initForTimer0()
    },
    stop (): void {
      this.state.counting = false
    },
    initForTimer0 (): void {
      this.state.coutingTimerId = 0
      this.state.duration = this.configInUse.waitingDuration
    },
    initForTimer1 (): void {
      this.state.coutingTimerId = 1
      this.state.duration = this.configInUse.duration - this.configInUse.cuttedDuration
    },

    // Events from timer
    onTicktack (): void {
      this.soundTicktack()
    },
    onCountdownEnd (): void {
      this.state.counting = false

      if (this.isLastPhase) {
        this.soundEnded()
        return
      }

      if (this.state.coutingTimerId === 0) {
        this.initForTimer1()
      } else {
        this.soundEnded()
        this.state.loop++
        this.initForTimer0()
      }

      Vue.nextTick(() => { this.state.counting = true })
    },

    // Sound
    onSoundenable (isSoundEnabled: boolean) {
      /*
       * 非同期APIを複数回経由するとユーザ操作を契機とするミュートの切り替えと
       * 判定されないので直接DOM APIを操作している.
       * @see https://github.com/RNGeek/emtimer/issues/8#issuecomment-351261926
       */
      (this.$refs.ticktack as HTMLMediaElement).muted = !isSoundEnabled;
      (this.$refs.ended as HTMLMediaElement).muted = !isSoundEnabled
    },
    soundTicktack (): void {
      (this.$refs.ticktack as HTMLMediaElement).play().catch(() => {
        this.$snotify.error('秒針の音の再生に失敗しました.', 'Error!')
      })
    },
    soundEnded (): void {
      (this.$refs.ended as HTMLMediaElement).play().catch(() => {
        this.$snotify.error('停止音の再生に失敗しました.', 'Error!')
      })
    },
  },
})
</script>

<style scoped>
body {
  margin-bottom: 56px;
}

.output {
  margin-top: 30px;
}

.loop-view, .mode-view {
  margin-left: 10vw;
  margin-bottom: 5px;
}
</style>
