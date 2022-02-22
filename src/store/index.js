import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 
 //刷新页面会丢失对象
 //此时有可能是空对象即还没有登录的时候 就可能是空的 
 //这个是保存登录状态的
 let userinfo=(localStorage.getItem("user_info"));
 //空对象 json不会自己转换 不会报错如果加了个{}会报错 因为对象无法转换成对象
 //改为json格式 就可以调用对象了
 userinfo=JSON.parse(userinfo)
   //提取token里的账号密码
  //  let stateUserName=userinfo.username;
  //  let stateUserPass=userinfo.userpass;
    // console.log(stateUserName);
// console.log(userinfo);
export default new Vuex.Store({
  //state仓库存储数据的地方
  state: {
    userinfo, //这里不要改成空对象了 不然会出问题 存储信息token
  },
   //修改state的唯一手段
  mutations: {
      //更改userinfo
  SET_USERINFO(state,payload){
    state.userinfo=payload;
  },
  },
  //处理action 可以书写自己的业务逻辑 也可以处理异步
  actions: {
  },
  //getters 理解为计算数据 用于简化数据仓库数据  让组件获取仓库的数据更方便
  getters:{

  },
  modules: {
  }
})