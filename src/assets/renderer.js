import Vue from 'vue'
import store from './store'

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
Vue.use(KeenUI);

import VueCodeMirror from 'vue-codemirror'
Vue.use(VueCodeMirror)

import MainView from './components/MainView.vue'

require('./common.css')

var app = new Vue({
    el: '#app',
    store,
    template: '<MainView />',
    components: { MainView },
})
