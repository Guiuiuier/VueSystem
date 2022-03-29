<template>
  <div class="overflow-auto">
    <!-- es  结构的方式更好 v-slot=slotProps.btnid => {btnid}-->
<MyLists :thedata="theLogs" :tablesection="tableSection" :perpage="10">
  <!-- <template  v-slot="{btnid}"> 
    <b-button @click="edit(btnid)">{{btnid.id}}</b-button>
  </template> -->
  </MyLists>
  </div>
</template>

<script>
// 兄弟间传值
import MyLists from "@/components/list/index";
import searchPerTravel from "../sameLevelJS/search";
// import { deletPer, updatePer } from "@/api2";
export default {
  props: {
    theLogs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: [],
      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      tableSection: [
        { key: "id", label: "#", sortable: true },
        { key: "thisTime", label: "本次登录时间",sortable: true },
        { key: "thisIp", label: "本次登录IP",  },
        { key: "user", label: "登录账户",sortable: true  },
        { key: "lastTime", label: "上次登陆时间", sortable: true },
        { key: "lastIp", label: "上次IP",},
        // {key:"actions",label:"操作"}
      ]
    };
  },
   components:{
    MyLists,
  },
//  methods: {
//    edit:function(e){
// console.log(e);
//    }
//  },
  // 监控一个props动态
  watch: {
    theLogs(val) {
      this.items = val;
    }
  },
  created() {
    console.log(this.theLogs[0]);
  }
};
</script>
<style lang="less" scoped>

</style>