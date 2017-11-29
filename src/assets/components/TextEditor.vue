<template>
  <textarea v-model="localText"
            v-on:input="updateText({text: $event.target.value})"
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
  data: function () {
    return {
      localText: this.text
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
textarea {
  flex: 1;
  margin: 5px;
  outline: none;
}
</style>