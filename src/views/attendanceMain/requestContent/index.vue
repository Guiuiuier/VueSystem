<template>
    <div>
      <b-container fluid class="typography_myleave"  v-if="isShow">
      <b-button @click="pre">返回</b-button>

        <b-col
          style="margin-top:50px; padding:0; padding-bottom:20px;font-weight:bold;font-size:1em"
        >
          {{this.newforms.name}}的
          <span
            style="color:red"
          >{{this.newforms.vacationType}}</span>详情
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
                    v-model="this.newforms.vacationType"
                    disabled
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input
                    v-model="this.newforms.day"
                    disabled
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
                    v-model="this.newforms.name"
                    placeholder
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input disabled v-model="this.newforms.part" required></b-form-input>
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
                    v-model="this.newforms.idPer"
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
                    v-model="this.newforms.contact"
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
                    v-model="this.newforms.assessor"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <b-form-input
                    disabled
                    v-model="this.newforms.startTime"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <b-form-input
                    disabled
                    v-model="this.newforms.endTime"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-form-textarea
              id="input-1"
              v-model="this.newforms.content"
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
              v-model="this.newforms.reply"
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
    </div>
</template>
<script>
import {vacationmyleave} from "@/api2"
export default {
//       props: {
//     //查询所有的职员
//     // vacationLists_leaveforms: {
//     //   type: Object,
//     //   default: () => []
//     // }
//   },
    data(){
        return{
            items:[],
             isShow: true,
                     newforms: {
        id:"",
        contact:"",
        content:"",
        day: "",
        endTime:"",
        idPer:"",
        name:"",
        part: "",
        startTime: "",
        vacationType:"",
        assessor:"",
        reply:"",
    },
        }
    },
    methods: {
            pre: function() {
      this.$router.back();
    },
    },
    mounted() {
     
    },
    created() {

    let local=localStorage.getItem("user_info");
    let idPer=JSON.parse(local).idPer
    // return false;
    vacationmyleave(this.$route.params.id,idPer).then(res=>{
        // console.log(res.data);
        this.items=res.data[0];
        // console.log(this.items[0]);
        this.newforms.vacationType=res.data[0].vacationType;
        this.newforms.contact=res.data[0].contact;
        this.newforms.idPer=res.data[0].idPer;
        this.newforms.day=res.data[0].day;
        this.newforms.endTime=res.data[0].endTime;
        this.newforms.startTime=res.data[0].startTime;
        this.newforms.assessor=res.data[0].assessor;
        this.newforms.content=res.data[0].content;
        this.newforms.name=res.data[0].name;
        this.newforms.part=res.data[0].part;
        this.newforms.assessor=res.data[0].assessor;
        this.newforms.id=res.data[0].id;
        this.newforms.reply=res.data[0].reply;
 
    })
    },

}
</script>

<style lang="less" scoped>
    @import "/public/an_leave.less";
</style>