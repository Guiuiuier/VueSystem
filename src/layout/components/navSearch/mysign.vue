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
import { clockIn } from "@/api2";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: "",
      show: false,
      sucessShow: false
    };
  },
  methods: {
    ...mapMutations(["SET_AFTERWORKFLAG","SET_TOWORKFLAG"]),
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
      if (hourMinutes >= "1730" && hourMinutes <= "2400") {
        if (this.afterWorkFlag != "1") {
          // console.log(this.currentTime);
          let local = localStorage.getItem("user_info");
          let id = JSON.parse(local).idPer;
          let name = JSON.parse(local).name;
          let clockState = "正常";
          let clockType="下班打卡";
          clockIn(id, name, this.currentTime, clockState,clockType).then(res => {
            // console.log(res);
          });
          alert("下班愉快");
          let flag = 1;
          // flag={"flag":"1","clockTime":""}
          this.SET_AFTERWORKFLAG(flag);
          let Flag = sessionStorage.setItem("afterFlag", flag);

          // return false;
        } else {
          alert("一天辛苦了,快点下班吧");
          //  return false;
        }
      } else {
        alert("努力工作，还没到点");
      };
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
      if (hourMinutes >= "1730" && hourMinutes <= "2400") {
        if (this.toWorkFlag != "1") {
          // console.log(this.currentTime);
          let local = localStorage.getItem("user_info");
          let id = JSON.parse(local).idPer;
          let name = JSON.parse(local).name;
          let clockState = "正常";
           let clockType="上班打卡";
          clockIn(id, name, this.currentTime, clockState,clockType).then(res => {
            // console.log(res);
          });
          alert("上班愉快");
          let flag = 1;
          this.SET_TOWORKFLAG(flag);
          let Flag = sessionStorage.setItem("toWorkFlag", flag);

          // return false;
        } else {
          alert("打过卡了,快上班吧");
          //  return false;
        }
      } else {
        alert("迟到很久了,找管理组线下签到");
      };
    },


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
    }, 1000);
  },

  computed: {
    ...mapState(["afterWorkFlag","toWorkFlag"])
  },
  mounted() {
    //
    // let afterFlag=sessionStorage.getItem("afterFlag");
    // console.log(afterFlag);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //清除定时器
    }
  }
};
</script>