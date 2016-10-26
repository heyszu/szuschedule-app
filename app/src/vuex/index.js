import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './store'
import * as mutations from './mutations'
import actions from './actions'

module.exports = new Vuex.Store({
    state,
    mutations,
    actions
})
