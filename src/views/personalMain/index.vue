<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-table></b-table>
    <!-- <personPagination :perInformations="perInformations" v-if="isRouterAlive"></personPagination> -->
    <personPagination v-if="isRouterAlive"></personPagination>
  </div>
  <!-- </div> -->
</template>

<script>
// import {personnelInfo} from '@/api2';
import Navsearch from "@/layout/components/navSearch/index";
import personPagination from "@/layout/components/personpagination/index";
export default {
  provide(){
      return{reload:this.reload};
  },

  data() {
    return {
      // perInformations:[],
        isRouterAlive: true,
    };
  },
  components: {
    Navsearch,
    personPagination
  },
  created() {
    //  personnelInfo().then(res=>{
    //   //  转化为对象
    //   //  console.log(res);
    //     let infors=Object.values(res.data)
    //      this.perInformations=infors;
    //       // console.log(infors);
    //  })

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