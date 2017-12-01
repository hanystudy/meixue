<template>
  <div v-bind:style="style">
    <TreeView v-show="showTreeView" @mouseover.native="hoverOnTreeView = true" @mouseleave.native="hoverOnTreeView = false"/>
    <TreeViewSide :hover="hoverOnTreeView" :icon="iconTreeView" @click.native="showTreeView = !showTreeView" @mouseover.native="hoverOnTreeView = true" @mouseleave.native="hoverOnTreeView = false"/>
    <div :class="mainWindowStyle">
      <TextViewer :text="text" :scrollRatio="scrollRatio"/>
      <TextViewSide :hover="hoverOnTextViewSide" icon="exchange" @click.native="swapMainWindow" @mouseover.native="hoverOnTextViewSide = true" @mouseleave.native="hoverOnTextViewSide = false"/>
      <TextEditor :text="text" :scrollRatio="scrollRatio"/>
    </div>
  </div>
</template>

<script>
import TextEditor from './TextEditor.vue'
import TextViewer from './TextViewer.vue'
import TreeView from './TreeView.vue'
import TreeViewSide from './TreeViewSide.vue'
import TextViewSide from './TextViewSide.vue'

export default {
  components: { TextEditor, TextViewer, TreeView, TreeViewSide, TextViewSide },
  computed: {
    text () {
      return this.$store.state.text
    },
    scrollRatio () {
      return this.$store.state.scrollRatio
    },
    iconTreeView () {
      return this.showTreeView ? 'chevron-left' : 'chevron-right'
    }
  },
  data() {
    return {
      style: {
        display: 'flex',
        height: '100%'
      },
      mainWindowStyle: 'mainWindow',
      hoverOnTreeView: false,
      showTreeView: true,
      hoverOnTextViewSide: false,
      showTextViewSide: false
    }
  },
  methods: {
    swapMainWindow: function() {
      if(this.mainWindowStyle === 'mainWindow')
        this.mainWindowStyle = 'mainWindow swap'
      else
        this.mainWindowStyle = 'mainWindow'
    }
  }
}
</script>

<style scoped>
.mainWindow {
  display: flex;
  height: 100%;
  flex: 4;
  flex-direction: row;
}

.mainWindow.swap {
  flex-direction: row-reverse;
}
</style>
