<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table>adasdas</b-table>
    <!-- 查询 -->
    <personPagination :theUsers="theUsers"></personPagination>
  </div>
  <!-- </div> -->
</template>

<script>
import {searchUsers} from '@/api2';
import Navsearch from "@/layout/components/navSearch/Users";
import personPagination from "@/layout/components/personpagination/users";

export default {
  data() {
    return {
theUsers:[],
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
  searchUsers().then(res=>{
      //  转化为对象
      //  console.log(res);
        let infors=Object.values(res.data)
         this.theUsers=infors;
     })

  },
  mounted() {
     
  },
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>