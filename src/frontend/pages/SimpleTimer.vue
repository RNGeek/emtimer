<template>
  <div>
    <ad />
    <container title="シンプルタイマー">
      <vue-snotify />

      <mu-card class="config-card">
        <config v-model="config" @soundenable="onSoundenable" />
      </mu-card>

      <div class="output">
        <loop-view class="loop-view" :loop="state.loop" :max-loop="configInUse.maxLoop" />
        <mode-view class="mode-view" :couting-timer-id="state.coutingTimerId" />
        <countdown-timer
          :counting="state.counting"
          :duration="state.duration"
          @ticktack="onTicktack"
          @countdownprogress="onCountdownprogress"
          @countdownend="onCountdownEnd"
        />
      </div>

      <footer-controller
        :start-disabled="config.invalid || state.counting"
        @stop="stop"
        @start="start"
      />
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
import LoopView from '../components/LoopView.vue'
import ModeView from '../components/ModeView.vue'
import SoundEffector from '../lib/sound-effector'
import 'vue-snotify'
import { INITIAL_CONFIG, INTIAL_STATE, appStateManager } from '../lib/memory'
import { v4 as uuidv4 } from 'uuid'

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
    LoopView,
    ModeView,
  },
  data () {
    return {
      config: { ...INITIAL_CONFIG }, // 初期設定をコピー
      configInUse: { ...INITIAL_CONFIG }, // 初期設定をコピー
      state: { ...INTIAL_STATE }, // 初期設定をコピー
      soundEffector: new SoundEffector(),
      keyupListener: genListener(() => {}),
      keydownListener: genListener(() => {}),
    }
  },
  computed: {
    isLastPhase (): boolean {
      return (this.state.coutingTimerId === 1) && (this.state.loop === this.configInUse.maxLoop)
    },
  },
  watch: {
    configInUse: {
      handler (newConfigInUse): void {
        appStateManager.updateState({
          // NOTE: Vue の data は getter を使って構成されているので、プロパティにアクセスするタイミングによって値が変わってしまう。
          // これでは集計上不都合なので、pure なオブジェクトに変換してから渡すようにしている。
          configInUse: JSON.parse(JSON.stringify(newConfigInUse)),
        })
      },
      deep: true,
    },
    state: {
      handler (newState): void {
        appStateManager.updateState({
          // NOTE: Vue の data は getter を使って構成されているので、プロパティにアクセスするタイミングによって値が変わってしまう。
          // これでは集計上不都合なので、pure なオブジェクトに変換してから渡すようにしている。
          state: JSON.parse(JSON.stringify(newState)),
        })
      },
      deep: true,
    },
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
      appStateManager.updateState({ countdownId: uuidv4() })
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
    onTicktack (now: number): void {
      if (now <= this.configInUse.soundDuration) {
        this.soundTicktack()
      }
    },
    onCountdownprogress (count): void {
      appStateManager.updateState({
        count,
      })
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
      this.soundEffector.muted = !isSoundEnabled
    },
    soundTicktack (): void {
      this.soundEffector.playTicktack().catch((e) => {
        console.error(e)
        this.$snotify.error('秒針の音の再生に失敗しました.', 'Error!')
      })
    },
    soundEnded (): void {
      this.soundEffector.playEnded().catch((e) => {
        console.error(e)
        this.$snotify.error('停止音の再生に失敗しました.', 'Error!')
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
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
