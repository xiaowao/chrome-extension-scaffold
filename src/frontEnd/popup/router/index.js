import Vue from 'vue'
import Router from 'vue-router'
import popup from '../popup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'popup',
      component: popup
    }
  ]
})