import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    text: ''
}

export const mutations = {
    updateText (state, { text }) {
        state.text = text
    }
}

export default new Vuex.Store({
    state,
    mutations
})
