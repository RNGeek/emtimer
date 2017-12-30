
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
              @input="onInput"
              error-text="0から10000000000の数値で指定して下さい." />
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
              @input="onInput"
              error-text="0から10000000000の数値で指定して下さい." />
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
              @input="onInput"
              error-text="0から10000000000の数値で指定して下さい." />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            早くカウント終了
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>ループ</legend>
        <mu-row><mu-switch label="無限ループ" v-model="infiniteLoop" @input="onInput" /></mu-row>
        <mu-row v-if="!infiniteLoop">
          <mu-col width="100" tablet="50" desktop="50">
            <mu-text-field
              v-model.number="maxLoop"
              @input="onInput"
              full-width
              :error-text="this.$v.maxLoop.$invalid ? '0から10000000000の整数で指定して下さい.' : ''" />
          </mu-col>
          <mu-col width="100" tablet="50" desktop="50">
            回ループする
          </mu-col>
        </mu-row>
      </fieldset>

      <fieldset>
        <legend>サウンド</legend>
        <mu-row><mu-switch label="サウンドを有効化" v-model="sound" @change="onSoundenable" /></mu-row>
        <mu-row v-if="sound">
          <mu-col width="100" tablet="50" desktop="50">
            <duration-input
              v-model="soundDuration"
              :invalid="$v.soundDuration.$invalid"
              @input="onInput"
              error-text="0から10000000000の数値で指定して下さい." />
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

import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import DurationInput from './DurationInput.vue'
import { nonBigNumber, integer } from '../lib/rules'

export default Vue.extend({
  name: 'Config',
  components: {
    DurationInput,
  },
  mixins: [validationMixin],
  props: {
    value: {
      type: Object,
      required: true,
      duration: { type: Number, required: true },
      waitingDuration: { type: Number, required: true },
      cuttedDuration: { type: Number, required: true },
      maxLoop: { type: Number, required: true },
      infiniteLoop: { type: Boolean, required: true },
      soundDuration: { type: Number, required: true },
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

<style scoped>
fieldset {
  border: none;
}

legend {
  font-weight: bold;
}
</style>
