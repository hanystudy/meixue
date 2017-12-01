<template>
  <li>
    <div
      @click="toggle" >
      {{ model.name }}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <BranchView v-for="child in model.children" :key="child.name" :model="child"/>
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
    },
    dirty: function() {
      return this.$store.state.dirty
    },
    path: function() {
      return this.$store.state.path
    },
    text: function() {
      return this.$store.state.text
    }
  },
  methods: {
    toggle: function() {
      if(this.model.children && this.model.children.length) {
        this.open = !this.open
      } else {
        if(this.dirty) {
          const response = mainProcess.alertMessage('Your file has changes, do you want to save them?')
          switch(response) {
            case 0:
              mainProcess.writeFile(this.path, this.text)
              break
            case 1:
              break
            case 2:
              return
          }
        }
        this.readFile({text: mainProcess.selectFile(this.model.path), path: this.model.path})
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

ul, li {
  white-space: nowrap;
  cursor: default;
}
</style>
