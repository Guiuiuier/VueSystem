import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 
 //刷新页面会丢失对象 所以存到本地后获取这个信息
 let userinfo=JSON.parse((localStorage.getItem("user_info")));

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