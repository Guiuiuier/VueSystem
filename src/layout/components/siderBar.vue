<template>
  <div>
    <!-- 侧边栏以一种不知名的逻辑跑出来了。。。。。。。。就这吧。麻了 -->
    <div class="siderMain">
      <div class="sider">
        <b-button-group vertical>
          <!-- 公告管理 -->
          <announcement></announcement>
          <!-- 人员管理 -->
          <personal v-if="show"></personal>

          <b-button v-b-toggle.collapse-myattend>
            <!-- 考勤 -->
            <attendance></attendance>
          </b-button>
          <!-- 我的考勤 -->
          <mySign></mySign>
          <myattendance></myattendance>
          <!-- 折叠管理 -->
          <div v-if="show">
           <b-button v-b-toggle.collapse-partment>
            <partment></partment>
             </b-button>
             <mypartment></mypartment>
          </div>
               <b-button v-b-toggle.collapse-mysalary>
            <salary></salary>
            </b-button>
            <allsalary v-if="show"></allsalary>
            <mysalary></mysalary>
          <b-button v-b-toggle.collapse-myfile>
            <!-- 文件管理 -->
            <file></file>
          </b-button>
          <!-- 在职员工合同 -->
          <Emcontract v-if="show"></Emcontract>
          <!-- 员工合同 -->
          <contract></contract>
          <!-- 系统管理 -->
          <b-button v-b-toggle.collapse-mysystemmange>
            <systemmanage></systemmanage>
          </b-button>
          <!-- 登陆日志 -->
          <!-- 更改密码 -->
          <updatePass></updatePass>
          <LoginLog v-if="show"></LoginLog>
          <users v-if="show"></users>
        </b-button-group>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "/public/sider.less";
</style>
<script>
import announcement from "./The-siderBar/announcement";
import attendance from "./The-siderBar/attendance";
import personal from "./The-siderBar/personal";
import file from "./The-siderBar/file.vue";
import contract from "./The-siderBar/file/contract";
import Emcontract from "./The-siderBar/file/Emcontract";
import myattendance from "./The-siderBar/attendance/myattendance";
import systemmanage from "./The-siderBar/systemManage";
import LoginLog from "./The-siderBar/systemmange/loginLog";
import updatePass from "./The-siderBar/systemmange/updatePass";
import mySign from "./The-siderBar/attendance/mySign";
import users from "./The-siderBar/systemmange/Users";
import mysalary from "./The-siderBar/salary/mysalary";
import salary from "./The-siderBar/salary";
import allsalary from "./The-siderBar/salary/allsalary";
import partment from "./The-siderBar/partment";
import mypartment from "./The-siderBar/partment/index";
export default {
  data() {
    return {
      show:false,
    };
  },
  components: {
    announcement,
    attendance,
    contract,
    Emcontract,
    file,
    personal,
    myattendance,
    systemmanage,
    LoginLog,
    updatePass,
    mySign,
    salary,
    partment,
    mysalary,
    allsalary,
    mypartment,
    users,
  },
  methods: {},
  mounted() {},
  created() {
          let local=localStorage.getItem("user_info");
      let role=JSON.parse(local).rolepermission;
      if(role=="1"){
          this.show=true;
      }
  },
};
</script>