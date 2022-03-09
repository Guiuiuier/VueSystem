<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table>adasdas</b-table>
    <!-- 查询 -->
    <personPagination :theFiles="theFiles"></personPagination>
  </div>
  <!-- </div> -->
</template>

<script>
import {Fileinfors} from '@/api2';
import Navsearch from "@/layout/components/navSearch/contract";
import personPagination from "@/layout/components/personpagination/contract";

export default {
  data() {
    return {
theFiles:[],
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
  Fileinfors().then(res=>{
      //  转化为对象
      //  console.log(res);
        let infors=Object.values(res.data)
         this.theFiles=infors;
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