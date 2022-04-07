<template>
    <div>
    <!-- <Navsearch></Navsearch> -->
    <!-- <personPagination  v-if="isRouterAlive"></personPagination> -->
  <b-tabs content-class="mt-3" lazy>
  <b-tab title="工资条"><b-alert show class="lazyBack"><logNav></logNav><logPer></logPer></b-alert></b-tab>
</b-tabs>
    </div>
</template>
<script>

import logNav from "@/views/salary/mysalary/salaryInfo/navindex";
import logPer from "@/views/salary/mysalary/salaryInfo/perindex";

export default {
    provide(){
        return {reload:this.reload}
    },
    data(){
        return{
         isRouterAlive:true,
        }
    },
    components:{

  logNav,
  logPer,
    },
        methods: {
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true
            })
        }
    },
}
</script>
<style lang="less" scope>
// @import "/public/an_leave.less";
.lazyBack {
  background-color: white;
  border-bottom: none;
//   padding: 0;
}

</style>