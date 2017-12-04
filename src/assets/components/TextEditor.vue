<template>
  <div class="textEditor">
    <codemirror ref="textEditor" :code="text"
                :options="editorOptions"
                v-on:change="updateTextEditor"
                v-on:cursorActivity="textEditorSelectionChange"
                v-on:scroll="textEditorScroll"
                tabindex="-1"></codemirror>
    <TextEditorToolBar v-if="showEditorToolBar"
                       :left="toolBarLeft"
                       :top="toolBarTop"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditorToolBar from './TextEditorToolBar.vue'

export default {
  components: { TextEditorToolBar },
  props: {
    text: {
      type: String
    },
    scrollRatio: {
      type: Number
    },
    scrollType: {
      type: String
    }
  },
  data: function() {
    return {
      showEditorToolBar: false,
      toolBarLeft: '0',
      toolBarTop: '0',
      editorOptions: {
        lineNumbers: false,
        lineWrapping: true,
        theme: 'monokai',
        mode: {
          name: 'markdown',
          highlightFormatting: true
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateText',
      'updateScrollTop'
    ]),
    updateTextEditor: function(text) {
      if(text != this.text)
        this.updateText({text: text})
    },
    textEditorSelectionChange(el) {
      const cursorCoords = el.cursorCoords(true, 'local')
      const scroll = el.getScrollInfo()
      this.showEditorToolBar = true
      this.toolBarLeft = cursorCoords.left + 8 + 'px'
      this.toolBarTop = cursorCoords.top + 32 - scroll.top + 'px'
    },
    textEditorScroll: function(event) {
      const scroll = event.getScrollInfo()
      this.updateScrollTop({scrollTop: scroll.top, scrollHeight: scroll.height, clientHeight: scroll.clientHeight})
    },
    textEditorBlur: function(event) {
    }
  },
  updated: function() {
    this.$el.scrollTop = this.$el.scrollHeight * this.scrollRatio
  },
  mounted: function() {
    document.body.addEventListener('click', (event) => {
      if(event.target.closest('.textEditor') === null)
        this.showEditorToolBar = false
    })
  }
}
</script>

<style scoped>
.textEditor {
  position: relative;
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
  border: none;
  font-size: 16px;
  outline: none;
}
</style>
