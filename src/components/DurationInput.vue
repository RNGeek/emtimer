<template>
  <div>
    <mu-flexbox align="flex-end">
      <mu-flexbox-item>
        <mu-text-field
          fullWidth
          v-model.number="mutableNumber"
          :errorText="errorText"
          v-bind="$attrs"
          @input="emitInput"
        />
      </mu-flexbox-item>
      <mu-flexbox-item basis="120px" grow="0">
        <unit-select v-model="mutableUnit" @input="emitInput" />
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { validationMixin } from 'vuelidate';
import { between } from 'vuelidate/lib/validators';
import UnitSelect from './UnitSelect';

const parseNumber = (duration, unit) => duration * (unit === 's' ? (1 / 1000) : (1 / 60 / 1000));
const parseDuration = (number, unit) => number * (unit === 's' ? 1000 : 60 * 1000);

// duration(単位はms)をvalueプロパティとして受け取り,
// 値に変更がある度に変更後のdurationと共にinputイベントを発火する

export default {
  name: 'duration-input',
  mixins: [validationMixin],
  components: {
    UnitSelect,
  },
  props: {
    value: { default: 0 },
    unit: { default: 's' },
  },
  data() {
    return {
      mutableNumber: parseNumber(this.value, this.unit), // 表示用の数値
      mutableUnit: this.unit, // 表示用の単位
    };
  },
  computed: {
    duration() {
      return parseDuration(this.mutableNumber, this.mutableUnit);
    },
    errorText() {
      const valid = this.$v.mutableNumber;
      let text = '';
      if (!valid.between) {
        text += '不正な値です.';
      }
      return text;
    },
  },
  validations: {
    mutableNumber: {
      between: between(0, 10000000000),
    },
  },
  methods: {
    emitInput() {
      this.$emit('input', this.duration);
    },
  },
};
</script>
