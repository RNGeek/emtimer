<template>
  <div>
    <app-bar />
    <emtimer />
  </div>
</template>

<script>
import AppBar from './components/AppBar';
import Emtimer from './components/Emtimer';

export default {
  name: 'app',
  components: {
    AppBar,
    Emtimer,
  },
};
</script>

<style>
</style>
