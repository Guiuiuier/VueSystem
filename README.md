# VueHRsystem
vue人力资源管理系统  </br>
 本项目基于 less+axios+webpack+vue+vue bootstrap+vuex+vue router技术进行开发</br>
本项目采用 less 需要通过less、less-loader处理  </br>
请安装依赖 cnpm install --save less less-loader@5 在文件根目录下输入这个命令 进行处理  </br>
安装的时候要注意版本否则会报getoptions is not functions 所以这里安装5版本  </br>
npm install vue bootstrap-vue bootstrap  引入bootstrap模板  </br>
    //本作者遇到的bug 修复后在 src文件夹下的 tips.md中 有意的朋友可以查看</br>
  以下是登录模块的逻辑</br>
  ![登录逻辑](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/%E7%99%BB%E5%BD%95%E9%80%BB%E8%BE%91.png)
  目前登录页面是这样的</br>
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/5902d342247d8ffd3e0bbf7c1b380c9.png)
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/ff6928a06d706a1bb6263c3771a9c26.png)
  </br>
 项目路由分析  </br>
 login:用户登录的主页面  </br>
 find:用户找回密码的页面  </br>
    
    增加了了登录验证功能，例如添加了路由守卫 防止用户恶意进行token修改或者不通过token就进入后端</br>



 package.json中  浏览器自动打开  </br>
{  </br>
  "name": "demoproject",  </br>
  "version": "0.1.0",  </br>
  "private": true,  </br>
  "scripts": {  </br>
    "serve": "vue-cli-service serve  --open",  </br>
    "build": "vue-cli-service build",  </br>
    "lint": "vue-cli-service lint"  </br>
  },  </br>


在main.js中引入  </br>
  import less from 'less' //引入less  </br>
  Vue.use(less); //引入less  </br>
  import 'bootstrap/dist/css/bootstrap.css'  </br>
import 'bootstrap-vue/dist/bootstrap-vue.css'  </br>
  
// app.vue中写入  </br>
import Vue from 'vue'  </br>
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  </br>

//在 index.js中写入  </br>
Vue.use(BootstrapVue)  </br>
Vue.use(IconsPlugin)  </br>
  </br>
