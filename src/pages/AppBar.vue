<template>
  <div>
    <mu-appbar title="Emtimer">
      <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
      <mu-flat-button color="white" label="Twitter" href="https://twitter.com/mizdra" target="_blank" slot="right"/>
      <mu-flat-button color="white" label="GitHub" href="https://github.com/mizdra/emtimer" target="_blank" slot="right"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggleDrawer">
      <mu-appbar title="メニュー">
        <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />

      </mu-appbar>
      <mu-list @itemClick="toggleDrawer">
        <mu-list-item to="/" title="トップ" />

        <mu-divider />

        <mu-sub-header>Tools</mu-sub-header>
        <mu-list-item
          to="/SimpleTimer"
          title="シンプルタイマー"
          describe-text="エメタイマーのHTML移植版" />
        <mu-list-item title="工事中" />
        <mu-list-item title="工事中" />

        <mu-divider />

        <mu-sub-header>Information</mu-sub-header>
        <mu-list-item href="https://twitter.com/mizdra" target="_blank" title="Twitter">
          <mu-icon value="open_in_new" slot="right"/>
        </mu-list-item>
        <mu-list-item href="https://github.com/mizdra/emtimer" target="_blank" title="GitHub">
          <mu-icon value="open_in_new" slot="right"/>
        </mu-list-item>
        <mu-list-item to="/About" title="About" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppBar',
  data () {
    return {
      open: false,
      docked: true,
    }
  },
  methods: {
    toggleDrawer (flag): void {
      this.open = !this.open
      this.docked = !flag
    },
  },
})
</script>

<style scoped>
.mu-appbar {
  background-color: #009688;
}
</style>
