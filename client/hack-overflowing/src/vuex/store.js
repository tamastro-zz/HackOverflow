import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import jwtdecode from 'jwt-decode'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    username: '',
    id: 'j1h23i12g3i12giyg',
    header: false
  },
  mutations: {
    change(state, payload) {
      state.id = payload.id,
      state.username = payload.username
    }
  }
})

export default store