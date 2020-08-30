<template>
  <div
    class="view"
    :style="{ background: bgColor, transitionDuration: duration }"
  >
    <div class="line" />
    <div
      class="circle"
      :style="{ right: right }"
    />
  </div>
</template>

<script lang="ts">
/**
 * 赤丸の位置で秒以下の桁を表わす.
 * 秒の桁が変わる瞬間に赤丸が中央を通過し, 通過する際にハイライトする.
 */

/* eslint-disable camelcase */
import Vue from 'vue'
import DurationView from './DurationView.vue'
import { canTicktack } from '../lib/util'

export default Vue.extend({
  name: 'BigDurationView',
  extends: DurationView,
  props: {
    value: { type: Number, required: true },
  },
  data () {
    return {
      beforeDuration: 0,
      bgColor: 'transparent',
      duration: '0ms',
    }
  },
  computed: {
    right (): string {
      const cs = ((this.value / 10) % 100) // centi seconds
      return `${(((cs + 37.5) * 2) % 200) - 25}%`
    },
  },
  watch: {
    value (): void {
      // 秒の桁が切り替わる時, ハイライトする
      if (canTicktack(this.value, this.beforeDuration)) {
        this.bgColor = '#ffff00'
        this.duration = '0ms' // CSS Transitionを無効化

        // 本来はVue#$nextTickを使うべきだが, 上手く動かないのでsetTimeoutで代用
        setTimeout(() => {
          // ハイライトしたらCSS Transitionを有効化しつつすぐに元の状態に戻す
          this.bgColor = 'transparent'
          this.duration = '500ms' // CSS Transitionを有効化
        }, 0)
      }
      this.beforeDuration = this.value
    },
  },
})
</script>

<style lang="postcss" scoped>
:root {
  --circle-size: 50px;
}

.view {
  width: 100%;
  position: relative;
  height: calc(var(--circle-size) * 2);
  overflow-x: hidden;
  transition: all 0ms 0ms ease;
  box-sizing: content-box;
  border: 1px #ddd solid;
  border-radius: 3px;
}

.line {
  width: 50%;
  height: calc(var(--circle-size) * 2);
  border-right: 1px #888 solid;
  position: absolute;
  top: 0;
  left: 0;
}

.circle {
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50% 50%;
  background-color: #f44336;
  position: absolute;
  top: calc(var(--circle-size) / 2);
  margin-right: calc(var(--circle-size) / 2 * -1);
}
</style>
