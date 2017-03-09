<template>
  <select ref="input" :value="value" @input="oninput">
    <option value="s">秒</option>
    <option value="f">フレーム</option>
  </select>
</template>

<script>
export default {
  name: 'unit-select',
  props: {
    value: { default: 's' },
  },
  methods: {
    oninput() {
      this.$emit('input', this.$refs.input.value);
    },
  },
};
</script>
