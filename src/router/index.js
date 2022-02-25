import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/index.vue'
import find from '../views/find/index.vue'
import index from '../layout/index.vue'
import announcement from '../layout/components/The-siderBar/announcement.vue'
Vue.use(VueRouter)

// 引入bootstarp
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


const routes = [
  { path:'/',redirect:'/login/index'},  //重定向

  {
    

    path:'/login/index',
    name:"login",
    component:login,
  },
  {
    path:'/find/index',
    name:'find',
    component:find,
  },
  {
    path:'/index',
    name:'index',
    component:index,
    // 进入主页重定向
    redirect: '/announcement',
    children:[{path:'/announcement',component:announcement}]
  },
  {
    path:'/'
  },
  {
    path:'/announcement',
    name:"announcement",
    component:announcement
  }
]

const router = new VueRouter({
  routes
})

export default router