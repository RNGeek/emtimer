<template>
  <div>
    <mu-flexbox align="flex-end">
      <mu-flexbox-item>
        <mu-text-field
          fullWidth
          v-model="mutableNumber"
          :errorText="errorText"
          :label="label"
          :hintText="hintText"
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
import { flexbox, flexboxItem } from 'muse-ui/src/flexbox';
import textField from 'muse-ui/src/textField';
import UnitSelect from './UnitSelect';
import { parseDuration } from '../lib/math';

export default {
  name: 'duration-input',
  mixins: [validationMixin],
  components: {
    flexbox,
    flexboxItem,
    textField,
    UnitSelect,
  },
  props: {
    number: { default: 0 },
    unit: { default: 's' },
    label: {},
    hintText: {},
  },
  data() {
    return {
      mutableNumber: this.number,
      mutableUnit: this.unit,
    };
  },
  computed: {
    duration() {
      if (this.mutableNumber === '') return 0;
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
