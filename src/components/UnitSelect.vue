<template>
  <mu-select-field
    ref="input"
    v-bind="$attrs"
    :value="value"
    @input="(value) => $emit('input', value)" >
    <mu-menu-item
      value="s"
      title="秒"
    />
    <mu-menu-item
      value="f"
      title="F"
    />
  </mu-select-field>
</template>

<script lang="ts">
/**
 * 単位の入力欄.
 */

import Vue from 'vue'

export default Vue.extend({
  name: 'UnitSelect',
  props: {
    value: { type: String, default: 's' },
  },
})
</script>
