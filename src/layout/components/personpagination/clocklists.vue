<template>
  <div>
    <b-card-group deck style="padding:50px">
      <b-card bg-variant="info" text-variant="white" header="申请中的请假" class="text-center">
        <b-card-text>{{jxNum}}</b-card-text>
      </b-card>

      <b-card bg-variant="success" text-variant="white" header="已完成的请假" class="text-center">
       <!-- <b-col>当前暂未解决Vuex关掉页面后的问题，应该改用查询数据库，避免重复打卡</b-col><br> -->
        <b-card-text>{{wcNum}}</b-card-text>
      </b-card>

      <b-card bg-variant="danger" text-variant="white" header="打卡状态" class="text-center">

        <b-col>迟到一次扣50元，早退50元， 完成一次完整上下班计入一次正常上班。缺少上下班打卡记为当天不出勤</b-col><br>
        <b-card-text>上班未打卡: {{sbdkNum}}</b-card-text>
        <b-card-text>下班未打卡: {{xbdkNum}}</b-card-text>
      </b-card>
            <b-card bg-variant="info" text-variant="white" header="当月迟到及完整出勤记录" class="text-center">
        <b-col>迟到次数（完成一次上下班打卡）</b-col>
        <b-card-text> {{sbdkNum}}</b-card-text>
        <b-col>完整出勤次数（完成一轮上下班为一次）</b-col>
        <b-card-text> {{xbdkNum}}</b-card-text>
      </b-card>
    </b-card-group>


    <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="10"></MyLists>
  </div>
</template>

<script>
// 兄弟间传值
// var index = "";
import MyLists from "@/components/list/index";

import { Clocklists, vacationLists, isClock } from "@/api2";
import searchPerTravel from "@/layout/components/sameLevelJS/search";
export default {
  data() {
    return {
      jxNum: "",
      wcNum: "",
      sbdkNum: "",
      xbdkNum: "",
      bordered: true,
      fixed: true,
      items: [],
      newforms: {},
      thedata: [],

      tableSection: [
        // { key: "id", label: "#", sortable: true },
        { key: "idPer", label: "员工编号", sortable: true },
        { key: "namePer", label: "员工姓名", sortable: true },
        { key: "clockTime", label: "打卡时间", sortable: true },
        { key: "clockState", label: "打卡状态", sortable: true },
        { key: "clockType", label: "打卡类型", sortable: true }
      ]
    };
  },
  components: {
    MyLists
  },


  created() {
    // 触发钩子
    let local = localStorage.getItem("user_info");
    let id = JSON.parse(local).idPer;
    Clocklists(id).then(res => {
      if (res.data != "") {
        this.thedata = res.data;
      }
    });

    let idPer = JSON.parse(local).idPer;
    vacationLists(idPer).then(res => {
      let jx = 0;
      let wc = 0;
      for (let i = 0; i < res.data.length; ++i) {
        if (res.data[i].state == "进行中") {
          jx = jx + 1;
        }
        if (res.data[i].state == "已完成") {
          wc = wc + 1;
        }
      }
      this.jxNum = jx;
      this.wcNum = wc;
    });

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    let clockTime = year + "-" + month + "-" + day;
    isClock(clockTime, idPer)
      .then(res => {
        let sbdk = 1;
        let xbdk = 1;
        for (let i = 0; i < res.data.length; ++i) {
          if (res.data[i].clockType == "上班打卡") {
            if(sbdk>0){
            sbdk = sbdk - 1;
            }
          } else {
            this.sbdkNum = sbdk;
          }
          if (res.data[i].clockType == "下班打卡") {
            if(xbdk>0){
            xbdk = xbdk - 1;
            }
            // console.log(xbdk);
          } else {
            this.xbdkNum = xbdk;
          }
        }
        this.sbdkNum = sbdk;
        this.xbdkNum = xbdk;
      })
      .catch(err => {
        let sbdk = 1;
        let xbdk = 1;
        this.sbdkNum = sbdk;
        this.xbdkNum = xbdk;
      });
  }
};
</script>

<style lang="less" scoped>
</style>