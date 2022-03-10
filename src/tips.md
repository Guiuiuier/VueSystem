
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
   3：在api模块 引入后就不需要再this.$router 直接router.push 

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

    bug6：在天气板块因为是组件的缘故会在每一次点击页面的时候就进行网络请求这样当跳转到其他子路由时候，因为这个组件也包含在父组件里的 子路由里的子组件和天气板块是同级关系 会重复调用。如果这时候换了api地址的话 天气板块就无法请求成功 一直后台报错 尽管不影响使用，因为实现已经存进session中了 但还是在天气板块加了一个判断这样就不再报错了。
     
     bug7：偶尔出现登录的时候不显示加载的名字 这是因为api那段的请求网络并不好 亦或者说是我这边挂了代理（用git上传和管理版本的代码 总是因为dns污染的缘故无法请求） 这是偶现的。导致的报错 重新刷新一下即可。 又或者说是组件调用session的时候。 session模块还未创建。 这应该是网络问题。报错 error name   所以。这个问题的解决办法是进入页面加载时间变的稍微长一些。但是这样损失了用户体验。 因为不影响使用暂不进行更改。
  

  bug8：
   post请求难怪一直报错忘了写形参只在data中写了。。 
     这里注意 data是post parmas是get 否则请求不到的哦
   export const newPer=(形参)=>requests({
       突然间忘写了。。。。 找了半天错误。 还以为是后端的问题。明明后端比前端更熟悉些。我还。可恶。
    
    bug9:Vue 传值到后台的时候是接收不到的刚开始使用vue对接后端接口时，PHP后端一直接受不到前端传的参数。找了很久，发现vue请求接口传参的形式是流的方式，因此后端要在接受数据的方面做一些改变。这里我用的是PHP原生方法file_get_contents。
    1.php://input 可以读取http entity body中指定长度的值,由Content-Length指定长度,不管是POST方式或者GET方法提交过来的数据。但是，一般GET方法提交数据 时，http request entity body部分都为空。 
2.php://input 与$HTTP_RAW_POST_DATA读取的数据是一样的，都只读取Content-Type不为multipart/form-data的数据。
3.Coentent-Type仅在取值为application/x-www-data-urlencoded和multipart/form-data两种情况下，PHP才会将http请求数据包中相应的数据填入全局变量$_POST 
4.PHP不能识别的Content-Type类型的时候，会将http请求包中相应的数据填入变量$HTTP_RAW_POST_DATA 
5. 只有Coentent-Type为multipart/form-data的时候，PHP不会将http请求数据包中的相应数据填入php://input，否则其它情况都会。填入的长度，由Coentent-Length指定。 
6.只有Content-Type为application/x-www-data-urlencoded时，php://input数据才跟$_POST数据相一致。 
7.php://input数据总是跟$HTTP_RAW_POST_DATA相同，但是php://input比$HTTP_RAW_POST_DATA更凑效，且不需要特殊设置php.ini 
8.PHP会将PATH字段的query_path部分，填入全局变量$_GET。通常情况下，GET方法提交的http请求，body为空。
    $v=(file_get_contents("php://input"));
   var_dump(json_decode($v,true));

   //php://output
//php://output 是一个只写的数据流， 允许你以 print 和 echo 一样的方式 写入到输出缓冲区。
//php://input 是个可以访问请求的原始数据的只读流。 enctype="multipart/form-data" 的时候 php://input 是无效的。



enctype: 表单数据提交时使用的编码类型，默认使用"pplication/x-www-form-urlencoded"，如果是使用POST请求，则请求头中的content-type指定值就是该值。如果表单中有上传文件，编码类型需要使用"multipart/form-data"，类型，才能完成传递文件数据。
7、file_get_contents("php://input")就可以获取非enctype="multipart/form-data"提交过来的数据

php://input 是个可以访问请求的原始数据的只读流。 POST 请求的情况下，最好使用php://input 来代替 $HTTP_RAW_POST_DATA，因为它不依赖于特定的php.ini指令。 而且，这样的情况下 $HTTP_RAW_POST_DATA 默认没有填充， 比激活 always_populate_raw_post_data 潜在需要更少的内存。 enctype="multipart/form-data" 的时候 php://input 是无效的。



    bug10:
     新增用户页面中没有添加对后端验证和前端输入验证的判断 目前先不更新先完成功能再修改 
     provide / inject 组合 实现无刷




     bug11:api引入的方法名要和api写的一样啊。大小写都要区分

     bug12: 同一个页面如果设置了默认的axios地址的话 可能会有冲突把默认的修改就不会出现 /api/api2这种情况了


      bug13：某公司的数据返回接口是真的。。。。。。
       'var returnCitySN = {"cip":xxx};'
       要转换一下 匹配第一个{ 和最后一个 取出来键值对}
    方法二：axios默认使用payload形式提交数据，通过payload形式的数据php $_post无法接受前端提交的数据，要想后端接受post提交的数据，就要进行参数设置：
     改成Form Data流即可


     bug14 解决vue多个路由共用一个页面的问题
     watch:{
 "$route":function(to,from){
   //from 对象中包含当前地址
   //to 对象中包含目标地址
   //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
 }
}
     官方给出的方法是通过 watch 监听路由变化，做判断路由路径然后调用响应的方法
     


     // var 是全局或者是函数级的
          先 let 后 var
        var a=v
         fn(){
            let a=v
         }
         会报错 因为这var a 作用于整个函数 和let冲突了
        先 var 后let    大->小 没问题

         普通函数this指向全局
         对象函数 哪个函数调用就是那个
          let boj{
             id:1
             func(){
                console.log(this.id)
                 是指向obj的
             }
          }

          /*需要注意的情况*/
let obj1={
    a:111
}
let obj2={
    a:222,
    fn:function(){
        console.log(this.a);
    }
}
obj1.fn=obj2.fn;
obj1.fn();  //111
虽然 obj1.fn 是从 obj2.fn 赋值而来，但是调用函数的是 obj1 ，所以 this 指向 obj1 。
let subClass1=new structureClass();
subClass.name='成才';
console.log(subClass.name);
在构造函数里面返回一个对象，会直接返回这个对象，而不是执行构造函数后创建的对象

apply和call简单来说就是会改变传入函数的this。

let obj1={
    name:'程新松'
};
let obj2={
    name:'saucxs',
    fn:function(){
        console.log(this.name);
    }
}
obj2.fn.call(obj1); //指向obj1


首先不得不说，ES6 提供了箭头函数，增加了我们的开发效率，但是在箭头函数里面，没有 this ，箭头函数里面的 this 是继承外面的环境。
  如果里面没有会向上查找

直接打印formdata 只会显示formdata原生方法 你要看数据要用formdata.get(key)

bug15：
在上传板块中 由于axios默认是payload的 要改成form data 格式就要在axios 请求头中添加formdata格式



安装打包依赖  babel-plugin-transform-remove-consle 会移除所有consle
babel.config 设置
通过vue.config.js 修改webpack默认配置 隐藏所有webpack默认的配置项 


module.exports={

   //选项  可以参考官方文档
}

使用chainwebpack 可以修改默认打包入口 在vue.config.js中  默认是src/main.js  可以设定两种模式 开发模式为src/main.js
发布模式为 src/main-prod.js  chainwebpack通过链式编程  configurewebpack通过操作对象的方式 来修改

优化依赖项 通过externals 加载外部cdn资源

      注册组件 使用components注册的组件接收的是一组对象 只不过是简化的语法 相当于 componentsa:compoentsa  组件


      bug 17 史诗级bug 折磨了我3天。   如果传递的是对象 data那边绝对不可以加{} 因为这个就表示对象如果加了  还出现{{}}输出的控制台

            uploadFile(formData).then(res => {
          console.log(res);
      });
        
        // axios({
        //   method:'post',
        //   url:'/personnelInfo/contract/upload.php',
        //   data:formData,
        //    headers: {
        //   'Content-Type': 'multipart/form-data', // 关键
        // },
        // }).then(res=>{
        //    console.log(res);
        // })
      //   alert(JSON.stringify(this.newforms));
      这样都是可以写的

      邪门得很 总之要是有二进制的文件就不要加{{对象}} 要data：formdata


              
        // axios({
        //   method:'post',
        //   url:'/personnelInfo/contract/upload.php',
        //   data:formData,
        //    headers: {
        //   'Content-Type': 'multipart/form-data', // 关键
        // },
        // }).then(res=>{
        //    console.log(res);
        // })

        bug18:
        php中eregi,php – 函数eregi()已弃用  使用preg_match

        bug19:
        下载bug
        
        // createObjectURL 函数，接受的参数是blob 类型或者是File 类型。 
//  因为res.data 响应头是blob 已经是一个blob Object 了，完
// 全不需要再像 let url = window.URL.createObjectURL(new Blob([res.data]))载入
//或者是使用百度所说的base64 转码。
//  这种写法繁杂了
        // let blob=new Blob([res],{type:'file'});
        // const downloadElement =document.createElement('a');
        // const href=window.URL.createObjectURL(blob);
        // console.log(blob,downloadElement,href);
        // downloadElement.href=href;
        // console.log(downloadElement.href)
        // downloadElement.download=`想问的问题.docx`;
        // document.body.appendChild(downloadElement)
        // downloadElement.click();
        // document.body.removeChild(downloadElement);
        // window.URL.revokeObjectURL(href);



bug20
          console.log(res);
        let infors=Object.values(res.data)
         this.perInformations=infors;

         如果前端再转换对象的时候 不成功记得看一下后端的输出控制台给注销掉没 否则无法转换 有多于数据干扰