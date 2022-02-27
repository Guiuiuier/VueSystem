<template>
  <div>
    <Navsearch></Navsearch>
    <!-- <div style="width:100%;position:absolute"> -->
    <b-list-group horizontal="md">
      <b-list-group-item>#</b-list-group-item>
      <b-list-group-item>员工编号</b-list-group-item>
      <b-list-group-item>姓名</b-list-group-item>
      <b-list-group-item>性别</b-list-group-item>
      <b-list-group-item>年龄</b-list-group-item>
      <b-list-group-item>部门</b-list-group-item>
      <b-list-group-item>地址</b-list-group-item>
      <b-list-group-item>联系方式</b-list-group-item>
      <b-list-group-item>在职状态</b-list-group-item>
      <b-list-group-item>功能</b-list-group-item>
    </b-list-group>
    <b-list-group horizontal="md">
      <b-list-group-item>#</b-list-group-item>
      <b-list-group-item>员工编号</b-list-group-item>
      <b-list-group-item>姓名</b-list-group-item>
      <b-list-group-item>性别</b-list-group-item>
      <b-list-group-item>年龄</b-list-group-item>
      <b-list-group-item>部门</b-list-group-item>
      <b-list-group-item>地址</b-list-group-item>
      <b-list-group-item>联系方式</b-list-group-item>
      <b-list-group-item>在职状态</b-list-group-item>
      <b-list-group-item>功能</b-list-group-item>
    </b-list-group>
    <b-list-group horizontal="md">
      <b-list-group-item>#</b-list-group-item>
      <b-list-group-item>员工编号</b-list-group-item>
      <b-list-group-item>姓名</b-list-group-item>
      <b-list-group-item>性别</b-list-group-item>
      <b-list-group-item>年龄</b-list-group-item>
      <b-list-group-item>部门</b-list-group-item>
      <b-list-group-item>地址</b-list-group-item>
      <b-list-group-item>联系方式</b-list-group-item>
      <b-list-group-item>在职状态</b-list-group-item>
      <b-list-group-item>功能</b-list-group-item>
    </b-list-group>
    <b-list-group horizontal="md">
      <b-list-group-item>#</b-list-group-item>
      <b-list-group-item>员工编号</b-list-group-item>
      <b-list-group-item>姓名</b-list-group-item>
      <b-list-group-item>性别</b-list-group-item>
      <b-list-group-item>年龄</b-list-group-item>
      <b-list-group-item>部门</b-list-group-item>
      <b-list-group-item>地址</b-list-group-item>
      <b-list-group-item>联系方式</b-list-group-item>
      <b-list-group-item>在职状态</b-list-group-item>
      <b-list-group-item>功能</b-list-group-item>
    </b-list-group>

    <b-table></b-table>
    <Pagination></Pagination>
  </div>
  <!-- </div> -->
</template>

<script>
import {personnelInfo} from '@/api2';
import axios from "axios"
import Navsearch from "@/layout/components/navSearch/index";
import Pagination from "@/layout/components/pagination/index";
export default {
  data() {
    return {};
  },
  components: {
    Navsearch,
    Pagination
  },
  created() {
     personnelInfo().then(res=>{
       console.log(res);
     })

  }
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>