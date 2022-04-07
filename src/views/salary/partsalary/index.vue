<template>
    <div>
  <b-tabs content-class="mt-3" lazy>
  <b-tab title="员工薪资管理"><b-alert show class="lazyBack"><wagesNav></wagesNav><wagesPer  v-if="isRouterAlive"></wagesPer></b-alert></b-tab>
  <b-tab title="工资发放"><b-alert show class="lazyBack"><payNav></payNav><payPer v-if="isRouterAlive"></payPer></b-alert></b-tab>
  <b-tab title="已发放"><b-alert show class="lazyBack"><logNav></logNav><logPer v-if="isRouterAlive"></logPer></b-alert></b-tab>
</b-tabs>
    </div>
</template>
<script>
import wagesNav from "@/views/salary/partsalary/wages/navindex";
import wagesPer from "@/views/salary/partsalary/wages/perindex";
import payNav from "@/views/salary/partsalary/paySalary/navindex";
import payPer from "@/views/salary/partsalary/paySalary/perindex";
import logNav from "@/views/salary/partsalary/salaryLog/navindex";
import logPer from "@/views/salary/partsalary/salaryLog/perindex";

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
  wagesNav,
  wagesPer,
  payNav,
  payPer,
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