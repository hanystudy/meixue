import Vue from 'vue'
import store from './store'
import MainView from './components/MainView.vue'

require('./common.css')

var app = new Vue({
    el: '#app',
    store,
    template: '<MainView />',
    components: { MainView },
})
