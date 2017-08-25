<template>
  <div>
    <mu-card-title class="config-title" title="設定" />
    <mu-card-text>

      <label>待機時間</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="duration" @input="onInput" />
        </mu-col>
      </mu-row>

      <label>開始までの猶予</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="waitingDuration" @input="onInput" />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          前からカウント開始
        </mu-col>
      </mu-row>

      <label>切り上げ</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <duration-input v-model="cuttedDuration" @input="onInput" />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          早くカウント終了
        </mu-col>
      </mu-row>

      <label>ループ回数</label>
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="50">
          <mu-text-field
            v-model.number="loop"
            @input="onInput"
            :disabled="infiniteLoop"
            fullWidth
            :errorText="this.$v.loop.$invalid ? '不正な値です.' : ''"
          />
        </mu-col>
        <mu-col width="100" tablet="50" desktop="50">
          回ループする
          <mu-checkbox v-model="infiniteLoop"  @input="onInput" label="無限ループ" />
        </mu-col>
      </mu-row>

      <label>サウンド</label>
      <mu-row gutter>
        <mu-col width="100">
          <mu-checkbox v-model="sound" @input="onInput" />
          <duration-input v-model="soundDuration" @input="onInput" :disabled="!sound" />
          前から音を鳴らす
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
      duration: { type: Number },
      waitingDuration: { type: Number },
      cuttedDuration: { type: Number },
      loop: { type: Number },
      infiniteLoop: { type: Boolean },
      sound: { type: Boolean },
      soundDuration: { type: Number },
    },
  },
  data() {
    // copy value
    return Object.assign({}, this.value);
  },
  validations: {
    duration: {
      notNaN,
    },
    waitingDuration: {
      notNaN,
    },
    cuttedDuration: {
      notNaN,
    },
    loop: {
      required,
      between: between(0, 10000000000),
    },
    soundDuration: {
      notNaN,
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
