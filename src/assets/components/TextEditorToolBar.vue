<template>
  <div class="textEditorToolBar" v-bind:style="style">
    <span @click="insertImage">
      <Icon name="picture-o" scale="1"/>
    </span>
    <ui-modal ref="insertImageDialog" size="normal" title="Insert Image">
      <ui-textbox label="Label" placeholder="Input image label"></ui-textbox>
      <ui-textbox label="Link" placeholder="Input image link"></ui-textbox>
      <div slot="footer">
        <ui-button color="primary">Insert</ui-button>
        <ui-button @click="$refs.insertImageDialog.close()">Cancel</ui-button>
      </div>
    </ui-modal>
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
    }
  },
  methods: {
    ...mapMutations([
    ]),
    insertImage: function() {
      this.$refs.insertImageDialog.open()
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
