<template>
  <div>
    <span v-if="hover" class="icon" @click="swapMainWindow">
      <Icon name="exchange"/>
    </span>
    <span v-if="hover" class="icon" @click="toggleSplitting">
      <Icon name="columns"/>
    </span>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

export default {
  components: { Icon },
  data: function() {
    return {
    }
  },
  props: {
    hover: {
      type: Boolean
    },
    swapMainWindow: {
      type: Function
    },
    toggleSplitting: {
      type: Function
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  height: 50px;
  width: 200px;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 1000;
}

.icon {
  display: inline-block;
  position: relative;
  background: rgba(1,1,1,0.3);
  width: 50px;
  height: 50px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.icon svg {
  position: absolute;
  top: 18px;
  left: 19px;
  fill: white;
}
</style>
