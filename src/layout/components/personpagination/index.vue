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
      <!-- 插槽 -->
      <template v-slot:cell(actions)="row">
        <b-button-group>
          <b-button
            type="submit"
            variant="warning"
            @click="show=true,perUpdate(row.item)"
          >编辑</b-button>
          <!-- 传值 -->
          <!-- <b-button variant="danger" @click="perDelet(row.item,row.index,$event.target)">删除</b-button> -->
          <b-button variant="danger" @click="perDelet(row.item.id)">删除</b-button>
          <!-- <b-button variant="info">Info</b-button> -->
        </b-button-group>
      </template>
    </b-table>
    <b-form>
      <b-modal v-model="show" title="修改信息">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="3">员工编号</b-col>
            <b-col cols="3">姓名</b-col>
            <b-col cols="3">性别</b-col>
            <b-col cols="3">年龄</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-group-1" v-model="newforms.perId"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perName"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <b-form-select :options="variants" v-model="newforms.gender"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.age"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="3">联系方式</b-col>
            <b-col cols="3">地址</b-col>
            <b-col cols="3">在职状态</b-col>
            <b-col cols="3">部门</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.contact"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.address"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <b-form-select v-model="newforms.perState" :options="variantsState"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="3">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <p class="float-left">请确认无误再修改！</p>
            <b-button type="submit" variant="primary" size="sm" class="float-right" @click="sub">确定</b-button>
            <!-- @click="show=false" -->
          </div>
        </template>
      </b-modal>
    </b-form>
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
      show: false,
      newforms: {
        id:"",
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
      variants: [{ text: "男", value: "男" }, "女", "其他"],
      variantsState: [{ text: "在职", value: "在职" }, "离职", "待入职"],
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "营销部"
      ],

      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      fields: [
        { key: "id", label: "#", sortable: true },
        { key: "idPer", label: "员工编号", },
        { key: "namePer", label: "姓名", sortable: true },
        { key: "genderPer", label: "性别", sortable: true },
        { key: "agePer", label: "年龄", sortable: true },
        { key: "partPer", label: "部门" },
        { key: "addressPer", label: "地址" },
        { key: "contactPer", label: "联系方式" },
        { key: "statePer", label: "在职状态", sortable: true },
        { key: "actions", label: "操作", tdClass: "align-middle",}
      ]
    };
  },
  methods: {
    // 修改
    sub: function() {
     updatePer(this.newforms.id,this.newforms.perId,this.newforms.perName,this.newforms.gender,this.newforms.age,this.newforms.part,this.newforms.address,this.newforms.contact,this.newforms.perState)
      .then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(res);
        
      })
       this.show = false;
    },
    perUpdate: function(item) {
      var event = event || window.event;
      event.preventDefault();
      // this.newforms.perId=item.perId;
      // 一时半会儿没有很好的方法全部赋值 尝试过解构。。。。 到时候这些模板我给写成组件就好了。先这样吧。
      // 调试过程中注意名字是否相反。 因为我想不出有啥很好的变量名。怪我。
      this.newforms.perName = item.namePer;
      this.newforms.gender = item.genderPer;
      this.newforms.age = item.agePer;
      this.newforms.part = item.partPer;
      this.newforms.contact = item.contactPer;
      this.newforms.perState = item.statePer;
      this.newforms.address = item.addressPer;
      this.newforms.perId = item.idPer;
      this.newforms.id=item.id;
      //  console.log(this.newforms.perId=item.idPer);
      // console.log(item);
      // 调用方法
    },
    // 删除 由于UI原因 新增用户在navSearch中
    perDelet: function(Ids) {
      var event = event || window.event;
      event.preventDefault();
      deletPer(Ids).then(res => {
        console.log(res);
      });
    },
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
// @import "../../../../public/backmain.less";


</style>