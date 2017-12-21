<template>
  <div>
    <big-duration-view :value="duration" />
    <duration-view :value="duration" />
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

const raf = window.requestAnimationFrame

export default Vue.extend({
  name: 'CountdownTimer',
  components: {
    DurationView,
    BigDurationView,
  },
  data: function () {
    return {
      paused: true,
      ended: true,
      duration: 0,
    }
  },
  methods: {
    startRAFLoop (): void {
      const cb = (currentTime_ms, prevTime_ms) => {
        if (this.ended) {
          this.$emit('pause')
          this.$emit('ended')
        } else if (this.paused) {
          this.$emit('pause')
        } else { // if `this.paused` is `false`, this timer is started.
          this.updateDuration(this.duration - (currentTime_ms - prevTime_ms))
          raf(time_ms => cb(time_ms, currentTime_ms))
        }
      }
      const initialTime_ms = window.performance.now()
      raf(time_ms => cb(time_ms, initialTime_ms))
    },
    updateDuration (newDuration): void {
      this.duration = Math.max(newDuration, 0)
      if (this.duration === 0) {
        if (this.paused && !this.ended) {
          this.paused = true
          this.ended = true
          this.$emit('ended')
        } else {
          this.paused = true
          this.ended = true
        }
      }
      this.$emit('durationupdate', this.duration)
    },
    start (duration?: number): void {
      if (duration === undefined) duration = this.duration
      if (this.paused) {
        this.paused = false
        this.ended = false
        this.updateDuration(duration)
        this.startRAFLoop()
      } else {
        this.updateDuration(duration)
      }
      this.$emit('start')
    },
    stop (): void {
      this.updateDuration(0)
    },
    pause (): void {
      this.paused = true
    },
  },
})
</script>

<style scoped>
</style>
