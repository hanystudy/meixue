<template>
  <div v-on:scroll="updateScrollTop({scrollTop: $event.target.scrollTop, scrollHeight: $event.target.scrollHeight, clientHeight: $event.target.clientHeight})" v-html="markdownText">
    {{ scrollRatio }}
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MarkdownIt from 'markdown-it'

export default {
  props: {
    text: {
      type: String
    },
    scrollRatio: {
      type: Number
    },
    scrollType: {
      type: String
    }
  },
  computed: {
    markdownText () {
      const md = new MarkdownIt({html: true})
      return md.render(this.text)
    }
  },
  methods: {
    ...mapMutations([
      'updateScrollTop'
    ])
  },
  updated: function() {
    const sh = this.$el.scrollHeight
    const ch = this.$el.clientHeight
    this.$el.scrollTop = sh <= ch ? 0 : (sh - ch) * this.scrollRatio
  }
}
</script>

<style scoped>
div {
  flex: 1;
  padding: 5px;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
