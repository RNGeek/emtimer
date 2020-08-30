<template>
  <div class="view">
    <template v-if="days > 0">
      <span class="dights">{{ days }}</span><span class="unit">日</span>
    </template>
    <template v-if="hours > 0">
      <span class="dights">{{ hours }}</span><span class="unit">時間</span>
    </template>
    <span class="dights">{{ minutes | pad }}</span><span class="unit">分</span>
    <span class="dights">{{ seconds | pad }}</span><span class="unit">秒</span>
    <span class="dights">{{ cs | pad }}</span>
  </div>
</template>

<script lang="ts">
/**
 * 残り時間の表示部.
 * value(単位はms)プロパティで残り時間を渡すと
 * `days:hours:minutes:seconds:cs`の形式で残り時間を表示する.
 */

import Vue from 'vue'

export default Vue.extend({
  name: 'DurationView',
  filters: {
    pad (value): string {
      return value.toString().padStart(2, '0')
    },
  },
  props: {
    value: { type: Number, required: true }, // 0以上の数値
  },
  computed: {
    days (): number { return Math.trunc(this.value / 1000 / 60 / 60 / 24) },
    hours (): number { return Math.trunc(this.value / 1000 / 60 / 60) % 24 },
    minutes (): number { return Math.trunc(this.value / 1000 / 60) % 60 },
    seconds (): number { return Math.trunc(this.value / 1000) % 60 },
    cs (): number { return Math.trunc(this.value / 10) % 100 },
  },
})
</script>

<style lang="postcss" scoped>
.view {
  text-align: center;
}

.dights {
  font-size: 1em;
}

.unit {
  font-size: 0.4em;
}
</style>
