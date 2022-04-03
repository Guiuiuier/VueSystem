<template>
  <div>
    <b-container fluid>
      <div class="overflow-auto" style="padding:20px">
        <b-col>
          <h5>{{part}}在职员工信息</h5>
        </b-col>
        <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="10">
          <template v-slot>
            <!-- <b-button @click="edit(btnid)">{{btnid.id}}</b-button> -->
            <b-button type="submit" variant="warning">编辑</b-button>
            <b-button variant="danger">删除</b-button>
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
            <!-- <p>今日迟到人员:</p> -->
            <!-- <span v-for="item in names" :key="item">{{item}},</span> -->
            <!-- <p>今日早退人员:</p> -->
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

        <b-card img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
          <b-card-text>暂时不知道写什么</b-card-text>
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

        <b-card img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
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
import { Empersons_part,todayDelay,positionNum } from "@/api2";
import myecharts from "@/components/echarts";
import myechartsHistogram from "@/components/echartsHistogram";
export default {
  inject: ["reload"],
  data() {
    return {
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
  created() {
      
    //   以下的代码纯属乱写。回过头来看， 真的烂。 有空一定改，不忍直视。

      let local=localStorage.getItem("user_info");
      this.part=JSON.parse(local).part;
       console.log(this.part);
      if(this.part=="管理部"){
          this.positionData=['管理部经理','行政主管','人事专员','行政专员','培训主管'];
      }else if(this.part=="开发部"){
          this.positionData=['前端开发','后端开发'];
      }else if(this.part=="资源部"){
          this.positionData=['物料员','物料总监'];
      }else if(this.part=="销售部"){
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
        // console.log(res.data);
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
  }
};
</script>

<style lang="less" scoped>
</style>