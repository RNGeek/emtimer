<template>
  <div>
    <mu-appbar title="エメタイマー">
      <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggleDrawer">
      <mu-appbar title="メニュー">
        <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
      </mu-appbar>
      <mu-list @itemClick="toggleDrawer">
        <mu-sub-header>Tools</mu-sub-header>
        <mu-list-item
          title="シンプルタイマー"
          describeText="ポケモンの館のエメタイマーの移植版"
        />
        <mu-list-item title="工事中" />
        <mu-list-item title="工事中" />
        <mu-divider />
        <mu-sub-header>Information</mu-sub-header>
        <mu-list-item href="https://github.com/mizdra/emtimer" target="_blank" title="GitHub">
          <mu-icon value="open_in_new" slot="right"/>
        </mu-list-item>
        <mu-list-item title="About" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  name: 'app-bar',
  data() {
    return {
      open: false,
      docked: true,
    };
  },
  methods: {
    toggleDrawer(flag) {
      this.open = !this.open;
      this.docked = !flag;
    },
  },
};
</script>

<style scoped>
.mu-appbar {
  background-color: #009688;
}
</style>

