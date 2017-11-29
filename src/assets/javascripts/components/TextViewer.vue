<template>
  <pre v-on:scroll="updateScrollTop({scrollTop: $event.target.scrollTop, scrollHeight: $event.target.scrollHeight, clientHeight: $event.target.clientHeight})">
    {{ text }}
    {{ scrollRatio }}
  </pre>
</template>

<script>
import { mapMutations } from 'vuex'
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
pre {
  flex: 1;
  margin: 5px;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
