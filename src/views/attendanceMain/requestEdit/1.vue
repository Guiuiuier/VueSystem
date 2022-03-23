<template>
  <div>
    <b-container fluid class="typography_myleave">
      <b-button @click="pre">返回</b-button>

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
                  <b-form-select
                    v-model="newforms.vacationType"
                    :options="leaveType"
                  ></b-form-select>
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
                    v-model="this.newforms.name"
                    disabled
                    id="input-1"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input v-model="newforms.part" disabled required></b-form-input>
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
                    v-model="newforms.idPer"
                    disabled
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    id="input-1"
                    v-model="newforms.contact"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="12">审批人</b-col>
            </b-row>
            <b-row class="mb-1">
                  <b-col cols="12">
                <b-form-group>
                  <b-form-select
                    v-model="newforms.assessor"
                    :options="assessor"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-group>
              <b-col class="myleave_date">
                <label for="datepicker-invalid">请假起始日期</label>
              </b-col>
              <b-col class="myleave_calender">
                <b-form-datepicker
                  v-model="newforms.startTime"
                  block
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
                  v-model="newforms.endTime"
                  block
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
    </b-container>
  </div>
</template>
<script>
import {vacationUpdate,vacationmyleave} from "@/api2"
export default {
    inject:['reload'],
props: {
    vacationLists_leaveforms: {
      type: Object,
      default: () => []
    },
    assessPerson:{
         type: Array,
      default: () => []
    }
  },
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
        items:[],
        newforms: {
        id:this.vacationLists_leaveforms.id,
        contact: this.vacationLists_leaveforms.contact,
        content: this.vacationLists_leaveforms.content,
        day: this.vacationLists_leaveforms.day,
        endTime:this.vacationLists_leaveforms.endTime,
        idPer: this.vacationLists_leaveforms.idPer,
        name: this.vacationLists_leaveforms.name,
        part: this.vacationLists_leaveforms.part,
        startTime: this.vacationLists_leaveforms.startTime,
        vacationType:this.vacationLists_leaveforms.vacationType,
        assessor:this.vacationLists_leaveforms.assessor,
    },
      assessor:{},
      variants: [
       { text: this.vacationLists_leaveforms.day, value: this.vacationLists_leaveforms.day },
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
        { text: this.vacationLists_leaveforms.vacationType, value: this.vacationLists_leaveforms.vacationType },
        "产假",
        "病假",
        "婚假",
        "丧假",
        "年休假",
        "公假"
      ],
      min: minDate,
      max: maxDate
    };
  },
  methods: {
    pre: function() {
      this.$router.back();
    },
    onSubmit(event) {
      event.preventDefault();
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      let clockTime = year + "-" + month + "-" + day;
      if (
        this.newforms.endTime == "" ||
        this.newforms.startTime == "" ||
        this.newforms.contact.length < 11
      ) {
        alert("请核对信息再提交(手机号是否为11位？日期？)");
        return false;
      } else {
                // alert(JSON.stringify(this.newforms));

        this.boxOne = "";
        this.$bvModal.msgBoxConfirm("确认提交申请吗？").then(value => {
          this.boxOne = value;
          let flag = String(this.boxOne);
          if (flag === "true") {
            vacationUpdate(
              this.newforms.vacationType,
              this.newforms.day,
              this.newforms.contact,
              this.newforms.startTime,
              this.newforms.endTime,
              this.newforms.content,
              this.newforms.assessor,
              clockTime,
              this.newforms.id
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
  watch: {
    // 判断当前路由
    $route(to, from) {
      // console.log(to);
      if (
        to.name === "myleave" ||
        to.name === "newannounce" ||
        to.name === "editannounce"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;

      }
    }
  },
  mounted() {
      console.log(this.vacationLists_leaveforms)
    // console.log(this.items);
        //   console.log(this.vacationLists_leaveforms)

  },
  created() {
    this.assessor=this.assessPerson;
    // console.log(this.$route.params);
    let local=localStorage.getItem("user_info");
    let idPer=JSON.parse(local).idPer
    // return false;
    vacationmyleave(this.$route.params.id,idPer).then(res=>{
        // console.log(res.data);
        this.newforms.vacationType=res.data.vacationType;
        this.newforms.contact=res.data.contact;
        this.newforms.idPer=res.data.idPer;
        this.newforms.day=res.data.day;
        this.newforms.endTime=res.data.endTime;
        this.newforms.assessor=res.data.assessor;
        this.newforms.content=res.data.content;
        this.newforms.name=res.data.name;
        this.newforms.part=res.data.part;
        this.newforms.assessor=res.data.assessor;
        this.newforms.id=res.data.id;

    })
        // console.log(this.$route.name);
    //   console.log(this.vacationLists_leaveforms)

  },
//   watch:{
//       vacationLists_leaveforms(val,news){

//           console.log(val);
//       }
      
//   }
};
</script>

<style lang="less" scoped>
@import "/public/an_leave.less";
</style>