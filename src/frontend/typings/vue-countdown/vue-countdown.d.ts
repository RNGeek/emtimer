/* eslint-disable no-undef */

declare module '@xkeshi/vue-countdown' {
  import Vue from 'vue'
  export default class VueCountdown extends Vue {
    autoStart: boolean
    emitEvents: boolean
    interval: number
    leadingZero: boolean
    now: () => number
    time: number
    tag: string
  }
}
