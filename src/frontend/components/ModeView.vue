<template>
  <div>
    <span v-if="coutingTimerId === 0">開始まで</span>
    <span v-else>終了まで</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ModeView',
  props: {
    coutingTimerId: { type: Number, required: true },
  },
})
</script>
