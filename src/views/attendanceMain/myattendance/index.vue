<template>
  <div>
    <Navsearch  v-if="isShow"></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table>adasdas</b-table>
    <!-- 查询 -->
    <personPagination  v-if="isShow"></personPagination>
    <keep-alive>
    
  <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

      </div>
  <!-- </div> -->
</template>

<script>
import Navsearch from "@/layout/components/navSearch/myattendance";
import personPagination from "@/layout/components/personpagination/clocklists";
// import personpaginationUnormal from "@/layout/components/personpagination/UnormalLocklists"
export default {
  data() {
    return {
      isShow:true,
      //留着做上下班打卡正常异常的模块
      // theLists: []
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
       if (this.$route.name === "myleave"||this.$route.name === "myleaveinfors"||this.$route.name==="editMyleaveinfors"||this.$route.name==="approval") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
    // console.log("我是父组件1");
  },
  mounted() {},
  watch: {
    //判断当前路由
    $route(to, from) {
      // console.log(to);
      if (
        to.name === "myleave"||to.name==="myleaveinfors"||to.name==="editMyleaveinfors"||to.name==="approval"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;

      }
    }
  },
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>