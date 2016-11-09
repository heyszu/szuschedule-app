export function SCHEDULE (state, scheduleData) {
    // updateSchedule(state, scheduleData)
    window.localStorage.setItem('schedule', JSON.stringify(scheduleData))
    state.schedule = scheduleData
}

export function PRELOGIN (state, data) {
    // updatePreLoginState(state, data)
    state.isPreLogin = data.isPreLogin
    state.preLoginState = data.preLoginState
    state.schedule = data.schedule
}

/*

function updateSchedule (state, scheduleData) {
    window.localStorage.setItem('schedule', JSON.stringify(scheduleData))
    state.schedule = scheduleData
}

function updatePreLoginState (state, data) {
    state.isPreLogin = data.isPreLogin
    state.preLoginState = data.preLoginState
    state.schedule = data.schedule
}

*/
