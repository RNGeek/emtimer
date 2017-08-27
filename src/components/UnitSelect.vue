<template>
  <mu-select-field fullWidth ref="input" :value="value" @input="(value) => $emit('input', value)">
    <mu-menu-item value="s" title="秒" />
    <mu-menu-item value="f" title="フレーム" />
  </mu-select-field>
</template>

<script>
export default {
  name: 'unit-select',
  props: {
    value: { default: 's' },
  },
};
</script>
