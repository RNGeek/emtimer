<template>
  <div>
    <app-bar />
    <router-view/>
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from './pages/AppBar.vue'
import AppFooter from './pages/AppFooter.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    AppFooter,
  },
})
</script>
