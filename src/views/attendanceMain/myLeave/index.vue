<template>
  <div>
    <b-container fluid class="typography_myleave">
      <b-button @click="pre" v-if="leaveinfors_total">返回</b-button>
      <b-button variant="success" v-if="leaveinfors_total" class="btn1" v-b-toggle.collapse-1>点击请假</b-button>
      <b-button @click="preLeaveinfors_total" v-if="prevent">返回</b-button>
      <b-row>
        <b-col></b-col>
      </b-row>

      <b-collapse id="collapse-1" class="mt-2">
        <b-form @submit="onSubmit">
          <b-row class="myleave">
            <b-col class="myleave_topic">
              <b-row class="mb-1 text-center">
                <b-col cols="6">请假类型</b-col>
                <b-col cols="6">请假天数</b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="6">
                  <b-form-group>
                    <b-form-select v-model="newforms.leave" :options="leaveType"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <b-form-select v-model="newforms.day" :options="variants"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1 text-center">
                <b-col cols="6">姓名</b-col>
                <b-col cols="6">部门</b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input
                      disabled
                      id="input-1"
                      v-model="newforms.name"
                      placeholder
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input disabled v-model="newforms.part" required></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1 text-center">
                <b-col cols="6">员工编号</b-col>
                <b-col cols="6">联系方式</b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input
                      id="input-1"
                      disabled
                      v-model="newforms.perId"
                      placeholder
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input id="input-1" v-model="newforms.perContact" placeholder required></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1 text-center">
                <b-col cols="12">审批人</b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="12">
                  <b-form-group>
                    <b-form-select v-model="newforms.assessor" :options="assessor"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group>
                <b-col class="myleave_date">
                  <label for="datepicker-invalid">请假起始日期</label>
                </b-col>
                <b-col class="myleave_calender">
                  <b-form-datepicker
                    block
                    v-model="newforms.dateStart"
                    :min="min"
                    :max="max"
                    locale="zh"
                  ></b-form-datepicker>
                </b-col>
                <b-col class="myleave_date">
                  <label for="datepicker-invalid">请假结束日期</label>
                </b-col>
                <b-col class="myleave_calender">
                  <b-form-datepicker
                    block
                    v-model="newforms.dateEnd"
                    :min="min"
                    :max="max"
                    locale="zh"
                  ></b-form-datepicker>
                </b-col>
                <b-form-group label="请假原因:" label-for="input-formatter" class="mb-0">
                  <b-form-textarea
                    id="input-1"
                    v-model="newforms.content"
                    required
                    placeholder="输入请假详细原因"
                    rows="5"
                  ></b-form-textarea>
                </b-form-group>
                <b-button variant="info" type="submit">提交</b-button>
              </b-form-group>
            </b-col>
            <!-- <b-col></b-col> -->
          </b-row>
        </b-form>
      </b-collapse>

      <b-container v-if="leaveInfors">
        <b-col
          style="margin-top:50px; padding:0; padding-bottom:20px;font-weight:bold;font-size:1em"
        >
          {{this.vacationLists_leaveforms.name}}的
          <span
            style="color:red"
          >{{this.vacationLists_leaveforms.vacationType}}</span>详情
        </b-col>
        <b-row class="myleave" style="margin:0">
          <b-col class="myleave_topic">
            <b-row class="mb-1 text-center">
              <b-col cols="6">请假类型</b-col>
              <b-col cols="6">请假天数</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    v-model="this.vacationLists_leaveforms.vacationType"
                    disabled
                    :options="leaveType"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    v-model="this.vacationLists_leaveforms.day"
                    disabled
                    :options="variants"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">姓名</b-col>
              <b-col cols="6">部门</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    disabled
                    id="input-1"
                    v-model="this.vacationLists_leaveforms.name"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input disabled v-model="this.vacationLists_leaveforms.part" required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">员工编号</b-col>
              <b-col cols="6">联系方式</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    id="input-1"
                    disabled
                    v-model="this.vacationLists_leaveforms.idPer"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    id="input-1"
                    disabled
                    v-model="this.vacationLists_leaveforms.contact"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="4">审批人</b-col>
              <b-col cols="4">开始时间</b-col>
              <b-col cols="4">结束时间</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="4">
                <b-form-group>
                  <b-form-input
                    disabled
                    v-model="this.vacationLists_leaveforms.assessor"
                    :options="assessor"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <b-form-input
                    disabled
                    v-model="this.vacationLists_leaveforms.startTime"
                    :options="assessor"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <b-form-input
                    disabled
                    v-model="this.vacationLists_leaveforms.endTime"
                    :options="assessor"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-textarea
              id="input-1"
              v-model="this.vacationLists_leaveforms.content"
              required
              disabled
              placeholder="详细原因是"
              value="asdasd"
              rows="12"
            ></b-form-textarea>
            <b-row class="mb-1 text-center">
              <b-col cols>审批员批复</b-col>
            </b-row>
            <b-form-textarea
              id="input-1"
              v-model="this.vacationLists_leaveforms.reply"
              required
              disabled
              placeholder="暂未批复"
              value="asdasd"
              rows="12"
            ></b-form-textarea>
          </b-col>
          <!-- <b-col></b-col> -->
        </b-row>
      </b-container>

      <b-col class="leaveInfors" v-if="leaveinfors_total">
        <b-row class="topic">
          <b-col class="contentNumber">
            共有
            <font color="red">{{vacationLists.length}}</font>条请假申请
          </b-col>
        </b-row>
        <div class="con" v-for="(item,id) in vacationLists" :key="item.id" id="my-table">
          <b-row class="con-model">
            <b-col cols="3">
              <a href="javascript:0" @click="detalis(id)">{{item.name}}的{{item.vacationType}}申请</a>
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>
              审核人:
              {{item.assessor}};
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>
              申请人:
              {{item.name}}
            </b-col>
            <b-col class="top-date" cols="3">
              <b-icon icon="clock
