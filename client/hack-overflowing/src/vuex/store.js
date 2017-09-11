import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import jwtdecode from 'jwt-decode'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    username: 'tama'
  },
  getters: {
    getusername() {
      var decode = jwtdecode(window.localStorage.getItem('token'))
      return decode
    }
  }
})

export default store