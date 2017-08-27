<template>
  <div>
    <app-bar />
    <emtimer />
    <app-footer />
  </div>
</template>

<script>
import AppBar from './components/AppBar';
import Emtimer from './components/Emtimer';
import AppFooter from './components/AppFooter';

export default {
  name: 'app',
  components: {
    AppBar,
    Emtimer,
    AppFooter,
  },
};
</script>
