<template>
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
    >
    </b-table>
   
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
</template>

<script>
// 兄弟间传值
var index = "";
import searchPerTravel from "../navSearch/personsearch";
import { deletPer, updatePer } from "@/api2";
export default {
  props: {
    theLogs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      bordered: true,
      filter: "",
      fixed: true,
      items: [],
      newforms: {
      },

      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      fields: [
        { key: "id", label: "#", sortable: true },
        { key: "user", label: "上传用户",sortable: true  },
        { key: "partment", label: "部门", sortable: true },
        { key: "fileName", label: "文件名", sortable: true },
        { key: "uploadTime", label: "上传时间", sortable: true },
        { key: "action", label: "操作",sortable: true },
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
        return this.theLogs.length;
      }
    }
  },
  // 监控一个props动态
  watch: {
    theLogs(val) {
      this.items = val;
    }
  },
  created() {
    // 触发钩子
    this.getPassInfo();
    this.getEmptyInfo();
  }
};
</script>

<style lang="less" scoped>


</style>