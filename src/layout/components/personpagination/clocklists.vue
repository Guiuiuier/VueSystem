<template>
<div>
      <b-card-group deck style="padding:50px">
      <b-card bg-variant="info" text-variant="white" header="申请中的请假" class="text-center">
        <b-card-text>{{jxNum}}</b-card-text>
      </b-card>

      <b-card bg-variant="success" text-variant="white" header="已完成的请假" class="text-center">
        <b-card-text>{{wcNum}}</b-card-text>
      </b-card>

      <b-card bg-variant="danger" text-variant="white" header="打卡状态" class="text-center">
        <b-card-text>上班未打卡: {{sbdkNum}}</b-card-text>
        <b-card-text>下班未打卡: {{xbdkNum}}</b-card-text>
      </b-card>
    </b-card-group>
  <div class="overflow-auto">
    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
      :bordered="bordered"
      :filter="filter"
      empty-filtered-text="emptyFilteredText"
      empty-text
      :fields="fields"
      responsive="sm"
      striped
      head-variant="dark"
      foot-clone
    ></b-table>

    <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <!-- 遍历测试没啥用 -->
    <!-- <div v-for="personnelitems in personnelInfors" :key="personnelitems.id">{{personnelitems}}</div> -->
  </div>
  </div>
</template>

<script>
// 兄弟间传值
var index = "";
import { Clocklists,vacationLists,isClock} from "@/api2";
import searchPerTravel from "../navSearch/personsearch";
export default {
  data() {
    return {
      jxNum:"",
      wcNum:"",
      sbdkNum:"",
      xbdkNum:"",
      perPage: 20,
      currentPage: 1,
      bordered: true,
      filter: "",
      fixed: true,
      items:[],
      newforms: {},

      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      fields: [
        { key: "id", label: "#", sortable: true },
        { key: "idPer", label: "员工编号", sortable: true },
        { key: "namePer", label: "员工姓名", sortable: true },
        { key: "clockTime", label: "打卡时间", sortable: true },
        { key: "clockState", label: "打卡状态", sortable: true },
        { key: "clockType", label: "打卡类型", sortable: true }
      ]
    };
  },
  methods: {
    // 接收兄弟组件内容 //查询过滤的信息
    getPassInfo() {
      const that = this;
      searchPerTravel.$on("pass-info", function(val) {
        that.filter = val;
      });
    },
    getEmptyInfo() {
      const that = this;
      searchPerTravel.$on("empty-info", function(val) {
        that.filter = val;
      });
    }
  },
  computed: {
    rows() {
      if (this.filter != "") {
        return this.filter.length;
      } else {
        return this.items.length;
      }
    }
  },
  // 监控一个props动态
  // watch: {
  //   theLists(val) {
  //     this.items = val;
  //   }
  // },
  created() {
    // 触发钩子
    this.getPassInfo();
    this.getEmptyInfo();

    let local = localStorage.getItem("user_info");
    let id = JSON.parse(local).idPer;
    let clockstate = "正常";
    Clocklists(id, clockstate).then(res => {
      // console.log(res.data);
      if(res.data!=''){

        this.items = res.data;
      }
      // console.log(this.theLists);
    });
     
     let idPer=JSON.parse(local).idPer;
     vacationLists(idPer).then(res=>{
      //  console.log(res);
       let jx=0
       let wc=0
       for(let i=0;i<res.data.length;++i){
         if(res.data[i].state=="进行中"){
            jx=jx+1;
             
          }
          if(res.data[i].state=="已完成"){
            wc=wc+1
          }
       }
       this.jxNum=jx;
       this.wcNum=wc;
      //  console.log(this.jxNum)
      //  console.log(num);
      //  console.log(res.data)
     });

        var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
       var day = date.getDate();
       let clockTime = year + "-" + month + "-" + day;
     isClock(clockTime,idPer).then(res=>{
      //  console.log(res.data)
          let sbdk=1
       let xbdk=1
       for(let i=0;i<res.data.length;++i){
         if(res.data[i].clockType=="上班打卡"){
            sbdk=sbdk-1;
            console.log(sbdk)
             
          }
          if(res.data[i].clockType=="下班打卡"){
               xbdk=xbdk-1;
            // console.log(xbdk);
          };
       }
       this.sbdkNum=sbdk;
       this.xbdkNum=xbdk;
     });
    
  }
};
</script>

<style lang="less" scoped>
</style>