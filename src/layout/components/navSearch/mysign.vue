<template>
  <div>
    <!-- <pre class="m-0">{{ newforms }}</pre> -->
    <!-- 内容框 -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <div style="font-size:14px; padding:0 25px 0 0px">当前时间:{{currentTime}}</div>
        <b-col cols="2">
          <b-button size="sm" class="my-2 my-sm-0" variant="info" type="submit" @click="toWork">上班签到</b-button>
        </b-col>
        <b-col cols="2">
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            variant="success"
            type="submit"
            @click="afterWork"
          >下班打卡</b-button>
        </b-col>
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
import { clockIn, isClock, comattendance, clockeventDealy,insertClock } from "@/api2";
// import { mapMutations, mapState } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: "",
      show: false,
      sbdkFlag: true,
      xbdkFlag: true,
      sucessShow: false,
      boxOne: ""
    };
  },
  methods: {
    // ...mapMutations(["SET_AFTERWORKFLAG", "SET_TOWORKFLAG"]),
    afterWork: function() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var hourMinutes = hour + "" + minutes; //两个数字会加起来 加个引号就变成字符串了
      var clockTime = year + "" + month + "" + day;
      let local = localStorage.getItem("user_info");
      let id = JSON.parse(local).idPer;
      let name = JSON.parse(local).name;
      let part=JSON.parse(local).part;
      let clockState = "正常";
      let clockType = "下班打卡";
      let monthsTime=year+"-"+month;
      if (this.sbdkFlag != true) {
        if (this.xbdkFlag != false) {
          if (hourMinutes >= "1730" && hourMinutes <= "2400") {
            this.xbdkFlag = false;
            insertClock(id,name,this.currentTime,monthsTime,part).then(res=>{
              alert("下班愉快我的宝");
            })
          } else if (hourMinutes >= "1010" && hourMinutes < "1730") {
            this.xbdkFlag = false;
            this.boxOne = "";
            this.$bvModal.msgBoxConfirm("您确定要提前下班吗？").then(value => {
              this.boxOne = value;
              let flag = String(this.boxOne);
              let clockAdvance = "早退";
              let monthsTime=year+"-"+month;
              if (flag === "true") {
                clockIn(
                  id,
                  name,
                  this.currentTime,
                  clockAdvance,
                  clockType,
                  part
                ).then(res => {
                  alert("下班愉快");
                  comattendance(id, monthsTime).then(res => {});
                });
              }
            });
          } else {
            alert("当前不在任何打卡时间段！");
          }
        } else {
          alert("已经打过卡了！快下班！");
        }
      } else {
        alert("今天上班没打卡，不允许下班打卡！");
      }
    },

    toWork: function() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var hourMinutes = hour + "" + minutes; //两个数字会加起来 加个引号就变成字符串了
      var clockTime = year + "" + month + "" + day;
      let local = localStorage.getItem("user_info");
      let id = JSON.parse(local).idPer;
      let name = JSON.parse(local).name;
      let clockStateNormal = "正常";
      let clockStateDelay = "迟到";
      let clockType = "上班打卡";
      let part=JSON.parse(local).part;
      let monthsTime = year + "-" + month;
      if (this.sbdkFlag != false) {
        if (hourMinutes >= "0930" && hourMinutes <= "1000") {
          this.sbdkFlag = false;
          clockIn(id, name, this.currentTime, clockStateNormal, clockType,part).then(
            res => {
              alert("打卡成功！上班愉快");
            }
          );
        } else if (hourMinutes >= "1010" && hourMinutes <= "1730") {
          this.sbdkFlag = false;

          clockeventDealy(
            id,
            name,
            this.currentTime,
            clockStateDelay,
            clockType,
            monthsTime,
            part,
          ).then(res => {
            alert("打卡成功！您已迟到。");
          });
        } else {
          alert("当前不在任何打卡时间段！");
        }
      } else {
        alert("您今天打过卡了！");
      }
    }
  },
  created() {
    //当前时间
    var that = this;
    that.timer = setInterval(function() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      var second = new Date().getSeconds();
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      that.currentTime =
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
    }, 0);
    //判断当前用户打卡没
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    let whetherClock = year + "-" + month + "-" + day;
    let local = localStorage.getItem("user_info");
    let id = JSON.parse(local).idPer;
    isClock(whetherClock, id)
      .then(res => {
        let go = res.data[0].clockType;
        if (go == "上班打卡") {
          this.sbdkFlag = false;
        } else {
          this.sbdkFlag = true;
        }
        let after = res.data[1].clockType;
        if (after == "下班打卡") {
          this.xbdkFlag = false;
        } else {
          this.xbdkFlag = true;
        }
      })
      .catch(err => {
        this.sbdkFlag = true;
        this.xbdkFlag = true;
      });
  },

  computed: {
    // ...mapState(["afterWorkFlag", "toWorkFlag"])
  },
  mounted() {},
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //清除定时器
    }
  }
};
</script>