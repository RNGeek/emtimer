<template>
  <div class="footer">
    &copy; 2017 <a href="https://twitter.com/mizdra" target="_blank">mizdra</a>. <br>
    The app logo is "Hour Glass" by Stephen Plaster from the Noun Project.
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppFooter',
})
</script>

<style lang="postcss" scoped>
.footer {
  background-color: #f9f9f9;
  text-align: center;
  border-top: 1px #ddd solid;
  margin-top: 30px;
  padding: 20px;
}
</style>
