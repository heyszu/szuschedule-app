// import config from '../config'
// import Vue from 'vue'

module.exports = {
    updateSchedule ({ commit }, schedule) {
        commit('SCHEDULE', schedule)
    },
    updatePreLoginState ({ commit }, data) {
        commit('PRELOGIN', data)
    }
}
