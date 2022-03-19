<template>
  <div>
    <!-- <pre class="m-0">{{ newforms }}</pre> -->
    <!-- 内容框 -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
          <b-button size="sm" class="my-2 my-sm-0" variant="info" type="submit" @click="myLeave">我的请假管理</b-button>
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            variant="success"
            type="submit"
            @click="leaveManage"
          >员工请假审批管理</b-button>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style lang="css" scoped>
.bg-info {
  background-color: #d6d8db !important;
}
.text-muted,
.form-text {
  background-color: gray !important;
}
</style>
 <script>
// import { clockIn } from "@/api2";
export default {
  data() {
    return {

      show: false,
      sucessShow: false
    };
  },
  methods: {
  leaveManage:function(){
  this.$router.push("/index/attendancemain/myattendance/approval");
  },
  myLeave:function(){
    this.$router.push("/index/attendancemain/myattendance/myleave");
  }

  },
  created() {
    
  },


  mounted() {
    //
    // let afterFlag=sessionStorage.getItem("afterFlag");
    // console.log(afterFlag);
  },

};
</script>