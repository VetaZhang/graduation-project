'use strict'

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './main.vue'
import VueRouter from 'vue-router'
import Account from './view/account.vue'
import Home from './view/home.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

window.router = new VueRouter()
const app = Vue.extend(App)

window.router.map({
  '/': {
    component: Account
  },
  'home': {
    component: Home
  }
})

window.router.start(app, '#app')
