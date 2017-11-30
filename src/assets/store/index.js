import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    text: '',
    scrollRatio: 0,
    scrollType: '',
    path: '',
    dirty: false
}

export const mutations = {
    updateText (state, { text }) {
        state.text = text
        state.dirty = true
    },
    updateScrollTop (state, { type, scrollTop, scrollHeight, clientHeight }) {
        const h = scrollHeight
        state.scrollRatio = h <= clientHeight ? 0 : scrollTop / (h - clientHeight)
        state.scrollType = type
    },
    readFile (state, { text, path }) {
        state.text = text
        state.path = path
        state.dirty = false
    }
}

export default new Vuex.Store({
    state,
    mutations
})
