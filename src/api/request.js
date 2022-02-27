//引入 axios
import axios from "axios";
//引入路由
import router from "../router";
// 引入进度条
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//判断环境如果是developement 用api 如果是上线则用右边的地址请求
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://rap2api.taobao.org/app/mock/298235"

//创建请求拦截器  可以给每个请求到携带想要传递的内容 为啥要这样写呢 总不能每次请求登录都要发一个token吧 先保存到本地然后通过拦截 返回一个config值
//功能就是 如果你第一次登录的时候登录上了就会返回一个token 第二次退出登录的时候就不用再登录了 直接将第一次的token拿来用 节省了服务器资源
//登录和注册是不需要携带token的 直接用这个登录就OK 
axios.interceptors.request.use(config => {
  //config是每个请求对象 相当于axios请求  request发送请求
  // 路由进度条api调用的时候就运行
 Nprogress.start()
  if (config.url == '/user') {
    //  如果已经有本地存储的token 这时候就不需要携带token user是服务器接口请求
    //放行
    return config
  } else {
    //  console.log(config);
    let token = localStorage.getItem('user_token') //获取本地token
    config.headers['authorization'] = token; //添加token到header 里面的名称随意 放到header中是为了方便后端请求
    //放行
    return config;
  }
//   console.log(config);

});

//进行服务器校验 如果校验的token是和服务器的一样则进入

axios.interceptors.response.use(config => {
  // 路由进度条api调用的时候就运行
    //response响应请求
     Nprogress.done()
  //   console.log(config);
  let {
    data
  } = config;
//   console.log(config);
  //   //如果本地的token 和服务器token一样则放行 否则不放行 但是由于作者的服务器是虚拟的服务器 无法调用传递进来header的token 让后端返回一个错误代码是不可能的所以只能先写好模板
  //200-300之间的请求都是可以通过的这里假设错误的为303 作者在这里的虚拟服务器上虚拟的返回了一个状态码
   //当然如果有大佬还能添加一个session而不是token  大可在 判断语句中 加|| ！    
  //  data.status 改为data.code==303即可使用了 这里为了方便假设通过。因为没真实服务器做返回值  
  if (data.status == '303') {
    //     //   此时就不用$了因为已经拿到了 否则会报错的
    alert("登录信息失效，重新登陆!");
    router.push({
      path: '/login/index',
      name: "login",
    });
    //此时在这里还是会报错的 但是不影响使用 因为这是多次重定向路由报的错
    //  console.log(router);
  }
  //   //如果token相等 则无需登录跳转
  return config;
})
axios.create({
  timeout: 4000,
  withCredentials: true // 开启携带认证允许跨域携带cookie信息
});
export default axios; //暴露






