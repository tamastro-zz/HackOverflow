<template>
  <div class="hello container">
    <br><br>
    <a class="button is-large is-info" @click="openmodal">
    <span>Add Question</span>
    <span class="icon is-medium">
      <i class="fa fa-plus-square"></i>
    </span>
  </a>
    <br>
    <br>
    <div  v-for="thread in threads" :key="thread._id">
    <div class="card">
      <div class="card-content">
        <p class="title">
          “{{thread.title}}”
        </p>
        <p class="subtitle">
          Created By: {{thread.author.username}}
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
              Answers: {{thread.answer.length}}
        </span>
        </p>
          <button class="button is-white card-footer-item"   @click="openthread(thread._id)">Open Thread</button>
      </footer>
    </div>
    <br>
    </div>


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
              <input class="input" type="text" placeholder="Question Title" v-model="title">
            </div>
          </div>

          <div class="field">
            <label class="label">Input Your Question</label>
            <div class="control">
              <textarea class="textarea" placeholder="Input Your Question..." v-model="text"></textarea>
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
  export default {
    name: 'hello',
    data() {
      return {
        threads: [],
        modalclass: 'modal',
        title: '',
        text: '',
      }
    },
    methods: {
      getthread() {
        this.$http.get('/question', {
            headers: {
              token: window.localStorage.getItem('token')
            }
          })
          .then(response => {
            this.threads = response.data
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
      postquestion() {
        this.$http.post('/question', {
          title: this.title,
          text: this.text
        }, {
          headers: {
            token: window.localStorage.getItem('token')
          }
        })
        .then(resposnse=> {
        })
        this.title = ''
        this.text = ''
        this.closemodal()
      },
      paket() {
        this.postquestion(),
        this.getthread()
      },
      openthread(id) {
        this.$router.push({ path: `/thread/${id}` })
      }
    },
    created() {
      this.getthread()
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
