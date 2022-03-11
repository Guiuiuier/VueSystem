import Vue from 'vue'
import VueRouter from 'vue-router'
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
    redirect: '/login'
  }, //重定向

  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index.vue'),

  },
  {
    path: '/find',
    name: 'find',
    component: find,
    component: () => import('@/views/find/index.vue'),

  },
  {
    path: '/index',
    name: 'index',
    component: index,
    // 进入主页重定向
    // redirect: '/index/announcemain',
    meta: {
      title: "主页",
    },
    // 路由懒加载 解决首次过慢的问题 
    children: [
      {
        path: 'announcemain',
        // component:announcemain,
        component: () => import('@/views/announceMain/index'),
        name: "announcemain",
        meta: {
          title: "公司公告"
        }
      },



      {
        path: 'personalmain',
        component: () => import('@/views/personalMain/index'),
        name: "personalmain",
        meta: {
          title: "人员管理",
        },

      },
      {
        path: 'attendancemain',
        component: () => import('@/views/attendanceMain/index'),
        redirect:'attendanceMain/myattendance',
        name: "attendancemain",
        meta: {
          title: "考勤管理",
        },
        children:[
          {
            path:'mysign',
            component: () => import('@/views/attendanceMain/mySign/index'),
            name:'mysign',
            meta:{
              title:"前往签到",
            }
         },
          {
           path:'myattendance',
           component: () => import('@/views/attendanceMain/myattendance/index'),
           name:'myattendance',
           meta:{
             title:"我的考勤",
           }
        }
      ]
      },

      {
        path: 'filemain',
        component: () => import('@/views/fileMain/index'),
        redirect: 'fileMain/Emcontract',
        name: 'filemain',
        meta:{
          title:"文件管理"
        },
        children: [{
            path: 'contract',
            component: () => import('@/views/fileMain/contract/index'),
            name: 'contract',
            meta: {
              title: "合同模板",
            },
          },
          {
            path: 'emcontract',
            component: () => import('@/views/fileMain/Emcontract/index'),
            name: 'emcontract',
            meta: {
              title: "在职员工合同",
            },
          },
        ],
        
      },
      {
        path: 'systemmanage',
        component: () => import('@/views/systemManage/index'),
        redirect: 'systemManage/loginLog',
        name: "systemmanage",
        meta: {
          title: "系统管理",
        },
          children:[
            {
            path: 'loginlog',
            component: () => import('@/views/systemManage/loginLog/index'),
            name: 'loginlog',
            meta: {
              title: "登录日志",
            },
          },
          {
            path: 'updatepass',
            component: () => import('@/views/systemManage/updatePass/index'),
            name: 'updatepass',
            meta: {
              title: "更改密码",
            },
          },
        ]
      },
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
