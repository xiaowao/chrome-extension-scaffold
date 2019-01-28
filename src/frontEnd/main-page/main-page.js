import Vue from 'vue'
import App from './App'
import router from './router/index'

new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    this.$router.puah({name: 'index'})
  }
})