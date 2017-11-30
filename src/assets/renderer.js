import Vue from 'vue'
import store from './store'
import TextEditor from './components/TextEditor.vue'
import TextViewer from './components/TextViewer.vue'
import TreeView from './components/TreeView.vue'

require('./common.css')

var app = new Vue({
    el: '#app',
    store,
    template: '<div v-bind:style="style"><TreeView /><TextViewer :text="text" :scrollRatio="scrollRatio"/><TextEditor :text="text" :scrollRatio="scrollRatio"/></div>',
    components: { TextEditor, TextViewer, TreeView },
    computed: {
        text () {
            return this.$store.state.text
        },
        scrollRatio () {
            return this.$store.state.scrollRatio
        }
    },
    data() {
        return {
            style: {
                display: 'flex',
                height: '100%'
            }
        }
    }
})
