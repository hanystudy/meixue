<template>
  <div>
    <ul>
      <BranchView :model="model" />
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import BranchView from './BranchView.vue'

import {remote} from 'electron'
const mainProcess = remote.require('./main.js')

export default {
  components: { BranchView },
  data: function() {
    return {model: {}}
  },
  methods: {
    ...mapMutations([
    ])
  },
  mounted: function() {
    const path = mainProcess.selectDirectory()
    this.model = path
  }
}
</script>

<style scoped>
div {
  flex: 1;
  margin: 5px;
  overflow: scroll;
}
</style>
