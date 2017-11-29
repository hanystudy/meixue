import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    text: '',
    scrollRatio: 0,
    scrollType: ''
}

export const mutations = {
    updateText (state, { text }) {
        state.text = text
    },
    updateScrollTop (state, { type, scrollTop, scrollHeight, clientHeight }) {
        const h = scrollHeight
        state.scrollRatio = h <= clientHeight ? 0 : scrollTop / (h - clientHeight)
        state.scrollType = type
    }
}

export default new Vuex.Store({
    state,
    mutations
})
