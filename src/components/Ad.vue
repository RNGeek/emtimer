<template>
  <container>
    <mu-paper v-if="visible" class="paper" :z-depth="3">
      <mu-sub-header class="header">
        <mu-icon-button class="close-botton" icon="close" @click="hide" />
        <div class="header-text">
          💡 Pokémon RNG Advent Calendar 2017 の宣伝
        </div>
      </mu-sub-header>
      <mu-content-block class="content">
        <p>12/1 から 12/25 まで, ポケモン or 乱数に関することについて1日1本記事を書くAdvent Calendarというイベントを開催します.</p>
        <p>
          <a href="https://adventar.org/calendars/2170" target="_blank">Pokémon RNG Advent Calendar 2017</a>
          <mu-icon value="open_in_new" size="14" />
        </p>
      </mu-content-block>
    </mu-paper>
  </container>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '../components/Container.vue'

export default Vue.extend({
  name: 'Ad',
  components: {
    Container,
  },
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    hide (): void {
      this.visible = false
    },
  },
})
</script>

<style scoped>
.paper {
  margin: 30px 0;
}
.header {
  background: #ef6c00;
  padding: 0;
}
.close-botton {
  float: right;
}
.header-text {
  color: white;
  line-height: 30px;
  padding: 10px;
}

.hidden {
  display: none;
}
</style>
