# VueHRsystem
这个可以用来做新手入门Vue项目  
基于vue人力资源管理系统
 本项目基于 less+axios+webpack+vue+vue bootstrap+vuex技术进行开发
本项目采用 less 需要通过less、less-loader处理
请安装依赖 cnpm install --save less less-loader@5 在文件根目录下输入这个命令 进行处理

安装的时候要注意版本否则会报getoptions is not functions 所以这里安装5版本

bootstrap的版本要4.5.3的否则会样式冲突
npm install vue bootstrap-vue bootstrap@4.5.3  引入bootstrap模板 

 请下载nprogress进度条插件 0.2.0版本  https://github.com/rstacruz/nprogress  作为依赖
   npm install --save nprogress  
   代码使用：Nprogress start()开始进度条
            Nprogress done()  关闭进度条
    //本作者遇到的bug 修复后在 src文件夹下的 tips.md中 有意的朋友可以查看  
****

## 项目流程图
   ![流程图](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B5%81%E7%A8%8B.png)  
## 以下是登录模块的逻辑  
  ![登录逻辑](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/%E7%99%BB%E5%BD%95%E9%80%BB%E8%BE%91.png)  
### 登录页面 
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/5902d342247d8ffd3e0bbf7c1b380c9.png)  
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/ff6928a06d706a1bb6263c3771a9c26.png)  
### 人员管理页面
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%BA%BA%E5%91%98%E6%A8%A1%E5%9D%97.png)   
#### 搜索
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%90%9C%E7%B4%A2%E6%9D%BF%E5%9D%97.png)   
#### 添加
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B7%BB%E5%8A%A0%E6%9D%BF%E5%9D%97.png)   
#### 编辑
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E7%BC%96%E8%BE%91%E6%9D%BF%E5%9D%97.png)   
#### 上传
  ![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8A%E4%BC%A0.png)   
####登陆日志  
  ！[denglu](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8A%E4%BC%A0.png)  
    增加了了登录验证功能，例如添加了路由守卫 防止用户恶意进行token修改或者不通过token就进入后端  


## tips
 package.json中  浏览器自动打开  
{  </br>
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
  
