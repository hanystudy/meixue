<template>
  <textarea v-model="localText" v-on:input="updateText({text: $event.target.value})">
  </textarea>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    text: {
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
      'updateText'
    ])
  },
}
</script>

<style scoped>
textarea {
  flex: 1;
  margin: 5px;
}
</style>
