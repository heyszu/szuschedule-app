let state = {
    isPreLogin: false,
    isLogin: false,
    preLoginState: {
        stu_no: 0,
        stu_name: ''
    },
    loginState: {
        id: 0,
        stu_no: 0,
        stu_name: '',
        create_time: 0,
        last_login_time: 0,
        login_ticket: ''
    },
    schedule: {}
}

const localStorage = window.localStorage

if (localStorage.getItem('isPreLogin')) {
    state.isPreLogin = true
    state.preLoginState = JSON.parse(localStorage.getItem('preLoginState'))
}

if (localStorage.getItem('isLogin')) {
    state.isLogin = true
    state.loginState = JSON.parse(localStorage.getItem('loginState'))
}

if (localStorage.getItem('schedule')) {
    state.schedule = JSON.parse(localStorage.getItem('schedule'))
}

module.exports = state
