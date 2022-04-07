<template>
  <div>
    <b-container fluid>
      <b-form>
        <b-modal v-model="show" title="发放确认">
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <b-col cols="6">基本工资</b-col>
              <b-col cols="6">津贴</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.basicSalary" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.allowance" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">本月全勤天数</b-col>
              <b-col cols="6">迟到次数</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="comattendance" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="lateNumber" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">早退次数</b-col>
              <b-col cols="6">个税扣除（抖音教的）</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="leaveEarly" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="geshui" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">发放月份</b-col>
              <b-col cols="6">五险一金(抖音教的)</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="thismonth" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="wuxianyijin" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="12">总计</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="12">
                <b-form-group>
                  <b-form-input id="input-1" v-model="totalMoney" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
          <template #modal-footer>
            <div class="w-100">
              <p class="float-left">一经发放无法取消，请确认后发放</p>
              <b-button
                type="submit"
                variant="primary"
                size="sm"
                class="float-right"
                @click="sub"
              >确定</b-button>
            </div>
          </template>
        </b-modal>
      </b-form>
      <div class="overflow-auto" style="padding:20px">
        <b-col>
          计算方法:基本工资/30*全勤天数+津贴-(迟到次数+早退次数)*20-五险一金（综合工资*（0.105+0.12))-个税((综合工资-五险一金-5000（起征税）*0.03))+其他
          <br />tips:当输入的内容不是数字的时候后会默认输入的内容为0，并且仅显示在职员工。防止恶意操作
        </b-col>
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
import {
  alluser,
  updatePerWages,
  deletPer_wages,
  Emclock,
  insertsalary
} from "@/api2";

export default {
  inject: ["reload"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    // 60
    minDate.setDate(60);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      items: [],
      newforms: {
        id: "",
        allowance: 0,
        basicSalary: 0,
        perId: ""
      },
      roleid: "",

      //   工资发放
      totalMoney: 0,
      comattendance: 0,
      leaveEarly: 0,
      lateNumber: 0,
      wuxianyijin: 0,
      geshui: 0,
      thismonth: 0,
      position: "",
      part:"",

      isShow: true,
      isShow2: false,
      thedata: [],
      show: false,
      tableSection: [
        { key: "roleid", label: "员工编号", sortable: true },
        { key: "part", label: "部门", sortable: true },
        { key: "position", label: "职位" },
        { key: "hireTime", label: "入职时间" },
        { key: "basicsalary", label: "基本工资" },
        { key: "allowance", label: "津贴" },
        // {key:"chidao",label:"本月迟到次数"},
        // {key:"zaotui",label:"本月早退次数"},
        // {key:"geshui",label:"个税扣除"},
        // {key:"quanqin",label:"全勤奖"},
        // {key:"quanqinday",label:"出勤天数"},
        { key: "actions", label: "操作", tdClass: "align-middle" }
      ]
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    // 清空离职时间

    sub: function() {
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认发放吗？").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        let salaryTime =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minutes +
          ":" +
          second +
          "";
        if (flag === "true") {
          insertsalary(
            this.roleid,
            this.position,
            this.newforms.basicSalary,
            this.newforms.allowance,
            this.lateNumber,
            this.leaveEarly,
            this.geshui,
            this.comattendance,
            this.thismonth,
            salaryTime,
            this.totalMoney,
            this.part
          ).then(res => {
            // console.log(res.data);
            this.show=false;
            setTimeout(()=>{
                this.reload();
            },500)
          });
        } else {
          return false;
        }
      });
    },

    // 获取编辑内容
    perUpdate: function(item) {
        this.roleid=item.roleid;
        this.part=item.part;
      this.position = item.position;
      let regex1 = /(?:\()(.*)(?:\))/i; //正则括号的内容有点奇怪，但是能用
      let roleid = item.roleid.match(regex1)[1];
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      let thisMonth = year + "-" + month;
      // console.log(thisMonth);
      // return false;
      Emclock(roleid, thisMonth).then(res => {
        if (res.data[0] != undefined) {
          this.comattendance = res.data[0].comattendance;
          this.lateNumber = res.data.lateNumber;
          this.leaveEarly = res.data[0].leaveEarly;
          let money =
            (this.newforms.basicSalary / 30) * this.comattendance +
            parseInt(this.newforms.allowance) +
            (this.lateNumber + this.leaveEarly) * 20;
          let wuxianyijin = money * (0.105 + 0.12);
          this.wuxianyijin = wuxianyijin.toFixed(2);
          // 5000起征税
          let geshui = 0;
          if (money >= 5000) {
            geshui = (money - this.wuxianyijin - 5000) * 0.03;
            this.geshui = geshui.toFixed(2);
          } else {
            geshui = 0;
          }
          this.totalMoney = (money - this.wuxianyijin - this.geshui).toFixed(2);
          // this.totalMoney=
          this.thismonth = month - 1;
          this.comattendance = res.data[0].comattendance;
          // console.log(res.data);
          this.leaveEarly = res.data[0].leaveEarly;
          if (res.data.lateNumber == null) {
            this.late = 0;
          } else {
            this.late = res.data.lateNumber;
          }
        } else {
          this.comattendance = 0;
          this.leaveEarly = 0;
          this.lateNumber = 0;
          this.geshui = 0;
          this.wuxianyijin = 0;
          this.totalMoney = 0;
          this.month = 0;
        }
      });

      var event = event || window.event;
      event.preventDefault();
      this.newforms.allowance = item.allowance;
      this.newforms.basicSalary = item.basicsalary;
      //   this.newforms.perId = item.idPer;
      //   this.newforms.id = item.id;
      // 调用方法
    }
  },

  created() {
    let local = localStorage.getItem("user_info");
    this.part = JSON.parse(local).part;
    //    console.log(this.part);

    //   console.log(local);
    alluser(this.part).then(res => {
      //   console.log(res.data);
      this.thedata = res.data;
      this.totalPeople = res.data.length;
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