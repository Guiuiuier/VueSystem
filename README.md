# 人力资源管理系统
这个可以用来做新手入门Vue项目  虽然写的挺烂的。但好歹功能还是实现了....
基本上vue 全家桶都是用上了的。 但是都是一些很基础的入门知识

 项目上有很多代码逻辑或者说是目录结构设置的并不是特别完好，但总的来说模板是好了的，后期有需要再补上这些坑。  
  
 //遇到的bug 修复后在 src文件夹下的 https://github.com/Guiuiuier/VueSystem/blob/main/src/tips.md 中 有意的朋友可以查看   
 
请安装依赖 cnpm install --save less less-loader@5 在文件根目录下输入这个命令 进行处理  

安装的时候要注意版本否则会报getoptions is not functions 所以这里安装5版本  
bootstrap的版本要4.5.3的否则会样式冲突   
npm install vue bootstrap-vue bootstrap@4.5.3  引入bootstrap模板 

 请下载nprogress进度条插件 0.2.0版本  https://github.com/rstacruz/nprogress  作为依赖  
   npm install --save nprogress  
   代码使用：Nprogress start()开始进度条  
            Nprogress done()  关闭进度条  

//打卡逻辑这个需要根据用户当月的排班来设计不同的打卡逻辑 这里只设计了一个 正常上下班 即早班的规则 9:30 18:30 是上下班时间  并且各种情况都有可能发生 例如 （提早下班？等等 请假？ 等） 
 //逻辑如果最近一次打卡大于前一天打卡 重新设置上下班flag 
**** 
## 项目流程图
   由于目前还在更新阶段 侧边栏的状态是不固定。 固图片信息有稍微的出入 
   截止至目前 
   ![asdasd](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E7%8A%B6%E6%80%81.png)  
   ![流程图](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B5%81%E7%A8%8B.png)  
## 以下是登录模块的逻辑  
  ![逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)  
  ![登录逻辑](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/%E7%99%BB%E5%BD%95%E9%80%BB%E8%BE%91.png)  
  
      增加了了登录验证功能，例如添加了路由守卫 防止用户恶意进行token修改或者不通过token就进入后端  

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

### 合同模板
 #### 编辑
 ![ads](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%BF%AE%E6%94%B9%E4%B8%8B%E8%BD%BD%E4%BF%A1%E6%81%AF.png)  
 #### 下载模板
  ![ads](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8B%E8%BD%BD.png)   
  
  #### 上传模板
  ![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8A%E4%BC%A0.png)  

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
  
