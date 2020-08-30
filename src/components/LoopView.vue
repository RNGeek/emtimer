<template>
  <div>
    ループ回数:
    <template v-if="isInfiniteLoop">
      {{ loop }} / ∞
    </template>
    <template v-else>
      {{ loop }} / {{ maxLoop }}
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoopView',
  props: {
    loop: { type: Number, required: true },
    maxLoop: { type: Number, default: Infinity },
  },
  computed: {
    isInfiniteLoop (): boolean {
      return this.maxLoop === Infinity
    },
  },
})
</script>
