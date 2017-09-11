import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Thread from '@/components/thread'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
