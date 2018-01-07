<template>
  <div>
    <vue-countdown
      v-if="counting"
      :time="duration"
      :interval="20"
      @countdownprogress="onCountdownProgress"
      @countdownend="onCountdownEnd"
    >
      <template slot-scope="props">
        <big-duration-view :value="props.count" />
        <duration-view class="timer" :value="props.count" />
      </template>
    </vue-countdown>
    <span v-else>
      <big-duration-view :value="0" />
      <duration-view class="timer" :value="0" />
    </span>
  </div>
</template>

<script lang="ts">
/**
 * カウントダウンタイマー.
 * start/stop/pauseメソッドで操作する.
 */

/* eslint-disable camelcase */
import Vue from 'vue'
import DurationView from './DurationView.vue'
import BigDurationView from './BigDurationView.vue'
import VueCountdown from '@xkeshi/vue-countdown'

const canTicktack = (newSeconds: number, oldSeconds: number) => {
  return Math.floor(newSeconds) !== Math.floor(oldSeconds)
}

type Data = { // eslint-disable-line no-unused-vars
  days: number, // eslint-disable-line no-undef
  hours: number, // eslint-disable-line no-undef
  minutes: number, // eslint-disable-line no-undef
  seconds: number, // eslint-disable-line no-undef
  count: number, // eslint-disable-line no-undef
}

export default Vue.extend({
  name: 'CountdownTimer',
  components: {
    DurationView,
    BigDurationView,
    VueCountdown,
  },
  props: {
    counting: { type: Boolean, required: true },
    duration: { type: Number, required: true },
  },
  data () {
    return { seconds: 0 }
  },
  methods: {
    onCountdownProgress (data: Data): void {
      this.$emit('countdownprogress', data.count)
      if (canTicktack(data.seconds, this.seconds)) this.$emit('ticktack', data.count)
      this.seconds = data.seconds
    },
    onCountdownEnd (): void {
      this.$emit('countdownend')
    },
  },
})
</script>

<style scoped>
.timer {
  margin: 10px;
  font-size: 8vw;
  @media (min-width: 768px) {
    font-size: 60px;
  }
}
</style>