" class="icon-position"></b-icon>
              申请时间:
              {{item.clockTime}}
            </b-col>
          </b-row>
          <div class="con-bot">{{item.content}}</div>
          <div class="content-button">
            <b-col class="contentbtn">当前批复:{{item.reply}}</b-col>
            <b-col class="contentbtn">当前进度:{{item.state}}</b-col>
            <b-col class="contentbtn">处理时间:{{item.replyTime}}</b-col>
          </div>
          <div class="content-button">
            <b-button class="contentbtn" variant="danger" @click="cancelRequest(id)">取消申请</b-button>
            <b-button class="contentbtn" variant="warning" @click="editRequest(id)">编辑申请</b-button>
          </div>
        </div>
      </b-col>
      <b-col v-if="loading">
        <span>加载中...</span>
      </b-col>
      <b-col v-if="noMore">
        <span>无更多数据</span>
      </b-col>
      <!-- per-page每一页显示三条  totoal-rows 总的条数 当前页数 currentpage -->
    </b-container>
  </div>
</template>
<script>
import { Assessor, vacation, vacationLists } from "@/api2";
export default {
  inject: ["reload"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    //  两个月前的前十五天
    // minDate.setDate(15);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);

    return {
      page: 1, //当前页数
      pageNum: 3, //每页3条
      itemsTotal: [], //后端获取到的存入到前端
      loading: false,
      noMore: false,
      prevent: false,
      leaveInfors: false,
      leaveinfors_total: true,
      min: minDate,
      max: maxDate,
      vacationLists: [],
      vacationLists_leaveforms: [],
      boxOne: "",
      newforms: {
        dateStart: "",
        dateEnd: "",
        content: "",
        day: "1",
        leave: "事假",
        part: "",
        name: "",
        perId: "",
        perContact: "",
        assessor: ""
      },
      assessor: [],
      variants: [
        { text: "1", value: "1" },
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15"
      ],
      leaveType: [
        { text: "事假", value: "事假" },
        "产假",
        "病假",
        "婚假",
        "丧假",
        "年休假",
        "公假"
      ]
    };
  },

  methods: {
    editRequest: function(ids) {
      if (this.vacationLists[ids].state !== "已完成") {
        console.log(this.currentPage);
      } else {
        this.$bvModal
          .msgBoxOk("当前所有流程已经完成无法操作！")
          .then(value => {})
          .catch(err => {});
      }
    },
    preLeaveinfors_total() {
      this.leaveInfors = false;
      this.leaveinfors_total = true;
      this.prevent = false;
    },
    detalis: function(ids) {
      this.leaveInfors = true;
      this.leaveinfors_total = false;
      this.prevent = true;
      this.vacationLists_leaveforms = this.vacationLists[ids];
      // console.log(this.vacationLists[ids]);
      // console.log(this.vacationLists_leaveforms)
    },
    cancelRequest: function(ids) {
      // console.log(this.vacationLists[ids].id);
      // console.log(this.vacationLists[ids]);
      if (this.vacationLists[ids].state == "进行中") {
        this.boxOne = "";
        this.$bvModal
          .msgBoxConfirm("您确认要取消申请吗？")
          .then(value => {
            this.boxOne = value;
            let flag = String(this.boxOne);
            if (flag === "true") {
              this.$bvModal
                .msgBoxOk("取消成功")
                .then(value => {})
                .catch(err => {});
            }
          })
          .catch(err => {});
      } else {
        this.$bvModal
          .msgBoxOk("当前所有流程已经完成无法操作！")
          .then(value => {})
          .catch(err => {});
      }
    },
    pre: function() {
      this.$router.back();
    },

    init: function() {
      vacationLists(this.newforms.perId).then(res => {
        //由于一些原因后端懒得改了，直接一次性获取到前端处理
        this.itemsTotal = res.data;
        if (res.data.length <= this.pageNum) {
          this.vacationLists = res.data;
          this.noMore = true;
        } else {
          this.vacationLists = res.data.slice(0, this.pageNum);
          this.loading = true;
        }
      });
    },

    //滚动加载
    loadMore: function() {
      this.page++;
      let begin = this.pageNum * this.page - this.pageNum;
      let end = this.pageNum * this.page;
      if (end >= this.itemsTotal.length - 1) {
        end = this.itemsTotal.length;
        this.noMore = true;
        this.loading = false;
      } else {
        let end = this.pageNum * this.page;
      }
      let data = [];
      data = [...this.vacationLists, ...this.itemsTotal.slice(begin, end)];
      this.vacationLists = data;
    },

    onSubmit(event) {
      event.preventDefault();
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      let currentTime = year + "-" + month + "-" + day;
      if (
        this.newforms.dateEnd == "" ||
        this.newforms.dateStart == "" ||
        this.newforms.perContact.length < 11
      ) {
        alert("请核对信息再提交(手机号是否为11位？日期？)");
        return false;
      } else {
        this.boxOne = "";
        this.$bvModal.msgBoxConfirm("确认提交申请吗？").then(value => {
          this.boxOne = value;
          let flag = String(this.boxOne);
          if (flag === "true") {
            vacation(
              this.newforms.perId,
              this.newforms.name,
              this.newforms.leave,
              this.newforms.day,
              this.newforms.part,
              this.newforms.perContact,
              this.newforms.dateStart,
              this.newforms.dateEnd,
              this.newforms.content,
              this.newforms.assessor,
              currentTime
            )
              .then(res => {
                this.$bvModal.msgBoxOk("申请成功！请等待").then(value => {});
                setTimeout(() => {
                  this.reload();
                }, 1000);
              })
              .catch(err => {});
          }
        });
      }

      // alert(JSON.stringify(this.newforms));
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "login") {
      next();
    } else {
      if (from.name === "myleave") {
        this.boxOne = "";
        this.$bvModal
          .msgBoxConfirm("确认要离开当前页面吗？离开不会保存任何信息！")
          .then(value => {
            this.boxOne = value;
            let flag = String(this.boxOne);
            if (flag === "true") {
              next();
            }
          });
      }
    }
  },

  created() {
    let local = localStorage.getItem("user_info");
    this.newforms.name = JSON.parse(local).name;
    this.newforms.perId = JSON.parse(local).idPer;
    this.newforms.part = JSON.parse(local).part;
    //循环遍历并存入数组
    Assessor(this.newforms.part).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.assessor.push(res.data[i].name);
      }
    });
  },
  mounted() {
    //初始化数据
    this.init();

    // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
    // document.compatMode 判断当前浏览器的渲染方式用于兼容 CSS1Compat表示标准兼容模式开启
    // 浏览器标准模式与怪异模式-CSS1Compat and BackCompat 　BackCompat 对应quirks mode
    // 　  CSS1Compat 对应strict mode
    // 　  BackCompat：标准兼容模式关闭。
    // 　  CSS1Compat：标准兼容模式开启。
    window.addEventListener("scroll", () => {
      const scrollY =
        document.body.scrollTop || document.documentElement.scrollTop; // 滚动条在Y轴上的滚动距离
      const compatibility =
        document.compatMode === "CSS1Compat"
          ? document.documentElement.clientHeight
          : document.body.clientHeight; // clientHeight 属性是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条，是一个整数，单位是像素 px。
      const TotalHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ); // 页面总高度
      if (scrollY + compatibility >= TotalHeight) {
        // 当滚动条滑到页面底部
        this.loadMore();
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "/public/an_leave.less";
</style>