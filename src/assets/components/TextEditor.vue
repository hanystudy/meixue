<template>
  <textarea :value="text" v-on:input="updateText({text: $event.target.value})"
    v-on:scroll="updateScrollTop({scrollTop: $event.target.scrollTop, scrollHeight: $event.target.scrollHeight, clientHeight: $event.target.clientHeight})">
  </textarea>
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
      'updateText',
      'updateScrollTop'
    ])
  },
  updated: function() {
    this.$el.scrollTop = this.$el.scrollHeight * this.scrollRatio
  }
}
</script>

<style scoped>
.textEditor {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

textarea {
  flex: 1;
  border: none;
  font-size: 16px;
}
</style>
