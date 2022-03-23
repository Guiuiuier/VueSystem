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
  // {
  //     path:'/dd',
  //     name:"dd",
  //     component:()=>import('@/views/login/dd.vue'),
  // },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login/index.vue'),

  },
  //空白页
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
    children: [{
        path: 'announcemain',
        // component:announcemain,
        component: () => import('@/views/announceMain/index'),
        redirect: 'announcemain/announce',
        name: "announcemain",
        meta: {
          title: "公司公告",
        },
        children: [

          {
            path: 'announce',
            component: () => import('@/views/announceMain/announce/index'),
            name: 'announce',
            meta: {
            },

          },

          {
            path: 'content/:id',
            component: () => import('@/views/announceMain/content/index'),
            name: 'content',
            meta: {
              title: "公告内容",
            },


          },
          {
            path: 'newannounce',
            component: () => import('@/views/announceMain/newAnnounce/index'),
            name: 'newannounce',
            meta: {
              title: "新增公告",
            },


          },
          {
            path: 'editannounce/:id',
            component: () => import('@/views/announceMain/editAnnounce/index'),
            name: 'editannounce',
            meta: {
              title: "编辑内容",
            },


          },
        ],
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
        redirect: 'attendanceMain/mySign',
        name: "attendancemain",
        meta: {
          title: "考勤管理",
        },
        children: [{
            path: 'mysign',
            component: () => import('@/views/attendanceMain/mySign/index'),
            name: 'mysign',
            meta: {

            }
          },
          {
            path: 'myattendance',
            component: () => import('@/views/attendanceMain/myattendance/index'),
            name: 'myattendance',
            meta: {
              title: "我的考勤",
            },
            children: [{
                path: 'myleave',
                component: () => import('@/views/attendanceMain/myLeave/index'),
                name: "myleave",
                meta: {
                  title: "我的请假",
                },
                children:[              {
                  path:'myleaveinfors/:id',
                  component:()=>import('@/views/attendanceMain/requestContent/index'),
                  name:'myleaveinfors',
                  meta:{
                    title:"请假内容",
                  }
                },
                              {
                path: 'editMyleaveinfors/:id',
                component: () => import('@/views/attendanceMain/requestEdit/index'),
                name: "editMyleaveinfors",
                meta: {
                  title: "员工审批",
                }
              },
  ]
              },
              // {
              //   path: 'approval',
              //   component: () => import('@/views/attendanceMain/leaveApproval/index'),
              //   name: "approval",
              //   meta: {
              //     title: "员工审批",
              //   }
              // },
            ]
          },


        ]
      },

      {
        path: 'filemain',
        component: () => import('@/views/fileMain/index'),
        redirect: 'fileMain/Emcontract',
        name: 'filemain',
        meta: {
          title: "文件管理"
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

            },
          },
        ],

      },
      {
        path: 'systemmanage',
        component: () => import('@/views/systemManage/index'),
        redirect: 'systemManage/updatePass',
        name: "systemmanage",
        meta: {
          title: "系统管理",
        },
        children: [{
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
            meta: {},
          },
          {
            path: 'users',
            component: () => import('@/views/systemManage/Users/index'),
            name: 'users',
            meta: {
              title: "用户管理",
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
