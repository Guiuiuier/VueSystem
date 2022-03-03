<template>
  <div>
 
    <!-- <pre class="m-0">{{ newforms }}</pre> -->
    <!-- 内容框 -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input v-model="form.field" size="sm" class="mr-sm-2" placeholder="请输入查询的账户"></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              variant="success"
              type="submit"
              @click="searchBtn"
            >查询内容</b-button>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="emptyInfo">清空</b-button>
          </b-nav-form>
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

import searchPerTravel from "./personsearch.js";
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
  methods: {
    //   查询的内容 
    searchBtn: function() {
      var event = event || window.event;
      event.preventDefault();
      // 传值 这个value要和兄弟组件接收的on相同 不支持驼峰命名
      searchPerTravel.$emit("pass-info", this.form.field);
    },
    // 清空的内容 对应index.vue 是人员管理的内容
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