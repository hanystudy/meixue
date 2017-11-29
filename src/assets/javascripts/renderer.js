import Vue from 'vue'
import store from './store'
import TextEditor from './components/TextEditor.vue'
import TextViewer from './components/TextViewer.vue'

var app = new Vue({
    el: '#app',
    store,
    template: '<div v-bind:style="style"><TextViewer :text="text"/><TextEditor :text="text"/></div>',
    components: { TextEditor, TextViewer },
    computed: {
        text () {
            return this.$store.state.text
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
