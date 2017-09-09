<template>
  <div class="hello container">
    <div id="list">
      <div class="card">
        <div class="card-content">
          <p class="title">
            “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
          </p>
          <p class="subtitle">
            Jeff Atwood
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              View on
              <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              Share on
              <a href="#">Facebook</a>
            </span>
          </p>
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
        msg: 'Welcome to Your Vue.js App'
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
