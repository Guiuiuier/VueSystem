<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table></b-table>
    <!-- 查询 -->
    <!-- <personPagination :theUsers="theUsers"></personPagination> -->
    <personPagination v-if="isRouterAlive"></personPagination>
  </div>
  <!-- </div> -->
</template>

<script>
// import {searchUsers} from '@/api2';
import Navsearch from "@/layout/components/navSearch/Users";
import personPagination from "@/layout/components/personpagination/users";

export default {
    provide(){
      return{reload:this.reload};
  },
  data() {
    return {
// theUsers:[],
       isRouterAlive: true,
   };
    
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
  // searchUsers().then(res=>{
  //     //  转化为对象
  //     //  console.log(res);
  //       let infors=Object.values(res.data)
  //        this.theUsers=infors;
  //    })

  },
   methods: {
        reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
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