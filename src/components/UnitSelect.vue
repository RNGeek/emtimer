<template>
  <mu-select-field ref="input" :value="value" @input="(value) => $emit('input', value)">
    <mu-menu-item value="s" title="秒" />
    <mu-menu-item value="f" title="フレーム" />
  </mu-select-field>
</template>

<script>
import selectField from 'muse-ui/src/selectField';
import menuItem from 'muse-ui/src/menu/menuItem';

export default {
  name: 'unit-select',
  components: { selectField, menuItem },
  props: {
    value: { default: 's' },
  },
};
</script>
