<template>
  <div class="container">
    <h1
      v-if="title !== ''"
      class="title"
    >{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
/**
 * コンテンツを掲載するためのコンテナ.
 * slotで渡されたコンポーネントを左右に余白を取り中央に表示する.
 * titleプロパティでコンテナのタイトルを指定できる.
 */

import Vue from 'vue'

export default Vue.extend({
  name: 'Container',
  props: {
    title: { type: String, default: '' },
  },
})
</script>

<style scoped>
/**
 * --- start ---
 * The MIT License (MIT)
 * Copyright (c) 2011-2017 Twitter, Inc.
 * Copyright (c) 2011-2017 The Bootstrap Authors
 * https://github.com/twbs/bootstrap/blob/v4-dev/LICENSE
 */
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    width: 750px;
  }
}

.title {
  border-bottom: 1px solid #eee;
}
</style>
