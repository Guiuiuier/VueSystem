<template>
  <div>
    <b-container fluid class="typography">
      <b-button @click="pre">返回</b-button>
      <b-button variant="success" class="btn1" v-b-toggle.collapse-1>我要请假</b-button>
      <b-row>
        <b-col></b-col>
      </b-row>

      <b-collapse id="collapse-1" class="mt-2">
        <b-form>
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
                    <b-form-input id="input-1" placeholder required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input id="input-1" placeholder required></b-form-input>
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
                    <b-form-input id="input-1" placeholder required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <b-form-input id="input-1" placeholder required></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mb-1 text-center">
                <b-col cols="12">审批人</b-col>
              </b-row>
              <b-row class="mb-1">
                <b-col cols="12">
                  <b-form-group>
                    <b-form-select v-model="newforms.day" :options="variants"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group>
                <b-col class="myleave_date">
                  <label for="datepicker-invalid">请假起始日期</label>
                </b-col>
                <b-col class="myleave_calender">
                  <b-form-datepicker block v-model="value" :min="min" :max="max" locale="zh"></b-form-datepicker>
                </b-col>
                <b-col class="myleave_date">
                  <label for="datepicker-invalid">请假结束日期</label>
                </b-col>
                <b-col class="myleave_calender">
                  <b-form-datepicker block v-model="value" :min="min" :max="max" locale="zh"></b-form-datepicker>
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
                <b-button variant="info">提交</b-button>
              </b-form-group>
            </b-col>
            <!-- <b-col></b-col> -->
          </b-row>
        </b-form>
      </b-collapse>

      <b-col class="leaveInfors">
        <b-row class="topic">
          <b-col class="contentNumber">
            共有
            <font color="red">1</font>条请假申请
          </b-col>
        </b-row>
        <div class="con">
          <b-row class="con-model">
            <b-col cols="3">
              <a href="javascript:0">11</a>
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>审核人:
              1
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>申请人:
              1
            </b-col>
            <b-col class="top-date" cols="3">
              <b-icon icon="clock
" class="icon-position"></b-icon>申请时间:
              1
            </b-col>
          </b-row>
          <div class="con-bot" id="contentHeight" ref="contentHeight">1</div>
          <div class="content-button">
            <div class="contentbtn">当前状态:</div>
          </div>
          <div class="content-button">
   <b-button class="contentbtn" variant="danger">取消申请</b-button>
            <b-button class="contentbtn" variant="warning">编辑申请</b-button>
          </div>
        </div>        <div class="con">
          <b-row class="con-model">
            <b-col cols="3">
              <a href="javascript:0">11</a>
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>审核人:
              1
            </b-col>
            <b-col class="top-name" cols="3">
              <b-icon icon="person 
" class="icon-position"></b-icon>申请人:
              1
            </b-col>
            <b-col class="top-date" cols="3">
              <b-icon icon="clock
" class="icon-position"></b-icon>申请时间:
              1
            </b-col>
          </b-row>
          <div class="con-bot" id="contentHeight" ref="contentHeight">1</div>
          <div class="content-button">
            <div class="contentbtn">当前状态:</div>
          </div>
          <div class="content-button">
            <b-button class="contentbtn" variant="danger">取消申请</b-button>
            <b-button class="contentbtn" variant="warning">编辑申请</b-button>
          </div>
        </div>
      </b-col>
    </b-container>
  </div>
</template>
<script>
export default {
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
      value: "",
      min: minDate,
      max: maxDate,
      newforms: {
        content: "",
        day: "1",
        leave: "事假"
      },
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
    pre: function() {
      this.$router.back();
    }
  },
  created() {
    // console.log(this.$route);
  }
};
</script>

<style lang="less" scoped>
.typography {
  .leaveInfors {
    margin-top: 50px;
    border: 1px solid rgb(229, 229, 229);

    .topic {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgb(229, 229, 229);
      margin: 0 0 0 1px;
    }

    .contentNumber {
      font-size: 16px;
      font-weight: bold;
      padding: 0;
    }
  }
  .con {
    border-bottom: 1px solid rgb(229, 229, 229);

    .con-model {
      padding-top: 20px;
      .top-name {
        .icon-position {
          margin-right: 5px;
        }
        text-align: right;
        font-size: 13px;
        //   line-height: 20px;
        padding: 0 20px;
      }
      .top-date {
        .icon-position {
          margin-right: 5px;
        }
        text-align: right;
        font-size: 13px;
        padding: 0 20px;
      }
    }
    .con-bot {
      padding-top: 25px;
      font-size: 13px;
      padding-bottom: 30px;
      height: 6.5em;
      overflow: hidden; /*自动隐藏文字*/
      text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
      /*不允许出现半汉字截断*/
    }
    .content-button {
      text-align: right;
      padding-bottom: 10px;
      .contentbtn {
        margin: 0 5px;
      }
    }
  }
  .con {
    // border: 1px solid rgb(229, 229, 229);
  }
  .btn1 {
    margin-left: 5px;
  }
  .myleave {
    margin-top: 50px;
    border: 1px solid rgb(229, 229, 229);
    .myleave_topic {
      padding: 20px;
    }
    .myleave_calender {
      padding: 0;
    }
    .myleave_date {
      padding: 0;
    }
  }
}
</style>