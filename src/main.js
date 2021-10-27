import Vue from 'vue'
import App from './App.vue'

// Vendor
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
