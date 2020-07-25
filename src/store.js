import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    register(payload){ // payload = data recived from RegisterUser.vue
      return axios.post('//localhost:3000/register', payload) // sending payload to server
      .then(response => {
       console.log("User data is", response.data);
      })
    }
  }
})
