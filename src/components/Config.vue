<template>
  <div>
    <mu-card-title class="config-title" title="設定" />
    <mu-card-text>

      <fieldset>
        <legend>待機時間</legend>
        <mu-row>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input v-model="duration" @input="onInput" />
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>開始までの猶予</legend>
        <mu-row>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input v-model="waitingDuration" @input="onInput" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            前からカウント開始
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>切り上げ</legend>
        <mu-row>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input v-model="cuttedDuration" @input="onInput" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            早くカウント終了
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>ループ回数</legend>
        <mu-row><mu-switch label="無限ループ" v-model="infiniteLoop"  @input="onInput" /></mu-row>
        <mu-row v-if="!infiniteLoop">
          <mu-col width="100" tablet="50" desktop="50">
            <mu-text-field
              v-model.number="loop"
              @input="onInput"
              fullWidth
              :errorText="this.$v.loop.$invalid ? '不正な値です.' : ''"
            />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            回ループする
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>サウンド</legend>
        <mu-row><mu-switch label="サウンドを有効化" v-model="sound" @input="onInput" /></mu-row>
        <mu-row v-if="sound">
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input v-model="soundDuration" @input="onInput" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            前から音を鳴らす
          </mu-col>
        </mu-row>
      </fieldset>

    </mu-card-text>
  </div>
</template>


<script>
import { validationMixin } from 'vuelidate';
import { required, between } from 'vuelidate/lib/validators';
import DurationInput from './DurationInput';

const notNaN = value => !Number.isNaN(value);

export default {
  name: 'config',
  mixins: [validationMixin],
  components: {
    DurationInput,
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

<style scoped>
fieldset {
  border: none;
}

legend {
  font-weight: bold;
}
</style>
