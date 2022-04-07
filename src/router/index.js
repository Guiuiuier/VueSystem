import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../layout/index.vue'
//此时路由懒加载不用再这样加载了
// import announcemain from '@/views/announceMain/index'
Vue.use(VueRouter)

// 引入bootstarp
import {
  BootstrapVue,
  IconsPlugin,
  TabsPlugin
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

export const routes = [{
      path: '/',
      redirect: '/login',
      roles:['1','2']
    }, //重定向

    {
      path: '/login',
      name: "login",
      component: () => import('@/views/login/index.vue'),
      meta:{
        roles:['1','2']
      }
    },
    //空白页
    {
      path: '/find',
      name: 'find',
      component: find,
      component: () => import('@/views/find/index.vue'),
      meta:{
        roles:['1','2']
         }
    },

    {
      path: '/index',
      name: 'index',
      component: index,
      // 进入主页重定向
      // redirect: '/index/announcemain',
      meta: {
        title: "主页",
        roles:['1','2']
      },
      children: [{
          path: 'announcemain',
          // component:announcemain,
          component: () => import('@/views/announceMain/index'),
          redirect: 'announcemain/announce',
          name: "announcemain",
          meta: {
            title: "公司公告",
            roles:['1','2']
          },
          children: [
            {
              path: 'announce',
              component: () => import('@/views/announceMain/announce/index'),
              name: 'announce',
              meta: {
                roles:['1','2']
              },

            },

            {
              path: 'content/:id',
              component: () => import('@/views/announceMain/content/index'),
              name: 'content',
              meta: {
                title: "公告内容",
                roles:['1','2']
              },


            },
            {
              path: 'newannounce',
              component: () => import('@/views/announceMain/newAnnounce/index'),
              name: 'newannounce',
              meta: {
                title: "新增公告",
                roles:['1']
              },


            },
            {
              path: 'editannounce/:id',
              component: () => import('@/views/announceMain/editAnnounce/index'),
              name: 'editannounce',
              meta: {
                title: "编辑内容",
                roles:['1']
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
            roles:['1']

          },
        },

        {
          path: 'attendancemain',
          component: () => import('@/views/attendanceMain/index'),
          redirect: 'attendanceMain/mySign',
          name: "attendancemain",
          meta: {
            title: "考勤管理",
            roles:['1']

          },
          children: [{
              path: 'mysign',
              component: () => import('@/views/attendanceMain/mySign/index'),
              name: 'mysign',
              meta: {
                roles:['1','2']

              }
            },
            {
              path: 'myattendance',
              component: () => import('@/views/attendanceMain/myattendance/index'),
              name: 'myattendance',
              meta: {
                title: "我的考勤",
                roles:['1','2']

              },
              children: [{
                  path: 'myleave',
                  component: () => import('@/views/attendanceMain/myLeave/index'),
                  name: "myleave",
                  meta: {
                    title: "我的请假",
                    keepAlive: true,
                    roles:['1','2']

                  },
                  children: [{
                      path: 'myleaveinfors/:id',
                      component: () => import('@/views/attendanceMain/requestContent/index'),
                      name: 'myleaveinfors',
                      meta: {
                        title: "请假内容",
                        keepAlive: true,
                        roles:['1','2']

                      }
                    },
                    {
                      path: 'editMyleaveinfors/:id',
                      component: () => import('@/views/attendanceMain/requestEdit/index'),
                      name: "editMyleaveinfors",
                      meta: {
                        title: "编辑内容",
                        keepAlive: true,
                        roles:['1','2']
                      }
                    },
                  ]
                },
                {
                  path: 'approval',
                  component: () => import('@/views/attendanceMain/leaveApproval/index'),
                  name: "approval",
                  meta: {
                    title: "员工审批",
                    keepAlive: true,
                    roles:['1']
                  }
                },
              ]
            },


          ]
        },
        {
          path: 'partment',
          component: () => import('@/views/partment/index'),
          redirect: 'partment/mypartment',
          name: 'partment',
          meta: {
            title: "部门管理",
            roles:['1']
          },
          children: [{
            path: 'mypartment',
            component: () => import('@/views/partment/mypartment/index'),
            name: 'mypartment',
            meta: {
              title: "",
              roles:['1']
            }
          }]
        },
        {
          path: 'salary',
          component: () => import('@/views/salary/index'),
          redirect: 'salary/mysalary',
          name: 'salary',
          meta: {
            title: "薪资管理",
            roles:['1','2'],
            keepAlive:true,
          },
          children: [{
              path: 'mysalary',
              component: () => import('@/views/salary/mysalary/index'),
              name: 'mysalary',
              meta: {
                title: "我的薪资",
                roles:['1','2'],
                keepAlive:true,
              },
            },
            {
              path: 'partsalary',
              component: () => import('@/views/salary/partsalary/index'),
              name: 'partsalary',
              meta: {
                title: "部门薪资管理",
                roles:['1'],
                keepAlive:true,
              }
            }
          ]
        },

        {
          path: 'filemain',
          component: () => import('@/views/fileMain/index'),
          redirect: 'fileMain/Emcontract',
          name: 'filemain',
          meta: {
            title: "文件管理",
            roles:['1']
          },
          children: [{
              path: 'contract',
              component: () => import('@/views/fileMain/contract/index'),
              name: 'contract',
              meta: {
                title: "合同模板",
                roles:['1','2']
              },
            },
            {
              path: 'emcontract',
              component: () => import('@/views/fileMain/Emcontract/index'),
              name: 'emcontract',
              meta: {
                roles:['1']
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
            roles:['1','2']
          },
          children: [{
              path: 'loginlog',
              component: () => import('@/views/systemManage/loginLog/index'),
              name: 'loginlog',
              meta: {
                title: "登录日志",
                roles:['1']
              },
            },
            {
              path: 'updatepass',
              component: () => import('@/views/systemManage/updatePass/index'),
              name: 'updatepass',
              meta: {
                roles:['1','2']
              },
            },
            {
              path: 'users',
              component: () => import('@/views/systemManage/Users/index'),
              name: 'users',
              meta: {
                title: "用户管理",
                roles:['1']
              },
            },
          ]
        },
      ]
    },

    {
      path: '/',
      roles:['1','2']
    },

  ]

const router = new VueRouter({
  routes,
});

export default router;
