<template>
  <div>
    <mu-card-title class="config-title" title="設定" />
    <mu-card-text>

      <label class="label">待機時間</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="mainDuration" @input="onInput" />
        </mu-col>
      </mu-row>

      <label class="label">開始までの猶予</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="delayDuration" @input="onInput" />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          前からカウント開始
        </mu-col>
      </mu-row>

      <label class="label">切り上げ</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="durationToCutShort" @input="onInput" />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          早くカウント終了
        </mu-col>
      </mu-row>

      <label class="label">ループ回数</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <mu-text-field
            v-model.number="loopCount"
            @input="onInput"
            :disabled="infiniteLoop"
            fullWidth
            :errorText="this.$v.loopCount.$invalid ? '不正な値です.' : ''"
          />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          回ループする
          <mu-checkbox v-model="infiniteLoop" label="無限ループ" />
        </mu-col>
      </mu-row>

    </mu-card-text>
  </div>
</template>


<script>
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import { flexbox, flexboxItem } from 'muse-ui/src/flexbox';
import { row, col } from 'muse-ui/src/grid';
import DurationInput from './DurationInput';

const notNaN = value => !Number.isNaN(value);

export default {
  name: 'config',
  mixins: [validationMixin],
  components: {
    DurationInput,
    flexbox,
    flexboxItem,
    museRow: row,
    museCol: col,
  },
  props: {
    value: {
      mainDuration: { type: Number },
      delayDuration: { type: Number },
      durationToCutShort: { type: Number },
      loopCount: { type: Number },
      infiniteLoop: { type: Boolean },
    },
  },
  data() {
    // copy value
    return Object.assign({}, this.value);
  },
  validations: {
    mainDuration: {
      notNaN,
    },
    delayDuration: {
      notNaN,
    },
    durationToCutShort: {
      notNaN,
    },
    loopCount: {
      required,
      between: between(0, 10000000000),
    },
  },
  methods: {
    onInput() {
      // copy $data and fire input event
      this.$emit('input', {
        ...this.$data,
        invalid: this.$v.$invalid,
      });
    },
  },
};
</script>
