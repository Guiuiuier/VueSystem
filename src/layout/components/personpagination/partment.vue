<template>
  <div>
    <b-container fluid>
      <div class="overflow-auto" style="padding:20px">
        <b-col>
          <h5>部门在职员工信息</h5>
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
            <p>部门总人数</p>
            <footer>
              <small>123</small>
            </footer>
          </blockquote>
        </b-card>
        <b-card>
          <myecharts></myecharts>
          <template #footer>
            <small class="text-muted">
              <span style="color:black">人员分布柱状图</span>
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
          <b-card-title>部门岗位人员分布</b-card-title>
          <myechartsHistogram></myechartsHistogram>
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
import { personnelInfo, deletPer, updatePer } from "@/api2";
import myecharts from "@/components/echarts";
import myechartsHistogram from "@/components/echartsHistogram";
export default {
  inject: ["reload"],
  data() {
    return {
      thedata: [],
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
    personnelInfo().then(res => {
      this.thedata = res.data;
    });
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