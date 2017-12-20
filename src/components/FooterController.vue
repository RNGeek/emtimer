<template>
  <div class="controller">
    <mu-bottom-nav @change="action => emit(action)">
      <mu-bottom-nav-item title="停止" icon="stop" value="stop" />
      <mu-bottom-nav-item v-if="ended" title="開始" icon="play_circle_outline" value="start" :class="{ disabled: startDisabled }" />
      <mu-bottom-nav-item v-else-if="paused && !ended" title="再開" icon="play_circle_outline" value="resume" />
      <mu-bottom-nav-item v-else-if="!paused" title="一時停止" icon="pause_circle_outline" value="pause" />
    </mu-bottom-nav>
  </div>
</template>

<script>
/**
 * 画面下部に固定されるタイマーコントローラー.
 * 押されたボタンに応じてイベント(start/stop/pause/resume)を発火する.
 */

export default {
  name: 'footer-controller',
  props: {
    paused: { type: Boolean },
    ended: { type: Boolean },
    startDisabled: { type: Boolean },
  },
  methods: {
    emit (action) {
      this.$emit(action)
    },
  },
}
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
  cursor: default !important;
}

.mu-buttom-item {
  color: #fff;
}

.mu-buttom-item.disabled {
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.16);
  color: rgba(255,255,255,.38);
  cursor: not-allowed !important;
}
</style>
