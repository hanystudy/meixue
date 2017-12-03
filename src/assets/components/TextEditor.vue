<template>
  <div class="textEditor">
    <TextEditorToolBar v-if="showEditorToolBar"
                       :left="toolBarLeft"
                       :top="toolBarTop"/>
    <textarea :value="text" v-on:input="updateText({text: $event.target.value})"
                       v-on:click="textEditorSelectionChange($event.target)"
                       v-on:scroll="textEditorScroll($event)"
                       tabindex="-1">
    </textarea>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditorToolBar from './TextEditorToolBar.vue'

function getCoord(text) {
  let carPos = text.selectionEnd,
    div = document.createElement('div'),
    span = document.createElement('span'),
    copyStyle = getComputedStyle(text),
    coords = {}
  Array.prototype.forEach.call(copyStyle, function(prop) {
    div.style[prop] = copyStyle[prop]
  })
  div.style.position = 'absolute'
  document.body.appendChild(div)
  div.textContent = text.value.substr(0, carPos)
  span.textContent = text.value.substr(carPos) || '.'
  div.appendChild(span)
  coords = {
    TOP: span.offsetTop,
    LEFT: span.offsetLeft
  }
  const left = text.offsetLeft - text.scrollLeft + coords.LEFT + 'px'
  const top = text.offsetTop - text.scrollTop + coords.TOP + parseInt(copyStyle.fontSize) + 'px'
  document.body.removeChild(div)
  return [left, top]
};

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
      toolBarTop: '0'
    }
  },
  methods: {
    ...mapMutations([
      'updateText',
      'updateScrollTop'
    ]),
    editTextarea: function(editor) {
    },
    textEditorSelectionChange(el) {
      if('selectionStart' in el) {
        let pos = getCoord(el)
        this.showEditorToolBar = true
        this.toolBarLeft = pos[0]
        this.toolBarTop = pos[1]
      }
    },
    textEditorScroll: function(event) {
      this.updateScrollTop({scrollTop: event.target.scrollTop, scrollHeight: event.target.scrollHeight, clientHeight: event.target.clientHeight})
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
  display: flex;
  flex-direction: column;
  padding: 5px;
}

textarea {
  flex: 1;
  border: none;
  font-size: 16px;
  outline: none;
}
</style>
