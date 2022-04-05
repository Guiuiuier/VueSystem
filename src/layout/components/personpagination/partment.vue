<template>
  <div>
    <b-container fluid>
        <b-form>
      <b-modal v-model="show" title="修改信息">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="4">姓名</b-col>
            <b-col cols="4">性别</b-col>
            <b-col cols="4">年龄</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perName"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select :options="variants" v-model="newforms.gender"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select id="input-1" v-model="newforms.age" :options="variantsAge"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="6">联系方式</b-col>
            <b-col cols="6">地址</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.contact"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.address"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="6">在职状态</b-col>
            <b-col cols="6">部门</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.perState" :options="variantsState"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group>
                                  <b-form-input id="input-1" v-model="newforms.part"  disabled></b-form-input>

                <!-- <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">职位</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-form-select v-model="newforms.position" :options="variantsPosition"></b-form-select>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">入职时间</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-form-datepicker v-model="newforms.hireTime" block locale="zh" :max="max" :min="min"></b-form-datepicker>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">离职时间</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-form-datepicker v-model="newforms.fireTime" block locale="zh" :max="max" :min="min"></b-form-datepicker>
            <b-button @click="deleteFireTime">清空离职时间</b-button>
          </b-row>
        </b-container>
        <template #modal-footer>
          <div class="w-100">
            <p class="float-left">请确认无误再修改！</p>
            <b-button type="submit" variant="primary" size="sm" class="float-right" @click="sub">确定</b-button>
            <!-- @click="show=false" -->
          </div>
        </template>
      </b-modal>
    </b-form>
      <div class="overflow-auto" style="padding:20px">
        <b-col>
          <h5>{{part}}在职员工信息</h5>
        </b-col>
        <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="3">
          <template v-slot="{btnid}">
            <!-- <b-button @click="edit(btnid)">{{btnid.id}}</b-button> -->
            <b-button type="submit" variant="warning" @click="show=true,perUpdate(btnid)">编辑</b-button>
            <b-button variant="danger" @click="perDelet(btnid.id)">删除</b-button>
          </template>
        </MyLists>
      </div>

      <b-card-group columns style="padding-top:10px">
        <b-card bg-variant="info" text-variant="white">
          <blockquote class="card-blockquote">
            <p>{{part}}在职总人数</p>
            <footer>
              <small>{{totalPeople}}</small>
            </footer>
          </blockquote>
        </b-card>
        <b-card>
          <myecharts :theid="chartName" :thedata="wholeAttendance" :theseries="series" v-if="isshow">
            <p>今日迟到人员:</p>
            <!-- <span v-for="item in names" :key="item">{{item}},</span> -->
            <p>今日早退人员:</p>
          </myecharts>
          <template #footer>
            <small class="text-muted">
              <span style="color:black">人员分布饼状图</span>
            </small>
          </template>
        </b-card>

        <b-card header="说点什么">
          <blockquote class="blockquote mb-0">
            <p>我买几个橘子去。你就在此地，不要走动</p>
            <footer class="blockquote-footer">源于初中课本学过的朱自清</footer>
          </blockquote>
        </b-card>

        <b-card bg-variant="primary" text-variant="white">
          <blockquote class="card-blockquote">
            <p>不知道写什么</p>
            <footer>
              <small>不知道写什么</small>
            </footer>
          </blockquote>
        </b-card>
        <b-card>
          <b-card-title>{{part}}岗位人员分布</b-card-title>
          <myechartsHistogram :theid="chartName2" :thedata="partNum" :theseries="positionData" v-if="isShow2"></myechartsHistogram>
          <template #footer>
            <small class="text-muted">
              <span style="color:black">人员分布柱状图</span>
            </small>
          </template>
        </b-card>

        <b-card  header="部门一角">
           <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="第一张图"
        text="这是部门的第一次聚会"
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>不知道说点啥</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="不知道写啥" img-blank img-alt="Blank image">
        <p>
        不知道写点啥先放着
        </p>
      </b-carousel-slide>
    </b-carousel>
          <!-- <b-card-text>暂时不知道写什么</b-card-text> -->
          <template #footer>
            <small class="text-muted">
              <span style="color:black">暂时不知道写什么先放个图吧</span>
            </small>
          </template>
        </b-card>
        <b-card title="Title" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
          <b-card-text>
            <span style="color:black">暂时不知道写什么先放个图吧</span>
          </b-card-text>
        </b-card>

        <b-card img-src="https://picsum.photos/400/200/?image=49" img-alt="Image" img-top>
         
          <b-card-text>暂时不知道写什么</b-card-text>
          <template #footer>
            <small class="text-muted">
              <span style="color:black">暂时不知道写什么先放个图吧</span>
            </small>
          </template>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>
