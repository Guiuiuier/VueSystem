import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 
 //刷新页面会丢失对象 所以存到本地后获取这个信息
// JSON 转换成javascript对象
 let userinfo=JSON.parse((localStorage.getItem("user_info")));
//  console.log(userinfo); 
 let weatherState=JSON.parse((sessionStorage.getItem("weather")));
//  console.log(weatherState);
 //读取标志
 let afterWorkFlag=JSON.parse((sessionStorage.getItem("afterFlag")));
let toWorkFlag=JSON.parse((sessionStorage.getItem("toWorkFlag")))
 export default new Vuex.Store({
  //state仓库存储数据的地方
  state: {
    userinfo, //这里不要改成空对象了 不然会出问题 存储信息token
    weatherState, //天气的
     //创建一个下班打卡flag
    afterWorkFlag,
    toWorkFlag,
  },
   //修改state的唯一手段
  mutations: {
      //更改userinfo
  SET_USERINFO(state,payload){
    state.userinfo=payload;
  },
  SET_AFTERWORKFLAG(state,payload){
    state.afterWorkFlag=payload;
  },
  SET_TOWORKFLAG(state,payload){
    state.toWorkFlag=payload;
  }
  // SET_WEATHER(state){
  // }
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