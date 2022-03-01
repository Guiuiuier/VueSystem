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
       head-variant='dark'
       foot-clone
    >
    <!-- 插槽 -->
      <template #cell(功能)> 
    <b-button-group>
      <b-button variant="warning">编辑</b-button>
      <b-button variant="danger">删除</b-button>
      <!-- <b-button variant="info">Info</b-button> -->
    </b-button-group>
      </template>
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
import searchPerTravel from "../navSearch/personsearch";

export default {
  props: {
    personnelInfors: {
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
      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      fields: [
        "#",
        "员工编号",
        "姓名",
        "性别",
        "年龄",
        "部门",
        "地址",
        "联系方式",
        "在职状态",
        { key: '功能' }
      ]
    };
  },
  methods: {
    // 接收兄弟组件内容
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
        return this.personnelInfors.length;
      }
    }
  },
  // 监控一个props动态
  watch: {
    personnelInfors(val) {
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
  .thead-dark.dd{
    background: coral!important;
  }
</style>