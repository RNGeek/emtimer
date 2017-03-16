<template>
  <div id="app">
    <emtimer />
  </div>
</template>

<script>
import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Emtimer from './components/Emtimer';

Vue.use(MuseUI);

export default {
  name: 'app',
  components: {
    Emtimer,
  },
};
</script>

<style>
</style>
