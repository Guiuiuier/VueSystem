import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import find from '../views/find/index.vue'
import index from '../layout/index.vue'
//此时路由懒加载不用再这样加载了
// import announcemain from '@/views/announceMain/index'
Vue.use(VueRouter)

// 引入bootstarp
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// 添加一个判断是否是重复路由的代码。取消报错就行
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    redirect: '/login/index'
  }, //重定向

  {


    path: '/login/index',
    name: "login",
    component: login,
  },
  {
    path: '/find/index',
    name: 'find',
    component: find,
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    // 进入主页重定向
    redirect: 'index/announcemain',

    // 路由懒加载 解决首次过慢的问题 
    children: [{
        path: 'announcemain',
        // component:announcemain,
        component: resolve => (require(['@/views/announceMain/index'], resolve)),
        name: "announcemain",
      },
      {
        path: 'personalmain',
        component: resolve => (require(['@/views/personalMain/index'], resolve)),
        name: "personalmain",
      },
      {
        path: 'attendancemain',
        component: resolve => (require(['@/views/attendanceMain/index'], resolve)),
        name: "attendancemain",
      },
      {
        // path: 'filemain',
        // component: resolve => (require(['@/views/fileMain'], resolve)),
        // name: 'filemain',
        // children: [{
            path: 'fileMain/contract',
            component: resolve => (require(['@/views/fileMain/contract/index'], resolve)),
            name: 'contract',
          },
          {
            path: 'fileMain/emcontract',
            component: resolve => (require(['@/views/fileMain/Emcontract/index'], resolve)),
            name: 'emcontract',
          }
        // ]
      // }





    ]
  },

  {
    path: '/'
  },

]

const router = new VueRouter({
  routes
})

export default router
