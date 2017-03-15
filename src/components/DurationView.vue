<template>
  <div class="view">
    <template v-if="days > 0"><span class="dights">{{ days }}</span><span class="unit">日</span></template>
    <template v-if="hours > 0"><span class="dights">{{ hours }}</span><span class="unit">時間</span></template>
    <span class="dights">{{ minutes | pad }}</span><span class="unit">分</span>
    <span class="dights">{{ seconds | pad }}</span><span class="unit">秒</span>
    <span class="dights">{{ cs | pad }}</span>
  </div>
</template>

<script>
export default {
  name: 'duration-view',
  props: ['value'], // 0以上の数値
  computed: {
    days() { return Math.trunc(this.value / 1000 / 60 / 60 / 24); },
    hours() { return Math.trunc(this.value / 1000 / 60 / 60) % 24; },
    minutes() { return Math.trunc(this.value / 1000 / 60) % 60; },
    seconds() { return Math.trunc(this.value / 1000) % 60; },
    cs() { return Math.trunc(this.value / 10) % 100; },
  },
  filters: {
    pad(value) {
      return value.toString().padStart(2, '0');
    },
  },
};
</script>

<style scoped>
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
