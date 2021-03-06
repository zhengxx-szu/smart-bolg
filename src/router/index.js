import Vue from 'vue'
import Router from 'vue-router'
import register from '@/page/register'
import channel from '@/page/channel'
import detail from '@/page/detail'
import user from '@/page/user'
import setting from '@/page/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/channel'
    },
    {
      path: '/channel',
      component: channel,
      children: [
        // {
        //   path: 'login',
        //   component: login
        // }
      ]
    },
    {
      path: '/detail',
      component: detail
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/setting',
      component: setting
    }
  ]
})
