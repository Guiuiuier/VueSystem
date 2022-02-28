
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
    ：在api模块 并不是说这个模块不对 而是引入后就不需要再this.$router 直接router.push 

   bug2:
      login页面提交的时候  表单按钮第一次会失败axios 请求后续成功   这个bug是我debug最长的大约一个小时问题就出现在bootstarp框架自己的身上
         每次提交的时候总要在网址处 出现个?才会生效 否则怎么样都不会生效的 这里如果只是想用他的样式而不是表单 建议改为div 否则axios请求then是不会进入的！！
              曹 最新更新----
                  取消一下默认事件就可以了。。妈的，，   已经改了三个消失了目前。。  event ||window.event 用来兼容ie的  preventdefault()方法取消就可以了。
        
        bug3:
        如果安装好环境请求的网络出错的话。大概率是你安装环境的端口不对你再看看 算了自己写的php接口不知道为什么报axios network error 解决了一晚上解决不了放着
         好了第二天凌晨三点现在终于弄好了。 要在猝死的边缘徘徊了。。 就是vue.config.js文件配置完后一定要重启。但是前端这东西 入了行没人想关机的。 启动服务浪费时间没想到恰恰是因为这个。。。。。。。。 跨域问题解决！安心睡觉

  
      bug4:
      父传给子组件的时候要记得用watch动态的去接收 不然会丢失

       bug5:同级间的组件通过一个父组件将js文件暴露出去 这样就可以实现兄弟间的通信了 然后在使用常规的父子间传值 使用emit和on 接收  发送和接收的名字要相同
       同级组件不能直接传值，需要一个中间桥梁，可以先将数据传递给公共的父组件，然后父组件再将数据传递给需要的子组件。
       js文件很简单就这样 import Vue from 'vue'
        export default new Vue()
           或者用Vuex也可以。不过我这里第一时间没想到这个 代码已经写完了就这样子吧
    他妈的。记得看一下那个JS文件 有没有写错代码 大小写 报错一整天

 即可
          bug5: Error in created hook: "TypeError: _layout_components_navSearch_personsearch__WEBPACK_IMPORTED_MODULE_2___default.a.$on is not a function"

     记得引入的文件要加入大括号 {}  import {searchPerTravel} from '@/layout/components/navSearch/personsearch'

  
      注册组件 使用components注册的组件接收的是一组对象 只不过是简化的语法 相当于 componentsa:compoentsa  组件