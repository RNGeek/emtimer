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
        <big-duration-view :value="parseDataToMs(props)" />
        <duration-view class="timer" :value="parseDataToMs(props)" />
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
    onCountdownProgress (data: any): void {
      this.$emit('countdownprogress', data)
      if (canTicktack(data.seconds, this.seconds)) this.$emit('ticktack')
      this.seconds = data.seconds
    },
    onCountdownEnd (): void {
      this.$emit('countdownend')
    },
    parseDataToMs (data: any): number {
      const MILLISECONDS_SECOND = 1000
      const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
      const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
      const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR
      return data.days * MILLISECONDS_DAY +
        data.hours * MILLISECONDS_HOUR +
        data.minutes * MILLISECONDS_MINUTE +
        data.seconds * MILLISECONDS_SECOND
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
