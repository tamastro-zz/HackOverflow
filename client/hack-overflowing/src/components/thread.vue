<template>
  <div class="hello container is-fluid">

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
            <a><i class="fa fa-arrow-circle-up"></i></a> · {{votes}}pts ·
            <a><i class="fa fa-arrow-circle-down"></i></a> · {{thread.createdAt}}</small>
          </p>
        </div>

        <article class="media" v-for="ans in thread.answer" :key="ans._id">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src="http://bulma.io/images/placeholders/96x96.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ans.user.username}}</strong>
                <br> {{ans.text}}
                <br>
                <small>
            <a><i class="fa fa-arrow-circle-up"></i></a> · {{answersvotes(ans.vote.up.length, ans.vote.down.length)}}pts ·
            <a><i class="fa fa-arrow-circle-down"></i></a> · {{ans.createdAt}}</small>
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

  </div>
</template>

<script>
  import Identicon from 'identicon.js'
  export default {
    props: ['id'],
    name: 'thread',
    data() {
      return {
        thread: {
          author: {
            _id: '59b2b1300d7d0b335fc3c44a',
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
              username: ''
            }
          }],
          createdAt: '2017-09-08T15:03:12.208Z'
        },
        answertext: ''
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
      myidenticon() {
        var avatar = new Identicon(this.$store.getters.getusername.id, 420).toString();
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
          this.getthread()
        })
      }
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
      }
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
