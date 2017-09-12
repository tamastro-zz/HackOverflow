import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Thread from '@/components/thread'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/dashboard',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/thread/:id',
      name: 'Thread',
      component: Thread,
      props: true
    }
  ]
})
