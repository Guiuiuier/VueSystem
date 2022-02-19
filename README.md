# VueHRsystem
基于vue人力资源管理系统
本项目采用 less 需要通过less、less-loader处理
请安装依赖 cnpm install --save less less-loader@5 在文件根目录下输入这个命令 进行处理
安装的时候要注意版本否则会报getoptions is not functions 所以这里安装5版本
npm install vue bootstrap-vue bootstrap  引入bootstrap模板
  目前登录页面是这样的
  ![登录页]public/Introduce image/5902d342247d8ffd3e0bbf7c1b380c9.png
  ![登录页]https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/ff6928a06d706a1bb6263c3771a9c26.png
 项目路由分析
 login:用户登录的主页面
 find:用户找回密码的页面




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
