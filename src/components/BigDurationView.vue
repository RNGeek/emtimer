<template>
  <div class="view">
    <div class="line"></div>
    <div class="circle" :style="{ right: right }"></div>
  </div>
</template>

<script>
import DurationView from './DurationView';

export default {
  name: 'big-duration-view',
  extends: DurationView,
  computed: {
    right() {
      const cs = ((this.value / 10) % 100); // centi seconds
      return `${(((cs + 37.5) * 2) % 200) - 25}%`;
    },
  },
};
</script>gyhjnk

<style scoped>
:root {
  --circle-size: 50px;
}

.view {
  width: 100%;
  position: relative;
  height: calc(var(--circle-size) * 2);
  overflow-x: hidden;
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
  background-color: red;
  position: absolute;
  top: calc(var(--circle-size) / 2);
  margin-right: calc(var(--circle-size) / 2 * -1);
}
</style>
