import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import jwtdecode from 'jwt-decode'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    username: '',
    id: 0,
    header: false
  },
  getters: {
    getusername(state) {
      if (window.localStorage.getItem('token') !== null) {
        var decode = jwtdecode(window.localStorage.getItem('token'))
        return decode
      }
    }
  },
  mutations: {
    changeheader(state) {
      state.header = true
    }
  }
})

export default store