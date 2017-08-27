<template>
  <div class="controller">
    <mu-bottom-nav @change="action => emit(action)">
      <mu-bottom-nav-item title="停止" icon="stop" value="stop" />
      <mu-bottom-nav-item v-if="ended" title="開始" icon="play_circle_outline" value="start" />
      <mu-bottom-nav-item v-else-if="paused && !ended" title="再開" icon="play_circle_outline" value="resume" />
      <mu-bottom-nav-item v-else-if="!paused" title="一時停止" icon="pause_circle_outline" value="pause" />
    </mu-bottom-nav>
    </div>
</template>

<script>
export default {
  name: 'mobile-controller',
  props: {
    paused: { type: Boolean },
    ended: { type: Boolean },
  },
  methods: {
    emit(action) {
      this.$emit(action);
    },
  },
};
</script>

<style scoped>
.controller {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.mu-bottom-nav {
  background-color: #7986cb;
}

.mu-buttom-item {
  color: #fff;
}
</style>

