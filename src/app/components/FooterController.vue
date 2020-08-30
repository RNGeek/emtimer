<template>
  <div class="controller">
    <mu-bottom-nav @change="action => emit(action)">
      <mu-bottom-nav-item
        title="停止"
        icon="stop"
        value="stop"
      />
      <mu-bottom-nav-item
        title="開始"
        icon="play_circle_outline"
        value="start"
        :class="{ disabled: startDisabled }"
      />
    </mu-bottom-nav>
  </div>
</template>

<script lang="ts">
/**
 * 画面下部に固定されるタイマーコントローラー.
 * 押されたボタンに応じてイベント(start/stop/pause/resume)を発火する.
 */

import Vue from 'vue'

export default Vue.extend({
  name: 'FooterController',
  props: {
    startDisabled: { type: Boolean, required: true },
  },
  methods: {
    emit (action): void {
      this.$emit(action)
    },
  },
})
</script>

<style lang="postcss" scoped>
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
