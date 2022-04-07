<template>
  <div>
    <b-container fluid>
      <div class="overflow-auto" style="padding:20px">
        <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="10">
          <template v-slot="{btnid}">
            <b-button type="submit" variant="info" @click="show=true,perUpdate(btnid)">发放</b-button>
            <!-- <b-button variant="danger" @click="perDelet(btnid.id)">删除</b-button> -->
          </template>
        </MyLists>
      </div>
    </b-container>
  </div>
</template>
<script>
// Vue.prototype
import MyLists from "@/components/list/index";
import searchPerTravel from "@/layout/components/sameLevelJS/search";
import { salaryLog_user} from "@/api2";

export default {
  data() {
    return {
      items: [],
      roleid:"",
      thedata: [],
      tableSection: [
        { key: "roleid", label: "员工编号", sortable: true },
        { key: "part", label: "部门", sortable: true },
        { key: "position", label: "职位" },
        // { key: "hireTime", label: "入职时间" },
        { key: "basicsalary", label: "基本工资" },
        { key: "allowance", label: "津贴" },
        {key:"chidao",label:"本月迟到次数"},
        {key:"zaotui",label:"本月早退次数"},
        {key:"geshui",label:"个税扣除"},
        {key:"chuqinday",label:"出勤天数"},
        {key:"salaryMonth",label:"发放月份"},
        {key:"salaryTime",label:"发放时间"},
        {key:"totalMoney",label:"总计金额"},
      ]
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    // 清空离职时间
  },
  created() {
      
    let local = localStorage.getItem("user_info");
    let roleid = JSON.parse(local).roleid;
    salaryLog_user(roleid).then(res => {
     this.thedata = res.data;
    });
  },
  components: {
    MyLists
  },
  mounted() {
    this.rows = this.items.length;
  }
};
</script>

<style lang="less" scope>
td.align-middle {
  width: 70px;
}
.alert alert-info {
  background-color: none;
}
</style>