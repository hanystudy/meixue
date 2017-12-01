import Vue from 'vue'
import store from './store'
import TextEditor from './components/TextEditor.vue'
import TextViewer from './components/TextViewer.vue'
import TreeView from './components/TreeView.vue'
import TreeViewSide from './components/TreeViewSide.vue'

require('./common.css')

var app = new Vue({
    el: '#app',
    store,
    template: '<div v-bind:style="style"><TreeView v-show="showTreeView" @mouseover.native="hoverOnTreeView = true" @mouseleave.native="hoverOnTreeView = false"/><TreeViewSide :icon="iconTreeView" :hover="hoverOnTreeView" @click.native="showTreeView = !showTreeView" @mouseover.native="hoverOnTreeView = true" @mouseleave.native="hoverOnTreeView = false"/><TextViewer :text="text" :scrollRatio="scrollRatio"/><TextEditor :text="text" :scrollRatio="scrollRatio"/></div>',
    components: { TextEditor, TextViewer, TreeView, TreeViewSide },
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
            hoverOnTreeView: false,
            showTreeView: true
        }
    },
    methods: {
    }
})
