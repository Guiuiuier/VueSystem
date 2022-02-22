import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less' //引入less
Vue.use(less); //引入less
// 引入 bootstrap
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../public/login.css'
import axios from 'axios'

 //前置钩子，就是导航守卫 guard，干嘛的 防止一些调皮的用户跳过登录啥的没验证状态就进系统了！
 router.beforeEach((to,from,next) =>{
  //  next() //放行用的这个next
  //  console.log(to); //去的页面
  //  console.log(from);  //来自的页面 很简单别问
       
     //这里的项目逻辑就是用户登录之后 如果有本地的token 则直接登录 没有则跳回到登录页面
      let token=localStorage.getItem("user_token");
       if(token){
          //如果是登录页面 直接放行 如果是进入后台则异步token
            next()
       }else {
           //如果没有 这个人访问的路径是登录页面 或者找回页面放行 
             //但是此时我认为还是有问题的 例如 假如有人修改token 不就直接进去了 所以这里加入服务器拦截！ 写到 api 中了
            if(to.path==='/login/index'||to.path==='/find/index'){
              // alert("大哥登录一下吧");
              next();
            }else{
               next({path:'/login/index'});
            };
             
       } 
 });
 
Vue.config.productionTip = false
 
new Vue({
  router,
  store, //注册仓库
  render: h => h(App)
}).$mount('#app')
