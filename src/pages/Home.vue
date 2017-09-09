<template>
  <div>
    <div class="header">
      <container v-scroll-reveal="{ duration: 700 }">
        <div>
          <img class="logo" alt="エメタイマーのロゴ" src="../img/logo.png" />
        </div>
        <div class="description">
          乱数勢のための<br/>
          シンプルで扱いやすい<br/>
          高機能なタイマー
        </div>
      </container>
    </div>

    <container title="はじめる">
      <mu-row>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button to="/SimpleTimer" label="シンプルタイマー" icon="alarm" backgroundColor="#7986cb" fullWidth />
        </mu-col>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button label="工事中" icon="build" backgroundColor="#795548" fullWidth />
        </mu-col>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button label="工事中" icon="build" backgroundColor="#ff7043" fullWidth />
        </mu-col>
      </mu-row>
    </container>
  </div>
</template>

<script>
import Vue from 'vue';
import VueScrollReveal from 'vue-scroll-reveal';
import Container from '../components/Container';

Vue.use(VueScrollReveal);

export default {
  name: 'home',
  components: {
    Container,
  },
};
</script>

<style scoped>
.header {
  background-color: #e5ffe5;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.logo {
  width: 60vw;

  @media (min-width: 600px) {
    width: auto;
  }
}

.description {
  font-family: "SF Pro JP", "SF Pro Text", "SF Pro Icons", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 6vw;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 550;
  line-height: 1.8em;

  @media (min-width: 600px) {
    font-size: 30px;
  }
}

.tool-link {
  padding: 6px 10px;
}
</style>

