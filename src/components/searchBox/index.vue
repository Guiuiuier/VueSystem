<template>
  <div>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input
          id="input-1"
          v-model="form.field"
          size="sm"
          class="mr-sm-2"
          placeholder="请输入员工姓名或者ID"
        ></b-form-input>
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
  </div>
</template>
<script>
import searchPerTravel from "@/layout/components/sameLevelJS/search";
export default {
  name: "searchContent", //查询组件暴露出去
  data() {
    return {
      form: {
        field: ""
      }
    };
  },
  methods: {
    searchBtn: function() {
      // console.log(this.form.field);
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>