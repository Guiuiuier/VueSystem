<template>
  <div class="overflow-auto" v-if="isShow">
        <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="10">
      <template v-slot="{btnid}">
        <!-- <b-button @click="edit(btnid)">{{btnid.id}}</b-button> -->
       <b-button type="submit" variant="warning" @click="show=true,perUpdate(btnid)">编辑</b-button>
          <b-button variant="danger" @click="perDelet(btnid.id)">删除</b-button>
      </template>
    </MyLists>

    <b-form>
      <b-modal v-model="show" title="修改信息">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="6">姓名</b-col>
            <b-col cols="6">部门</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.name"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group>
                <b-form-select :options="variantsPart" v-model="newforms.part"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
           <b-col cols="6">权限</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-select :options="variantsrole" v-model="newforms.role"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <p class="float-left">请确认无误再修改！</p>
            <b-button
              type="submit"
              variant="primary"
              size="sm"
              class="float-right"
              @click="sub()"
            >确定</b-button>
            <!-- @click="show=false" -->
          </div>
        </template>
      </b-modal>
    </b-form>

  
  </div>
</template>

<script>
// 兄弟间传值
import MyLists from "@/components/list/index";
import searchPerTravel from "../sameLevelJS/search";
import { deletUsers, updateUsers, searchUsers } from "@/api2";
export default {
  inject: ["reload"],
  props: {
    //查询所有的职员
    theUsers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: true,
      perPage: 20,
      currentPage: 1,
      bordered: true,
      filter: "",
      thedata:[],
      fixed: true,
      items: [],
      boxOne: "",
      show: false,
      newforms: {
        id: "",
        name: "",
        username: "",
        userpass: "",
        part: null,
        role: null,
        perId: ""
      },
      variantsrole: [{ text: "管理员", value: "管理员" }, "员工"],
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "营销部"
      ],

      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加

            tableSection: [
        { key: "roleid", label: "员工编号" },
        { key: "part", label: "部门", sortable: true },
        { key: "role", label: "权限", sortable: true },
        { key: "username", label: "账号" },
        {
          key: "actions",
          label: "操作",
          sortable: true,
          tdClass: "align-middle"
        }
      ]
    };
  },
    components: {
    MyLists
  },
  methods: {
        onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    // 修改
    sub: function() {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认修改吗？")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          let flag = String(this.boxOne);
          if (flag === "true") {
            updateUsers(
              this.newforms.id,
              this.newforms.name,
              this.newforms.part,
              this.newforms.role
            )
              .then(res => {
                // console.log(res);
              })
              .catch(err => {
                // console.log(err);
              });
            this.show = false;
            setTimeout(() => {
              this.reload();
            }, 1000);
          }
        });
    },

    // 获取编辑内容
    perUpdate: function(item) {
      var event = event || window.event;
      event.preventDefault();
      this.newforms.username = item.username;
      this.newforms.role = item.role;
      this.newforms.part = item.part;
      this.newforms.perId = item.idPer;
      this.newforms.name = item.name;
      this.newforms.id = item.id;
      // 调用方法
    },
    perDelet: function(Ids) {
      var event = event || window.event;
      event.preventDefault();
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认删除吗？")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          let flag = String(this.boxOne);
          if (flag === "true") {
      // console.log(Ids);
      deletUsers(Ids).then(res => {});
      setTimeout(() => {
        this.reload();
      }, 1000);
          }
        })
    },
  },
  computed: {

  },

  created() {
 
    searchUsers().then(res => {
          this.thedata=res.data
    });
  }
};
</script>

<style lang="less"  scope>
td.align-middle {
  width: 120px;
}
</style>