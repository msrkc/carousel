import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 50
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
