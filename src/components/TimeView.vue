<template>
  <span>
    <span v-if="days > 0">{{ days }}日</span>
    <span v-if="hours > 0">{{ hours }}時間</span>
    {{ minutes | pad }}分
    {{ seconds | pad }}秒
    {{ cs | pad }}
  </span>
</template>

<script>
export default {
  name: 'time-view',
  props: ['value'],
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
</style>
