import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){ // autologin
    const userString = localStorage.getItem('user')
    if (userString){ // if have a user
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData) // commit mutation passing in userData as a payload
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
