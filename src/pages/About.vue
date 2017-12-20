<template>
  <div>
    <ad />
    <container title="About">
      <h2>Author</h2>
      <ul>
        <li>Name: mizdra</li>
        <li>Twitter: <a href="https://twitter.com/mizdra" target="_blank">@mizdra</a></li>
        <li>Github: <a href="https://github.com/mizdra" target="_blank">@mizdra</a></li>
        <li>Blog: <a href="http://mizdra.hatenablog.com" target="_blank">http://mizdra.hatenablog.com</a></li>
      </ul>

      <h2>Repository</h2>
      <ul>
        <li>Top: <a href="https://github.com/mizdra/emtimer" target="_blank">https://github.com/mizdra/emtimer</a></li>
        <li>Issues: <a href="https://github.com/mizdra/emtimer/issues" target="_blank">https://github.com/mizdra/emtimer/issues</a></li>
        <ul>
          <li>If you report 🐛 bugs or 📋 feedback, please see here! 😄</li>
        </ul>
        <li>Pull Requests: <a href="https://github.com/mizdra/emtimer/pulls" target="_blank">https://github.com/mizdra/emtimer/pulls</a></li>
        <ul>
          <li>Looking forward to your 💪 contribution! ✨</li>
        </ul>
      </ul>

      <h2>Dependencies</h2>
      <ul>
        <li><a href="https://github.com/vuejs/vue" target="_blank">vuejs/vue</a></li>
        <li><a href="https://github.com/museui/muse-ui" target="_blank">museui/muse-ui</a></li>
        <li><a href="https://github.com/monterail/vuelidate" target="_blank">vuelidate</a></li>
      </ul>
    </container>
  </div>
</template>

<script>
import Container from '../components/Container.vue'
import Ad from './Ad.vue'

export default {
  name: 'about',
  components: { Container, Ad },
}
</script>
