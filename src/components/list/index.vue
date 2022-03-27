

<template>
  <!-- 
thedata 传输的数据，
tablesection 需要的字段名格式为 [{"1":"1"}], 当字段的名字为actions时 可以添加一个插槽到其中
perpage 每页显示的数据 如果不设置默认为20个
  -->
  <div>
    <div class="overflow-auto">
      <b-table
        id="my-table"
        :items="thedata"
        :per-page="perpage"
        :current-page="currentPage"
        small
        :bordered="bordered"
        :filter="filter"
      @filtered="onFiltered"
        :fields="tablesection"
        responsive="sm"
        striped
         show-empty
         
        head-variant="dark"
        foot-clone
      >
        <template v-slot:cell(actions)="row">
          <b-button-group>
            <slot></slot>
          </b-button-group>
        </template>
      </b-table>
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perpage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import searchPerTravel from "@/layout/components/sameLevelJS/search";
export default {
  props: {
    thedata: {
      type: Array,
      default: () => []
    },
    tablesection: {
      type: Array,
      default: () => []
    },
    perpage: {
      type: Number,
      default: 10
    }
  },
  name: "myLists",
  data() {
    return {
        rows: 1,
      currentPage: 1,
      bordered: true,
      filter: [],
    };
  },
  methods: {
     //过滤后的长度分页
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.rows = filteredItems.length
        this.currentPage = 1
      },
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
  created() {
    console.log(this.filter.length);
    // 触发钩子
    this.getPassInfo();
    this.getEmptyInfo();
  },
  mounted() {
      this.rows=this.thedata.length;
  },
};
</script>