import Vue from 'vue'
import App from './App'
import store from './vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

// import views
import index from './views/index'
import login from './views/login'

const routes = [{
    path: '/',
    component: index,
    name: 'index'
}, {
    path: '/login',
    component: login,
    name: 'login'
}]

const router = new VueRouter({
    routes
})

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
