<template>
  <div>
    <b-container fluid class="con">
      <b-button @click="pre">返回</b-button>

      <b-form>
        <b-modal v-model="show" title="审批信息">
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <!-- <b-col cols="3">员工编号</b-col> -->
              <b-col cols="7">员工姓名</b-col>
              <b-col cols="5">申请日期</b-col>
              <!-- <b-col cols="4">年龄</b-col> -->
            </b-row>

            <b-row class="mb-1">
              <b-col cols="7">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.name" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="5">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.clockTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mb-1 text-center">
              <b-col cols="6">员工部门</b-col>
              <b-col cols="6">请假类型</b-col>
            </b-row>

            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.part" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.vacationType" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">开始日期</b-col>
              <b-col cols="6">结束日期</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.startTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.endTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">联系方式</b-col>
              <b-col cols="6">请假天数</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.contact" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.day" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="12">请假原因</b-col>
            </b-row>
            <b-form-textarea
              id="textarea"
              v-model="newforms.content"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              disabled
            ></b-form-textarea>
            <b-row class="mb-1 text-center">
              <b-col cols="12">审核批复</b-col>
            </b-row>
            <b-form-textarea
              id="textarea"
              v-model="newforms.text"
              placeholder="输入回复内容"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-container>

          <template #modal-footer>
            <div class="w-100">
              <p class="float-left">请确认内容信息</p>
              <b-button
                type="submit"
                variant="primary"
                size="sm"
                class="float-right"
                @click="sub"
              >同意</b-button>
              <b-button
                type="submit"
                variant="danger"
                size="sm"
                class="float-right"
                @click="reject"
              >拒绝</b-button>
              <!-- @click="show=false" -->
            </div>
          </template>
        </b-modal>
      </b-form>


<!-- 已审批 -->

      <b-form>
        <b-modal v-model="Yishow" title="审批信息">
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <!-- <b-col cols="3">员工编号</b-col> -->
              <b-col cols="7">员工姓名</b-col>
              <b-col cols="5">申请日期</b-col>
              <!-- <b-col cols="4">年龄</b-col> -->
            </b-row>

            <b-row class="mb-1">
              <b-col cols="7">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.name" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="5">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.clockTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mb-1 text-center">
              <b-col cols="6">员工部门</b-col>
              <b-col cols="6">请假类型</b-col>
            </b-row>

            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.part" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.vacationType" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">开始日期</b-col>
              <b-col cols="6">结束日期</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.startTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.endTime" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="6">联系方式</b-col>
              <b-col cols="6">请假天数</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.contact" disabled></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.day" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1 text-center">
              <b-col cols="12">请假原因</b-col>
            </b-row>
            <b-form-textarea
              id="textarea"
              v-model="newforms.content"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              disabled
            ></b-form-textarea>
            <b-row class="mb-1 text-center">
              <b-col cols="12">审核批复</b-col>
            </b-row>
            <b-form-textarea
              id="textarea"
              v-model="newforms.text"
              placeholder="空内容"
              rows="3"
              max-rows="6"
              disabled
            ></b-form-textarea>
          </b-container>

          <template #modal-footer>
            <div class="w-100">
              <p class="float-left">请确认内容信息</p>
              
            </div>
          </template>
        </b-modal>
      </b-form>

      <h3 style="padding-top:20px">部门员工审批</h3>
      <b-card no-body>
        <b-tabs card>
          <!-- 懒加载 避免进入就全部加载完毕 -->
          <b-tab title="待审批请假" active>
            <b-card-text>
              <b-alert show class="lazyBack">
                <b-container fluid class="typography" v-if="isShow">
                  <myScroll v-if="flag" :thedata="thedata" :perpage="5">
                    <template v-slot="{content}">
                      <b-row class="topic">
                        <b-col class="contentNumber">
                          共有
                          <font color="red">{{content.length}}</font>条待审批的请假
                        </b-col>
                      </b-row>
                      <div class="con" v-for="(item, id) in content" :key="item.id">
                        <b-row class="con-model">
                          <b-col cols="6">
                            <a
                              href="javascript:0"
                              @click="show=true,perUpdate(id)"
                            >{{item.name}}的{{item.vacationType}}申请</a>
                          </b-col>
                          <b-col class="top-name" cols="3">
                            <b-icon icon="person 
" class="icon-position"></b-icon>
                            所属部门:{{item.part}}
                          </b-col>
                          <b-col class="top-date" cols="3">
                            <b-icon icon="clock
" class="icon-position"></b-icon>
                            申请时间：{{item.clockTime}}
                          </b-col>
                        </b-row>
                        <div
                          class="con-bot"
                          id="contentHeight"
                          ref="contentHeight"
                        >请假内容：{{item.content}}</div>
                        <div class="content-button">
                          <b-button
                            class="contentbtn"
                            v-b-modal.modal-1
                            variant="danger"
                            @click="rejectInfors(item.id)"
                          >拒绝该申请</b-button>
                          <b-button
                            class="contentbtn"
                            variant="warning"
                            @click="show=true,perUpdate(id)"
                          >审批该申请</b-button>
                        </div>
                      </div>
                    </template>
                  </myScroll>
                </b-container>
              </b-alert>
            </b-card-text>
          </b-tab>
          <b-tab title="已审批请假">
            <b-card-text>
                 <b-alert show class="lazyBack">
                              <b-container fluid class="typography" v-if="isShow">
                  <myScroll v-if="flag" :thedata="theYidata" :perpage="5">
                    <template v-slot="{content}">
                      <b-row class="topic">
                        <b-col class="contentNumber">
                          共有
                          <font color="red">{{content.length}}</font>条已审批的请假
                        </b-col>
                      </b-row>
                      <div class="con" v-for="(item, id) in content" :key="item.id">
                        <b-row class="con-model">
                          <b-col cols="6">
                            <a
                              href="javascript:0"
                              @click="Yishow=true,yiPerUpdate(id)"
                            >{{item.name}}的{{item.vacationType}}申请</a>
                          </b-col>
                          <b-col class="top-name" cols="3">
                            <b-icon icon="person 
