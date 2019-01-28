import Vue from 'vue'
import App from './App'
import router from './router/index'

new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    let bg = chrome.extension.getBackgroundPage() // background的window对象
    if (bg.popupData && bg.popupData.name) {
      this.$router.push({name: bg.popupData.name, params: bg.popupData.data})
      bg.popupData = {}
    }
  }
})