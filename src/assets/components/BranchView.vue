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
import { mapMutations } from 'vuex'
import {remote} from 'electron'
const mainProcess = remote.require('./main.js')

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
      if(this.model.children && this.model.children.length) {
        this.open = !this.open
      } else {
        this.readFile({text: mainProcess.selectFile(this.model.path)})
      }
    },
    ...mapMutations([
      'readFile'
    ])
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
