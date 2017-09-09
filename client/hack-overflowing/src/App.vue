<template>
  <div id="app">
    <nav class="navbar is-transparent" id="head">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://bulma.io">
        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>

        <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
        <span class="icon" style="color: #333;">
          <i class="fa fa-github"></i>
        </span>
      </a>

        <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
        <span class="icon" style="color: #55acee;">
          <i class="fa fa-twitter"></i>
        </span>
      </a>

        <div class="navbar-burger burger" data-target="navMenuTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenuTransparentExample" class="navbar-menu">
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

        <div class="navbar-end">
          <a class="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
          <span class="icon" style="color: #333;">
            <i class="fa fa-user-circle"></i>
          </span>
        </a>
        <div class="navbar-item">
          Username
        </div>
          <div class="navbar-item">
            <div class="field is-grouped">
              </p>
              <p class="control">
                <a class="button is-primary" href="3">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span>Log Out</span>
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
  export default {
    name: 'app'
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
