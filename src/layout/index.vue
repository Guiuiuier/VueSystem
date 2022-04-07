<template>
  <div class="Maincontent">
    <div class="sider">
      <siderBar></siderBar>
    </div>
    <div class="navigation">
      <navigationBar :weathers="weathers" :userinfo="userinfo" v-if="flag"></navigationBar>
    </div>
    <div class="sysmain">
      <sysMain :infoName="infoName"></sysMain>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../public/backmain.less";
</style>
<script>
import { getLoginLog, login } from "@/api";
import { mapState } from "vuex";
//引入侧边栏
import siderBar from "@/layout/components/siderBar";
import navigationBar from "@/layout/components/navigationBar";
import sysMain from "@/layout/components/sysMain";
//注册导航栏
//注册内容
export default {
  data() {
    return {
      weathers: {},
      flag: "false",
      // 主页名字
      infoName: {},
      userinfo:{}
    };
  },
  components: {
    //注册侧边栏
    siderBar, //相当于siderBar:siderBar
    navigationBar,
    sysMain
  },
  computed: {},
  created() {
    // //  获取天气请求 存入vuex
    //  if(!sessionStorage.getItem("weather")){
    getLoginLog().then(res => {
      let c = sessionStorage.setItem(
        "weather",
        JSON.stringify(res.data.weather)
      );
      this.weathers = JSON.parse(sessionStorage.getItem("weather"));
      this.userinfo=JSON.parse(localStorage.getItem("user_info"));
      this.flag = true;
    });
    //  }
    // 返回一个对象给子组件
    //传值给子组件

    //传给主页内容

    this.infoName = JSON.parse(localStorage.getItem("user_info"));
  },
  mounted() {},
  methods: {}
};
</script>
