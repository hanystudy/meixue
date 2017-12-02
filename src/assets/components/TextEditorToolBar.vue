<template>
  <div>
    <span>
      <Icon name="picture-o" scale="1"/>
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'

export default {
  components: { Icon },
  props: {
  },
  methods: {
    ...mapMutations([
      'updateText',
      'updateScrollTop'
    ])
  },
  updated: function() {
  }
}
</script>

<style scoped>
div {
  display: relative;
  padding: 5px;
}

span {
  display: inline-block;
  padding: 5px 5px 2px 5px;
}

span:hover {
  background: #e5e5e5;
}
</style>
