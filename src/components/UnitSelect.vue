<template>
  <mu-select-field
    ref="input"
    v-bind="$attrs"
    :value="value"
    @input="(value) => $emit('input', value)" >
    <mu-menu-item value="s" title="秒" />
    <mu-menu-item value="f" title="F" />
  </mu-select-field>
</template>

<script>
/**
 * 単位の入力欄.
 */

export default {
  name: 'unit-select',
  props: {
    value: { default: 's' },
  },
};
</script>
