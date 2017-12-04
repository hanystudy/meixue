<template>
  <div>
    <span v-if="hover" class="icon">
      <Icon :name="icon"/>
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
    icon: {
      type: String
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  width: 20px;
  height: 100%;
  z-index: 1000;
}

.icon {
  position: absolute;
  top: 50%;
  background: rgba(1,1,1,0.3);
  width: 25px;
  height: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.icon svg {
  position: absolute;
  top: 18px;
  left: 4px;
  fill: white;
}
</style>
