<template>
  <div>
    <app-bar />
    <router-view></router-view>
    <app-footer />
  </div>
</template>

<script>
import AppBar from './components/AppBar';
import AppFooter from './components/AppFooter';

export default {
  name: 'app',
  components: {
    AppBar,
    AppFooter,
  },
};
</script>
