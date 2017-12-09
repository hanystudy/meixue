<template>
  <div class="textEditorToolBar" v-bind:style="style">
    <span @click="openInsertImage">
      <Icon name="picture-o" scale="1"/>
    </span>
    <ui-modal ref="insertImageDialog" size="normal" title="Insert Image">
      <ui-textbox v-model="imageLabel" label="Label" placeholder="Input image label"></ui-textbox>
      <ui-textbox v-model="imageLink" label="Link" placeholder="Input image link"></ui-textbox>
      <div slot="footer">
        <ui-button color="primary" @click="insertImage">Insert</ui-button>
        <ui-button @click="$refs.insertImageDialog.close()">Cancel</ui-button>
      </div>
    </ui-modal>
    <span @click="insertCode"><Icon name="code" scale="1"/></span>
    <span @click="insertHeader"><Icon name="header" scale="1"/></span>
    <span @click="openInsertLink"><Icon name="link" scale="1"/></span>
    <ui-modal ref="insertLinkDialog" size="normal" title="Insert Link">
      <ui-textbox v-model="linkLabel" label="Label" placeholder="Input link label"></ui-textbox>
      <ui-textbox v-model="linkValue" label="Link" placeholder="Input link value"></ui-textbox>
      <div slot="footer">
        <ui-button color="primary" @click="insertLink">Insert</ui-button>
        <ui-button @click="$refs.insertLinkDialog.close()">Cancel</ui-button>
      </div>
    </ui-modal>
    <span @click="insertItalic"><Icon name="italic" scale="1"/></span>
    <span @click="insertBold"><Icon name="bold" scale="1"/></span>
    <span @click="redo"><Icon name="repeat" scale="1"/></span>
    <span @click="undo"><Icon name="undo" scale="1"/></span>
    <span><Icon name="strikethrough" scale="1"/></span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'
import { UiModal, UiButton, UiTextbox } from 'keen-ui'

export default {
  components: { Icon, UiModal, UiButton, UiTextbox },
  props: {
    left: {
      type: String
    },
    top: {
      type: String
    },
    editorInstance: {
      type: Object
    }
  },
  data: function() {
    return {
      imageLabel: '',
      imageLink: '',
      linkLabel: '',
      linkValue: ''
    }
  },
  methods: {
    ...mapMutations([
    ]),
    openInsertImage: function() {
      this.$refs.insertImageDialog.open()
    },
    insertImage: function() {
      this.editorInstance.replaceSelection(`![${this.imageLabel}](${this.imageLink})`)
      this.$refs.insertImageDialog.close()
    },
    insertCode: function() {
      this.editorInstance.replaceSelection('\n```\n' + this.editorInstance.getSelection() + '\n```\n')
    },
    insertHeader: function() {
      const selection = this.editorInstance.getSelection()
      if (selection.startsWith('#')) {
        this.editorInstance.replaceSelection('#' + selection)
      } else {
        this.editorInstance.replaceSelection('\n# ' + selection + '\n')
      }
    },
    openInsertLink: function() {
      this.linkLabel = this.editorInstance.getSelection()
      this.linkValue = ''
      this.$refs.insertLinkDialog.open()
    },
    insertLink: function() {
      this.editorInstance.replaceSelection(`[${this.linkLabel}](${this.linkValue})`)
    },
    insertItalic: function() {
      const selection = this.editorInstance.getSelection()
      this.editorInstance.replaceSelection(` *${selection}* `)
    },
    insertBold: function() {
      const selection = this.editorInstance.getSelection()
      this.editorInstance.replaceSelection(` **${selection}** `)
    },
    undo: function() {
      this.editorInstance.undo()
    },
    redo: function() {
      this.editorInstance.redo()
    }
  },
  computed: {
    style: function() {
      return {
        left: this.left,
        top: this.top
      }
    }
  }
}
</script>

<style scoped>
div.textEditorToolBar {
  display: flex;
  position: absolute;
  flex-direction: row-reverse;
  background: white;
  z-index: 1000;
}

span {
  display: inline-block;
  padding: 5px 5px 2px 5px;
}

span:hover {
  background: #e5e5e5;
}
</style>
