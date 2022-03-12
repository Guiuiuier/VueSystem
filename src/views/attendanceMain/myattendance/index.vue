<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table>adasdas</b-table>
    <!-- 查询 -->
    <personPagination :theLists="theLists" v-if="theshow"></personPagination>  </div>
  <!-- </div> -->
</template>

<script>
import { Clocklists } from "@/api2";
import Navsearch from "@/layout/components/navSearch/loginLog";
import personPagination from "@/layout/components/personpagination/clocklists";
// import personpaginationUnormal from "@/layout/components/personpagination/UnormalLocklists"
export default {
  data() {
    return {
      //留着做上下班打卡正常异常的模块
      theshow: true,
      theLists: []
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
    let local = localStorage.getItem("user_info");
    let id = JSON.parse(local).idPer;
    let clockstate = "正常";
    Clocklists(id, clockstate).then(res => {
      //  转化为对象
      //  console.log(res);
      let infors = Object.values(res.data);
      this.theLists = infors;
      console.log(this.theLists);
    });
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>