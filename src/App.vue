<template>
  <div>
    <app-bar />
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import AppBar from './pages/AppBar.vue'
import AppFooter from './pages/AppFooter.vue'

export default {
  name: 'app',
  components: {
    AppBar,
    AppFooter,
  },
}
</script>
