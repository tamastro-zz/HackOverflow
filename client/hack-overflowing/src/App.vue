<template>
  <div id="app">
    <nav class="navbar is-transparent" id="head">
      <div class="navbar-brand">
        <a class="navbar-item">
          <h1>HackOverflow</h1>
      </a>

        <div class="navbar-burger burger" data-target="navMenuTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenuTransparentExample" class="navbar-menu" v-if="$route.path !== '/'">
        <div class="navbar-start">
          <div class="navbar-item">
            <a class="navbar-link is-active" @click="gotodashboard">
            Dashboard
          </a>
          </div>
        </div>

        <div class="navbar-end" v-if="$route.path !== '/'">
          <a class="navbar-item is-hidden-desktop-only">
            <img width=30 :src="`data:image/png;base64,${identicon}`">
        </a>
          <div class="navbar-item">
            {{getusername}}
          </div>
          <div class="navbar-item">
            <div class="field is-grouped">
              </p>
              <p class="control">
                <a class="button is-primary">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span @click="logout">Log Out</span>
              </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <router-view></router-view>
  </div>
</template>

<script>
  import jwtdecode from 'jwt-decode'
  import Identicon from 'identicon.js'
  export default {
    name: 'app',
    computed: {
      getusername() {
        return this.$store.state.username
      },
      identicon() {
        var avatar = new Identicon(this.$store.state.id, 420).toString();
        return avatar
      },
    },
    methods: {
      logout() {
        this.$router.push({
          path: '/'
        })
        window.localStorage.clear()
      },
      gotodashboard() {
        this.$router.push({
          path: '/dashboard'
        })
      }

    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: grey cover;
  }

</style>
