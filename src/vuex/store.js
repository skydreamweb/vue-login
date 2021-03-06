import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) { // userData = register() action response.data
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData)) // localStorage expect string, not object
      axios.defaults.headers.common['Authorization'] = `Bearer ${ userData.token}` // Token add to header
    },
    CLEAR_USER_DATA(){
      localStorage.removeItem('user')
      location.reload() // reload the current page, forces the refresh of the page
    
    }
  },
  actions: {
    register ({ commit }, payload){ // payload = data recived from RegisterUser.vue
      return axios.post('//localhost:3000/register', payload) // sending payload to server
      .then(response => {
       commit('SET_USER_DATA', response.data) // commit userData to mutation
      })
      
      
    },
    login({ commit }, payload) { // payload = data recived from RegisterUser.vue
      return axios.post('//localhost:3000/login', payload) // sending payload to server
        .then(response => {
          commit('SET_USER_DATA', response.data) // commit userData to mutationS
        })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state){
      return !!state.user // if user state is null it will return false and oposit
    }
  }
})
