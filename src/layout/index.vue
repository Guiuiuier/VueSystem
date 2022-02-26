<template>
  <div class="Maincontent">
    <div class="sider">
      <siderBar></siderBar>
    </div>
    <div class="navigation">
      <navigationBar :weathers="weathers"></navigationBar>
    </div>
    <div class="sysmain">
      <sysMain>
      </sysMain>
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
      weathers: {}
    };
  },
  components: {
    //注册侧边栏
    siderBar, //相当于siderBar:siderBar
    navigationBar,
    sysMain
  },
  computed: {
    ...mapState(["userinfo", "weatherState"]) //映射 刷新后又会变成空对象 是因为在vuex中刷新会重新定义为store/index.js中的空对象 所以要在本地存一个对象
  },
  created() {
    // //  获取天气请求 存入vuex
    // //因为vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，vuex里面的数据就会被重新赋值。
    // //同时为了保证用户的体验这里才用sessionstorage 这样安全性会稍微高些
    getLoginLog().then(res => {
      let c = sessionStorage.setItem(
        "weather",
        JSON.stringify(res.data.weather)
      );
    });
  },
  mounted() {
    // 返回一个对象给子组件
    //传值给子组件
    this.weathers = JSON.parse(sessionStorage.getItem("weather"));
  },
  methods: {}
};
</script>
