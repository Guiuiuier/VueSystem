
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

   bug2:
      login页面提交的时候  表单按钮第一次会失败axios 请求后续成功   这个bug是我debug最长的大约一个小时问题就出现在bootstarp框架自己的身上
         每次提交的时候总要在网址处 出现个?才会生效 否则怎么样都不会生效的 这里如果只是想用他的样式而不是表单 建议改为div 否则axios请求then是不会进入的！！
              曹 最新更新----
                  取消一下默认事件就可以了。。妈的，，   已经改了三个消失了目前。。  event ||window.event 用来兼容ie的  preventdefault()方法取消就可以了。
        