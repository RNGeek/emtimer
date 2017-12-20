<template>
  <div>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field
          hint-text="0"
          v-model.number="stateNumber"
          :error-text="stateErrorText"
          v-bind="$attrs"
          @input="emitInput"
          full-width />
      </mu-flexbox-item>
      <mu-flexbox-item
        basis="5em"
        grow="0"
      >
        <unit-select
          v-model="stateUnit"
          @input="emitInput"
          full-width
        />
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
/**
 * 時間の入力欄.
 * value(単位はms)プロパティとunitプロパティで時間と単位の初期値を渡すことができ,
 * 値が変更されるとinputイベントを発火して変更後の時間(単位はms)を返す.
 */

/* eslint-disable camelcase */
import UnitSelect from './UnitSelect.vue'

const parseNumber = (duration, unit) => duration * (unit === 's' ? (1 / 1000) : (60 / 1000))
const parseDuration = (number, unit) => number * (unit === 's' ? 1000 : 1000 / 60)

// duration(単位はms)をvalueプロパティとして受け取り,
// 値に変更がある度に変更後のdurationと共にinputイベントを発火する

export default {
  name: 'DurationInput',
  components: {
    UnitSelect,
  },
  props: {
    value: { type: Number, default: 0 },
    unit: { type: String, default: 's' },
    invalid: { type: Boolean, default: false },
    errorText: { type: String, default: '不正な値です.' },
  },
  data () {
    return {
      stateNumber: parseNumber(this.value, this.unit), // 表示用の数値
      stateUnit: this.unit, // 表示用の単位
    }
  },
  computed: {
    duration () {
      return parseDuration(this.stateNumber, this.stateUnit)
    },
    stateErrorText () {
      return this.invalid ? this.errorText : ''
    },
  },
  methods: {
    emitInput () {
      this.$emit('input', this.duration)
    },
  },
}
</script>
