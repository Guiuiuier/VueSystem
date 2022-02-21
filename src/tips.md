
 package.json中  浏览器自动打开
{
  "name": "demoproject",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve  --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },


在main.js中引入
  import less from 'less' //引入less
  Vue.use(less); //引入less
  import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
  
// app.vue中写入
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//在 index.js中写入
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


 //项目中会有bug 遇到的bug问题 
   bug1：
   1.如果对象是一个null值则json不会转换
   2.在vuex中state在刷新后会重新定义为一个空对象 所以要获取一个本地存储的对象在其中然后在vuex中保存

    bug2：在api模块 并不是说这个模块不对 而是引入后就不需要再this.$router 直接router.push 

   