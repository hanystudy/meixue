<template>
  <li>
    <div
     @click="toggle" >
      {{ model.name }}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <BranchView v-for="child in model.children" :model="child"/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'BranchView',
  data: function() {
    return {
      open: false
    }
  },
  props: {
    model: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle: function() {
      this.open = !this.open
    }
  },
  updated: function() {
  }
}
</script>

<style scoped>
div {
  flex: 1;
}
</style>
