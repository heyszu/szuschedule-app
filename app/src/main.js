import Vue from 'vue'
import App from './App'
import store from './vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTap from 'v-tap'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueTap)

// import views
// import index from './views/index'
import index from './views/new'
import login from './views/login'
// import welcome from './views/welcome'

const routes = [{
    path: '/',
    component: index,
    name: 'index'
}, {
    path: '/login',
    component: login,
    name: 'login'
}/* , {
    path: '/welcome',
    component: welcome,
    name: 'welcome'
} */]

const router = new VueRouter({
    routes
})

// First enter show welcome page
/*
router.beforeEach((to, from, next) => {
    if (window.localStorage.getItem('isFirstTime')) {
        next()
    } else {
        window.localStorage.setItem('isFirstTime', 'false')
        next({ path: '/welcome' })
    }
})
*/

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
