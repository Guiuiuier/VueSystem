import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //state仓库存储数据的地方
  state: {
  },
   //修改state的唯一手段
  mutations: {
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
