<template>
  <div class="login container">
    <div class="error" v-if="error !== ''">
      <p class="title is-2 is-spaced">{{error}}</p>
    </div>
    <div class="login" v-if="status == true">
      <p class="title is-1 is-spaced">Login</p>
      <br><br>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Username" v-model="username">
          <span class="icon is-small is-left">
        <i class="fa fa-user"></i>
      </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
        <i class="fa fa-lock"></i>
      </span>
        </p>
      </div>
      <br>
      <a class="button is-success" @click="login">Log In</a>
      <a class="button is-white" @click="status = false">Register</a>
    </div>
    <div class="register" v-if="status == false">
      <p class="title is-1 is-spaced">Register</p>
      <br><br>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Username" v-model="username">
          <span class="icon is-small is-left">
        <i class="fa fa-user"></i>
      </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
        <i class="fa fa-lock"></i>
      </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Email" v-model="email">
          <span class="icon is-small is-left">
        <i class="fa fa-envelope"></i>
      </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Fullname" v-model="fullname">
          <span class="icon is-small is-left">
        <i class="fa fa-user-circle-o"></i>
      </span>
        </p>
      </div>


      <br>
      <a class="button is-success" @click="register">Sign Up</a>
      <a class="button is-danger" @click="status = true">Cancel</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: true,
        password: '',
        username: '',
        email: '',
        fullname: '',
        error: ''
      }
    },
    methods: {
      login() {
        console.log('login');
        this.$http.post('/users/signin', {
            username: this.username,
            password: this.password
          })
          .then(response => {
            console.log('responnya');
            if (response.data == 'nousername') {
              this.error = 'Username Not Exist'
            }
            if (response.data == 'wrong password') {
              this.error = 'Password Salah'
            } else {
              localStorage.setItem('token', response.data)
              this.$router.push('/dashboard')
            }
          })
      },
      register() {
        this.$http.post('/users/signup', {
            username: this.username,
            password: this.password,
            email: this.email,
            fullname: this.fullname
          })
          .then(response => {
            this.username = ''
            this.password = ''
            this.email = ''
            this.fullname = ''
            this.status = true
          })
      }
    }
  }

</script>

<style>


</style>
