<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table></b-table>
    <personPagination :personnelInfors="personnelInfors"></personPagination>
  </div>
  <!-- </div> -->
</template>

<script>
import {personnelInfo} from '@/api2';
import axios from "axios"
import Navsearch from "@/layout/components/navSearch/index";
import personPagination from "@/layout/components/personpagination/index";
export default {
  data() {
    return {
      personnelInfors:[],
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
     personnelInfo().then(res=>{
      //  转化为对象
      //  console.log(res);
        let infors=Object.values(res.data)
         this.personnelInfors=infors;
          // console.log(infors);
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