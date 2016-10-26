import config from '../config'
import Vue from 'vue'

module.exports = {
    updateSchedule ({ commit }, ticket) {
        return new Promise(function (resolve, reject) {
            Vue.http.post(config.api + '/schedule', {
                ticket
            }).then(res => {
                if (res.data.status === 200) {
                    commit('SCHEDULE', res.data.data.schedule)
                    resolve()
                } else {
                    reject()
                }
            }, e => {
                console.log(e)
                reject()
            })
        })
    },
    updatePreLoginState ({ commit }, data) {
        commit('PRELOGIN', data)
    }
}
