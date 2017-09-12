<template>
  <div id="app">
    <nav class="navbar is-transparent" id="head">
      <div class="navbar-brand">
        <a class="navbar-item">
        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>

        <div class="navbar-burger burger" data-target="navMenuTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenuTransparentExample" class="navbar-menu" v-if="this.$store.state.header == true">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link  is-active" href="/documentation/overview/start/">
            Profile
          </a>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item ">
              My Question
            </a>
              <a class="navbar-item ">
              My Answer
            </a>
              <hr class="navbar-divider">
              <div class="navbar-item">
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-end" v-if="this.$store.state.header == true">
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
                <a class="button is-primary" href="3">
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
        return this.$store.getters.getusername.username
      },
      identicon() {
        var avatar = new Identicon(this.$store.getters.getusername.id, 420).toString();
        return avatar
      },
      logout() {
        this.$router.push({path: '/'})
        window.localStorage.clear()
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
