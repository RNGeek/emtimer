<template>
  <div>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field
          hintText="0"
          v-model.number="stateNumber"
          :errorText="stateErrorText"
          v-bind="$attrs"
          @input="emitInput"
          fullWidth />
      </mu-flexbox-item>
      <mu-flexbox-item basis="5em" grow="0">
        <unit-select v-model="stateUnit" @input="emitInput" fullWidth />
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import UnitSelect from './UnitSelect';

const parseNumber = (duration, unit) => duration * (unit === 's' ? (1 / 1000) : (1 / 60 / 1000));
const parseDuration = (number, unit) => number * (unit === 's' ? 1000 : 60 * 1000);

// duration(単位はms)をvalueプロパティとして受け取り,
// 値に変更がある度に変更後のdurationと共にinputイベントを発火する

export default {
  name: 'duration-input',
  components: {
    UnitSelect,
  },
  props: {
    value: { default: 0 },
    unit: { default: 's' },
    invalid: { type: Boolean, default: false },
    errorText: { type: String, default: '不正な値です.' },
  },
  data() {
    return {
      stateNumber: parseNumber(this.value, this.unit), // 表示用の数値
      stateUnit: this.unit, // 表示用の単位
    };
  },
  computed: {
    duration() {
      return parseDuration(this.stateNumber, this.stateUnit);
    },
    stateErrorText() {
      return this.invalid ? this.errorText : '';
    },
  },
  methods: {
    emitInput() {
      this.$emit('input', this.duration);
    },
  },
};
</script>