<script>
// Vue.prototype
import MyLists from "@/components/list/index";
import searchPerTravel from "../sameLevelJS/search";
import { Empersons_part,todayDelay,positionNum, personnelInfo, deletPer, updatePer } from "@/api2";
import myecharts from "@/components/echarts";
import myechartsHistogram from "@/components/echartsHistogram";
export default {
  inject: ["reload"],
  data() {
        const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    // 60
    minDate.setDate(60);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
         variants: [{ text: "男", value: "男" }, "女", "其他"],
               variantsState: [{ text: "在职", value: "在职" }, "离职", "待入职"],

   kaifaPart:[ { label: "开发部", options: ["前端开发工程师", "后端开发工程师"]}],
       ziyuanPart:[{label:"资源部", options:["物料员","物料总监"]}],
       guanliPart:[{label:"管理部", options:["管理部经理","行政主管","行政专员","人事专员","培训主管"]}],
       xiaoshouPart:[{label:"销售部", options:["销售专员","销售主管"]}],
       min: minDate,
      max: maxDate,
            variantsPosition: [],
            items: [],
      variantsAge: [
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85"
      ],

              newforms: {
        id: "",
        perName: "",
        age: "",
        address: "",
        contact: "",
        perState: null,
        gender: null,
        // perId: "",
        part: null,
        perId: "",
        position: "",
        hireTime: "",
        fireTime: ""
      },
          isShow: true,
        isShow2:false,
        // 管理
        glbjl:0,
        xzzg:0,
        rszy:0,
        xzzy:0,
        pxzg:0,
        // 开发
        qdkf:0,
        hdkf:0,
        //销售
        xszg:0,
        xszy:0,
        // 资源
        wly:0,
        wlzj:0,
        guanli:['管理部经理','行政主管','人事专员','行政专员','培训主管'],
        kaifa:['前端开发','后端开发'],
        ziyuan:['物料员','物料总监'],
        xiaoshou:['销售专员','销售主管'],
        positionData:[],
        // 部门人数
        partNum:[],
        chartName:'chart',
        chartName2:'chart2',
        chidao:0,
         show: false,
        isshow:false,
        zaotui:0,
        wholeAttendance:[],
        names:[],
      thedata: [],
      series:['今日迟到','今日早退'],
      totalPeople:"",
      part:"",
      tableSection: [
        { key: "idPer", label: "员工编号", sortable: true },
        { key: "namePer", label: "姓名" },
        { key: "genderPer", label: "性别", sortable: true },
        { key: "agePer", label: "年龄", sortable: true },
        { key: "partPer", label: "部门", sortable: true },
        { key: "position", label: "职位" },
        { key: "hireTime", label: "入职时间" },
        { key: "fireTime", label: "离职时间" },
        { key: "statePer", label: "在职状态", sortable: true },
        { key: "addressPer", label: "地址" },
        { key: "contactPer", label: "联系方式" },
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
    deleteFireTime: function() {
      this.$bvModal.msgBoxConfirm("确认清空该员工离职时间吗？当清空后请点击确认才会生效！").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
          this.newforms.fireTime = "";
        }
      });
    },

    sub: function() {
      this.boxOne = "";
      if (
        this.newforms.contact.length < 11 ||
        this.newforms.perName.length < 1 ||
        this.newforms.age.length < 1 ||
        this.newforms.perState.length < 1 ||
        this.newforms.gender.length < 1 ||
        this.newforms.part.length < 1 ||
        this.newforms.address.length < 1
      ) {
        alert("请核对信息再提交(或手机号是否为11位?)");
        return false;
      } else {
        this.$bvModal
          .msgBoxConfirm("确认修改吗？")
          .then(value => {
            this.boxOne = value;

            // console.log(typeof this.boxOne);
            let flag = String(this.boxOne);
            if (flag === "true") {
              updatePer(
                this.newforms.id,
                this.newforms.perId,
                this.newforms.perName,
                this.newforms.gender,
                this.newforms.age,
                this.newforms.part,
                this.newforms.address,
                this.newforms.contact,
                this.newforms.perState,
                this.newforms.position,
                this.newforms.hireTime,
                this.newforms.fireTime
              )
                .then(res => {})
                .catch(err => {
                  console.log(err);
                });
              this.show = false;
              setTimeout(() => {
                this.reload();
              }, 1000);
            }
          })
          .catch(err => {});
      }
    },

    // 获取编辑内容
    perUpdate: function(item) {
        console.log(item);
      var event = event || window.event;
      event.preventDefault();
      this.newforms.perName = item.namePer;
      this.newforms.gender = item.genderPer;
      this.newforms.age = item.agePer;
      this.newforms.part = item.partPer;
      this.newforms.contact = item.contactPer;
      this.newforms.perState = item.statePer;
      this.newforms.address = item.addressPer;
      this.newforms.perId = item.idPer;
      this.newforms.id = item.id;
      this.newforms.position = item.position;
      this.newforms.hireTime = item.hireTime;
      this.newforms.fireTime = item.fireTime;
      // 调用方法
    },
    perDelet: function(Ids) {
      var event = event || window.event;
      event.preventDefault();
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认删除吗？无法恢复的操作！")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          // console.log(typeof this.boxOne);
          let flag = String(this.boxOne);
          if (flag === "true") {
            deletPer(Ids)
              .then(res => {})
              .catch(err => {});
            this.reload();
          }
        });
    }
  },
 
  created() {
      
    //   以下的代码纯属乱写。回过头来看， 真的烂。 有空一定改，不忍直视。

      let local=localStorage.getItem("user_info");
      this.part=JSON.parse(local).part;
    //    console.log(this.part);
      if(this.part=="管理部"){
            this.variantsPosition=this.guanliPart;
            this.newforms.part="管理部";
          this.positionData=['管理部经理','行政主管','人事专员','行政专员','培训主管'];
      }else if(this.part=="开发部"){
            this.variantsPosition=this.kaifaPart;
                     this.newforms.part="开发部";
          this.positionData=['前端开发','后端开发'];
      }else if(this.part=="资源部"){
               this.variantsPosition=this.ziyuanPart;
          this.newforms.part="资源部";
          this.positionData=['物料员','物料总监'];
      }else if(this.part=="销售部"){
           this.variantsPosition=this.xiaoshouPart;
                      this.newforms.part="销售部";

            this.positionData= ['销售专员','销售主管'];
      }
    //   console.log(local);
    Empersons_part(this.part).then(res => {
        // console.log(res.data);
      this.thedata = res.data;
      this.totalPeople=res.data.length;
    });
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var todayTime=year+"-"+month+"-"+day;
    todayDelay(todayTime,this.part).then(res=>{
        console.log(res.data);
        // console.log(res.data[0].clockState.includes("迟到"));
        for(let i=0;i<res.data.length;++i){
             if(res.data[i].clockState.includes("迟到")){
                 this.chidao++;
             }else{
                this.zaotui++;
             }
        }
        let chidaoarr=[{value:this.chidao,name:"今日迟到"}];
        let zaotuiarr=[{value:this.zaotui,name:"今日早退"}];
        this.wholeAttendance=[...chidaoarr,...zaotuiarr];
        this.isshow=true;
        // console.log(chidaoarr);
        // console.log(this.wholeAttendance)
    });
  positionNum(this.part).then(res=>{
    //    console.log(res.data);
       for(let i=0;i<res.data.length;++i){
           if(this.part=="管理部"){
                if(res.data[i].position.includes("管理部经理")){
                    this.glbjl++;
                }else if(res.data[i].position.includes("行政主管")){
                    this.xzzg++
                }else if(res.data[i].position.includes("人事专员")){
                    this.rszy++;
                }else if(res.data[i].position.includes("行政专员")){
                    this.xzzy++;
                }else{
                    this.pxzg++;
                }
        this.partNum=[this.glbjl,this.xzzg,this.rszy,this.xzzy,this.pxzg];
        //  console.log(this.partNum);
           }else if(this.part=="开发部"){
               if(res.data[i].position=="前端开发工程师"){
                   this.qdkf++
               }else{
                   this.hdkf++
               }
               this.partNum=[this.qdkf,this.hdkf];
           }else if(this.part=="资源部"){
               if(res.data[i].position=="物料员"){
                   this.wly++;
               }else{
                   this.wlzj++;
               }
                this.partNum=[this.wly,this.wlzj];
           }else{
               if(res.data[i].position=="销售专员"){
                   this.xszy++;
               }else{
                   this.xszg++;
               }
               this.partNum[this.xszy,this.xszg];
           }
    
       }
  this.isShow2=true;
  })
  },
  components: {
    myecharts,
    MyLists,
    myechartsHistogram
  },
  mounted() {
    this.rows = this.items.length;
  },
};
</script>

<style lang="less" scoped>
</style>