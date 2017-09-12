<template>
  <div class="hello container is-fluid">

    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <b>
        {{thread.title}}
        </b>
          </h1>
        </div>
      </div>
    </section>
    <br>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`data:image/png;base64,${identicon(thread.author._id)}`">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{thread.author.username}}</strong>
            <br> {{thread.text}}
            <br>
            <small>
            <a @click="upquestion"><i class="fa fa-arrow-circle-up"></i></a> · {{votes}}pts ·
            <a @click="downquestion"><i class="fa fa-arrow-circle-down"></i></a> · {{thread.createdAt}}  -  <a v-if="thread.author._id == userid" @click="openmodal"><i class="fa fa-pencil"></i></a></small>            - <a v-if="thread.author._id == userid"><i class="fa fa-trash" @click="deletethread"></i></a></small>
          </p>
        </div>

        <article class="media" v-for="ans in thread.answer" :key="ans._id">
          <figure class="media-left">
            <p class="image is-48x48">
              <img :src="`data:image/png;base64,${identicon(ans.user._id)}`">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ans.user.username}}</strong>
                <br> {{ans.text}}
                <br>
                <small>
            <a @click="upanswer(ans._id)"><i class="fa fa-arrow-circle-up"></i></a> · {{answersvotes(ans.vote.up.length, ans.vote.down.length)}}pts ·
            <a @click="downanswer(ans._id)"><i class="fa fa-arrow-circle-down"></i></a> · {{ans.createdAt}}</small>
              </p>
            </div>
          </div>
        </article>

      </div>
    </article>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="`data:image/png;base64,${myidenticon}`">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" placeholder="Add a answer..." v-model="answertext"></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button" @click="postanswer">Post answer</button>
          </p>
        </div>
      </div>
    </article>

    <div :class='modalclass'>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add A Question</p>
          <button class="delete" aria-label="close" @click="closemodal"></button>
        </header>
        <section class="modal-card-body">

          <div class="field">
            <label class="label">Question Title</label>
            <div class="control">
              <input class="input" type="text" :value="thread.title" v-model="title">
            </div>
          </div>

          <div class="field">
            <label class="label">Input Your Question</label>
            <div class="control">
              <textarea class="textarea" :value="thread.text" v-model="text"></textarea>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="paket">Post</button>
          <button class="button" @click="closemodal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
  import Identicon from 'identicon.js'
  export default {
    props: ['id'],
    name: 'thread',
    data() {
      return {
        userid: this.$store.state.id,
        thread: {
          author: {
            _id: '59b2b1300d7d0b335fc3c44a123123213',
            username: ''
          },
          vote: {
            up: [],
            down: []
          },
          answer: [{
            vote: {
              up: [],
              down: []
            },
            user: {
              _id: '59b2b1300d7d0b335fc3c4123123123124a',
              username: ''
            }
          }],
          createdAt: '2017-09-08T15:03:12.208Z'
        },
        answertext: '',
        title: '',
        text: '',
        modalclass: 'modal'
      }
    },
    methods: {
      getthread() {
        this.$http.get(`/question/${this.id}`, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.thread = data.data
          })
      },
      answersvotes(up, down) {
        var total = up - down
        if (total < 0) {
          return 0
        } else {
          return total
        }
      },
      identicon(id) {
        var avatar = new Identicon(id, 420).toString();
        return avatar
      },
      postanswer() {
        this.$http.post(`/question/${this.id}`, {
            atext: this.answertext
          }, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.answertext = ''
            this.getthread()
          })
      },
      upquestion() {
        this.$http.post(`/question/${this.id}/up`, {
            text: ''
          }, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.getthread()
          })
      },
      downquestion() {
        this.$http.post(`/question/${this.id}/down`, {
            text: ''
          }, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.getthread()
          })
      },
      upanswer(ida) {
        this.$http.patch(`/question/${ida}/up`, {
            text: ''
          }, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.getthread()
          })
      },
      downanswer(ida) {
        this.$http.patch(`/question/${ida}/down`, {
            text: ''
          }, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.getthread()
          })
      },
      deletethread() {
        this.$http.delete(`/question/${this.id}`, {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(data => {
            this.$router.push('/dashboard')
          })
      },
      openmodal() {
        this.modalclass = 'modal is-active'
      },
      closemodal() {
        this.title = ''
        this.text = ''
        this.modalclass = 'modal'
      },
      editquestion() {
        this.$http.patch(`/question/${this.id}`, {
          text: this.text,
          title: this.title
        }, {
          headers: {
            token: window.localStorage.getItem('token')
          }
        })
      },
      paket() {
        this.editquestion(),
          this.getthread(),
          this.closemodal()
      },
    },
    created() {
      this.getthread()
    },
    computed: {
      votes() {
        var total = this.thread.vote.up.length - this.thread.vote.down.length
        if (total < 0) {
          return 0
        } else {
          return total
        }
        if (total < 0) {
          return 0
        } else {
          return total
        }
      },
      myidenticon() {
        var avatar = new Identicon(this.$store.state.id, 420).toString();
        return avatar
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
