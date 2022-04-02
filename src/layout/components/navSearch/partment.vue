<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
              <b-button size="sm" class="my-2 my-sm-0" variant="info" type="submit">新增人员</b-button>
        <b-navbar-nav class="ml-auto">
          <searchContent>
          </searchContent>
        </b-navbar-nav>
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
//  兄弟间传值
import { newPer } from "@/api2";
import searchContent from "@/components/searchBox/index";
export default {
  data() {
    return {
      show: false,
      sucessShow:false,
      newforms: {
        perName: "",
        age: "",
        address: "",
        contact: "",
        perState: null,
        gender: null,
        // perId: "",
        part: null,
        perId: ""
      },
      form: {
        field: ""
      }
    };
  },
   components: {
    searchContent //查询组件
  },
  methods: {
    //   查询的内容 
    searchBtn: function() {
      var event = event || window.event;
      event.preventDefault();
      // 传值 这个value要和兄弟组件接收的on相同 不支持驼峰命名
      searchPerTravel.$emit("pass-info", this.form.field);
    },
  
    emptyInfo: function() {
      var empty = "";
      this.form.field = "";
      var event = event || window.event;
      event.preventDefault();
      searchPerTravel.$emit("empty-info", empty);
    },
    mounted() {
        
    },
  }
};
</script>