" class="icon-position"></b-icon>
                            所属部门:{{item.part}}
                          </b-col>
                          <b-col class="top-date" cols="3">
                            <b-icon icon="clock
" class="icon-position"></b-icon>
                            申请时间：{{item.clockTime}}
                          </b-col>
                        </b-row>
                        <div
                          class="con-bot"
                          id="contentHeight"
                          ref="contentHeight"
                        >请假内容：{{item.content}}</div>
                        <div class="content-button">
                          <b-button
                            class="contentbtn"
                            v-b-modal.modal-1
                            variant="danger"
                            disabled
                            @click="rejectInfors(item.id)"
                          >拒绝该申请</b-button>
                          <b-button
                            class="contentbtn"
                            variant="warning"
                            disabled
                            @click="show=true,perUpdate(id)"
                          >审批该申请</b-button>
                        </div>
                      </div>
                    </template>
                  </myScroll>
                </b-container>
              </b-alert>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import myScroll from "@/commonFun/scroll/index.vue";
import { announceDelet, aprroval, vacationEvent } from "@/api2";

export default {
    inject:['reload'],
  data() {
    return {
        Yishow:false,
      flag: false,
      isShow: true,
      show: false,
      items: [],
      yiItems:[],
      replyTime: "",
      newforms: {
        id: "",
        text: "",
        content: "",
        name: "",
        part: "",
        startTime: "",
        endTime: "",
        vacationType: "",
        day: "",
        contact: "",
        clockTime: ""
      }
    };
  },
  components: {
    myScroll
  },
  methods: {
    //   拒绝
    reject(){
  var event = event || window.event;
      event.preventDefault();
      let isapproval = "不同意";
      // console.log(this.newforms.id);
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认不同意？").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
          vacationEvent(
            this.newforms.id,
            this.newforms.text,
            this.replyTime,
            isapproval
          ).then(res => {
               setTimeout(() => {
                this.reload();
            }, 500);
          });
        } else {
          return false;
        }
      });
    },
    rejectInfors(id) {
      var event = event || window.event;
      event.preventDefault();
    //   return false;
      let text = "";
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认要直接拒绝吗？").then(value => {
          this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
      let isapproval = "不同意";
          vacationEvent(
            id,
            text,
            this.replyTime,
            isapproval
          ).then(res => {
            //   console.log(res.data);
            setTimeout(() => {
                this.reload();
            }, 500);
          });
        } else {
          return false;
        }
      });
    },
    sub: function() {
      var event = event || window.event;
      event.preventDefault();
      let isapproval = "同意";
      // console.log(this.newforms.id);
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认同意吗？").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
          vacationEvent(
            this.newforms.id,
            this.newforms.text,
            this.replyTime,
            isapproval
          ).then(res => {
            //   console.log(res.data);
            setTimeout(() => {
                this.reload();
            }, 500);
          });
        } else {
          return false;
        }
      });

      //   console.log(this.newforms.text, currentTime);
    },
    yiPerUpdate(id){
      this.newforms.id = this.Yiitems[id].id;
      this.newforms.contact = this.Yiitems[id].contact;
      this.newforms.endTime = this.Yiitems[id].endTime;
      this.newforms.startTime = this.Yiitems[id].startTime;
      this.newforms.vacationType = this.Yiitems[id].vacationType;
      this.newforms.part = this.Yiitems[id].part;
      this.newforms.clockTime = this.Yiitems[id].clockTime;
      this.newforms.day = this.Yiitems[id].day;
      this.newforms.content = this.Yiitems[id].content;
      this.newforms.name = this.Yiitems[id].name;
      this.newforms.text=this.Yiitems[id].reply;
    //   console.log(id);
    //   console.log(this.items[id]);
    //   console.log(this.newforms.text);
    },
    perUpdate(id) {
      this.newforms.id = this.items[id].id;
      this.newforms.contact = this.items[id].contact;
      this.newforms.endTime = this.items[id].endTime;
      this.newforms.startTime = this.items[id].startTime;
      this.newforms.vacationType = this.items[id].vacationType;
      this.newforms.part = this.items[id].part;
      this.newforms.clockTime = this.items[id].clockTime;
      this.newforms.day = this.items[id].day;
      this.newforms.content = this.items[id].content;
      this.newforms.name = this.items[id].name;
    },
    pre: function() {
      this.$router.back();
    }
  },
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    this.replyTime =
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
    let local = localStorage.getItem("user_info");
    let assessor = JSON.parse(local).roleid;
    aprroval(assessor).then(res => {
        let index=0;
        let yiIndex=0;
        let data=[];
        let Yidata=[];
        for(let i=0;i<res.data.length;++i){
            if(res.data[i].state==="进行中"){
                index++;
                data[index-1]=res.data[i];
            }else{
               yiIndex++;
               Yidata[yiIndex-1]=res.data[i];
            }
        }

        this.thedata=data;
        this.theYidata=Yidata;
    //   console.log(this.thedata);
    //   console.log(this.theYidata);
    //   已经批复和未批复的分类
      this.items = data;
      this.Yiitems=Yidata;
      this.flag = true;
    });
  }
};
</script>
<style lang="less" scoped>
@import "/public/an_leave.less";
.lazyBack {
  background-color: white;
  border: none;
  padding: 0;
}
.typography {
  border: none;
}
</style>