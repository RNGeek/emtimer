<template>
  <div>
    <div class="header">
      <container>
        <div>
          <img class="logo" alt="Emtimerのロゴ" width="256px" height="256px" src="../img/logo.svg" >
          <div class="title">Emtimer</div>
        </div>
        <div class="description">
          乱数勢のための<br>
          シンプルで扱いやすい<br>
          高機能なタイマー
        </div>
      </container>
    </div>

    <ad />
    <container>
      <h1>⚡️特徴️⚡️</h1>
      <mu-row>
        <mu-col class="feature" width="100" tablet="100" desktop="33">
          <section>
            <h2>HTML製</h2>
            <p>
              アプリケーションはWebの技術 (HTML/JavaScript/CSS) で作られており,
              Adobe Flashを使っておりません. Adobe Flashサポート終了後も安心してお使い頂けます.
            </p>
          </section>

        </mu-col>
        <mu-col class="feature" width="100" tablet="100" desktop="33">
          <section>
            <h2>モバイルフレンドリー</h2>
            <p>
              全てのコンテンツはモバイル対応しております. お使いのパソコン,
              タブレット, スマートフォンなどから快適にツールを利用することができます.
            </p>
          </section>
        </mu-col>
        <mu-col class="feature" width="100" tablet="100" desktop="33">
          <section>
            <h2>オープンソース</h2>
            <p>
              このツールのソースコードは <a href="https://github.com/mizdra/emtimer" target="_blank">
              Github上でオープンソースとして公開</a>されており, どなたでも自由に複製・変更・再配布することができます.
              Githubの機能を利用すれば作成者に機能追加やバグ修正の要望を送ったり, ユーザ自身が新機能を追加するコードを書き,
              それを本ツールに取り込むよう申請することもできます.
            </p>
          </section>
        </mu-col>
      </mu-row>

      <h1>🚀はじめる🚀</h1>
      <mu-row>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button to="/SimpleTimer" label="シンプルタイマー" icon="alarm" background-color="#7986cb" full-width />
        </mu-col>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button label="工事中" icon="build" background-color="#795548" full-width />
        </mu-col>
        <mu-col class="tool-link" width="100" tablet="33" desktop="33">
          <mu-raised-button label="工事中" icon="build" background-color="#ff7043" full-width />
        </mu-col>
      </mu-row>
    </container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '../components/Container.vue'
import Ad from '../components/Ad.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    Container,
    Ad,
  },
})
</script>

<style scoped>
h1, h2 {
  text-align: center;
}

h1 {
  border-bottom: 4px dotted #ddd;
  padding: 5px;
}

h2 {
  padding: 2px;
  font-weight: normal;
}

.header {
  background-color: #e5ffe5;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  & .logo {
    width: 60vw;

    @media (min-width: 600px) {
      width: auto;
    }
  }

  & .title {
    font-size: 30px;
    font-weight: bold;
    font-size: 12vw;

    @media (min-width: 600px) {
      font-size: 60px;
    }
  }

  & .description {
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
}

.feature {
  padding: 6px;
}

.tool-link {
  padding: 6px 10px;
}
</style>
