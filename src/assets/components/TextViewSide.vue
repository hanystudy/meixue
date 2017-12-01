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
  position: relative;
  width: 20px;
}

.icon {
  position: absolute;
  top: 50%;
  right: -25px;
  background: rgba(1,1,1,0.3);
  width: 50px;
  height: 50px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.icon svg {
  position: absolute;
  top: 18px;
  left: 19px;
  fill: white;
}
</style>
