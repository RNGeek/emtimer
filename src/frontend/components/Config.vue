
<template>
  <div>
    <mu-card-title class="config-title" title="設定" />
    <mu-card-text>
      <fieldset>
        <legend>待機時間</legend>
        <mu-row>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input
              v-model="duration"
              :invalid="$v.duration.$invalid"
              error-text="0から10000000000の数値で指定して下さい."
              @input="onInput"
            />
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>開始までの猶予</legend>
        <mu-row>
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input
              v-model="waitingDuration"
              :invalid="$v.waitingDuration.$invalid"
              error-text="0から10000000000の数値で指定して下さい."
              @input="onInput"
            />
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
            <duration-input
              v-model="cuttedDuration"
              :invalid="$v.cuttedDuration.$invalid"
              error-text="0から10000000000の数値で指定して下さい."
              @input="onInput"
            />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            早くカウント終了
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>ループ</legend>
        <mu-row><mu-switch v-model="infiniteLoop" label="無限ループ" @input="onInput" /></mu-row>
        <mu-row v-if="!infiniteLoop">
          <mu-col width="100" tablet="50" desktop="50">
            <mu-text-field
              v-model.number="maxLoop"
              type="number"
              min="0"
              max="10000000000"
              full-width
              :error-text="this.$v.maxLoop.$invalid ? '0から10000000000の整数で指定して下さい.' : ''"
              @input="onInput"
            />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            回ループする
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>サウンド</legend>
        <mu-row><mu-switch v-model="sound" label="サウンドを有効化" @change="onSoundenable" /></mu-row>
        <mu-row v-if="sound">
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input
              v-model="soundDuration"
              :invalid="$v.soundDuration.$invalid"
              error-text="0から10000000000の数値で指定して下さい."
              @input="onInput"
            />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            前から音を鳴らす
          </mu-col>
        </mu-row>
      </fieldset>
    </mu-card-text>
  </div>
</template>

<script lang="ts">
/**
 * 設定フォーム.
 * valueプロパティで初期設定を渡し, 値が変更されると
 * inputイベントを発火して変更後の設定を返す.
 * 変更後の設定にはバリデーションの結果も含まれる.
 */

import Vue, { PropType } from 'vue'
import { validationMixin } from 'vuelidate'
import DurationInput from './DurationInput.vue'
import { nonBigNumber, integer } from '../lib/rules'

type ComplexValue = {
  duration: number,
  waitingDuration: number,
  cuttedDuration: number,
  maxLoop: number,
  infiniteLoop: boolean,
  soundDuration: number,
}

export default Vue.extend({
  name: 'Config',
  components: {
    DurationInput,
  },
  mixins: [validationMixin],
  props: {
    value: {
      type: Object as PropType<ComplexValue>,
      required: true,
    },
  },
  data () {
    return {
      sound: false,
      ...this.value,
    }
  },
  validations: {
    duration: { nonBigNumber },
    waitingDuration: { nonBigNumber },
    cuttedDuration: { nonBigNumber },
    maxLoop: { nonBigNumber, integer },
    soundDuration: { nonBigNumber },
  },
  methods: {
    onInput (): void {
      // copy $data and fire input event
      this.$emit('input', {
        ...this.$data,
        maxLoop: this.infiniteLoop ? Infinity : this.maxLoop, // 無限ループなら最大ループ回数を Infinity にする
        invalid: this.$v.$invalid, // バリデーションの結果を加える
      })
    },
    onSoundenable (newVal): void {
      this.$emit('soundenable', newVal)
    },
  },
})
</script>

<style lang="postcss" scoped>
fieldset {
  border: none;
}

legend {
  font-weight: bold;
}
</style>
