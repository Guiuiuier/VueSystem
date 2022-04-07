<template>
  <div>
    <b-container fluid>
      <b-form>
        <b-modal v-model="show" title="修改信息">
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <b-col cols="6">基本工资</b-col>
              <b-col cols="6">津贴</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.basicSalary"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group>
                  <b-form-input id="input-1" v-model="newforms.allowance"></b-form-input>
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
                @click="sub"
              >确定</b-button>
            </div>
          </template>
        </b-modal>
      </b-form>
      <div class="overflow-auto" style="padding:20px">
        <b-col>
          tips:当输入的内容不是数字的时候后会默认输入的内容为0，并且仅显示在职员工。防止恶意操作
        </b-col>
        <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="5">
          <template v-slot="{btnid}">
            <b-button type="submit" variant="warning" @click="show=true,perUpdate(btnid)">编辑</b-button>
            <b-button variant="danger" @click="perDelet(btnid.id)">删除</b-button>
          </template>
        </MyLists>
      </div>
    </b-container>
  </div>
</template>
<script>
// Vue.prototype
import MyLists from "@/components/list/index";
import searchPerTravel from "@/layout/components/sameLevelJS/search";
import { alluser, updatePerWages,deletPer_wages } from "@/api2";

export default {
  inject: ["reload"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    // 60
    minDate.setDate(60);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      items: [],
      newforms: {
        id: "",
        allowance: 0,
        basicSalary: 0,
        perId: ""
      },

      isShow: true,
      isShow2: false,
      thedata: [],
      show: false,
      tableSection: [
        { key: "roleid", label: "员工编号", sortable: true },
        { key: "part", label: "部门", sortable: true },
        { key: "position", label: "职位" },
        { key: "hireTime", label: "入职时间" },
        { key: "basicsalary", label: "基本工资" },
        { key: "allowance", label: "津贴" },
        { key: "actions", label: "操作", tdClass: "align-middle" }
      ]
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    // 清空离职时间

    sub: function() {
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认修改吗？").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
          let isNum = /^\d+$/;
          if (isNum.test(this.newforms.basicSalary)&&isNum.test(this.newforms.allowance)) {
            updatePerWages(
              this.newforms.id,
              this.newforms.basicSalary,
              this.newforms.allowance
            ).then(res => {
              setTimeout(() => {
                this.reload();
              }, 500);
            });
          } else {
            updatePerWages(this.newforms.id, 0, 0).then(res => {
              setTimeout(() => {
                this.reload();
              }, 500);
            });
          }
        }
      });
    },

    // 获取编辑内容
    perUpdate: function(item) {
      //   console.log(item);
      var event = event || window.event;
      event.preventDefault();
      this.newforms.allowance = item.allowance;
      this.newforms.basicSalary = item.basicsalary;
      this.newforms.perId = item.idPer;
      this.newforms.id = item.id;
      // 调用方法
    },
    perDelet: function(Ids) {
      var event = event || window.event;
      event.preventDefault();
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认删除吗？无法恢复的操作！")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          // console.log(typeof this.boxOne);
          let flag = String(this.boxOne);
          if (flag === "true") {
            deletPer_wages(Ids)
              .then(res => {
                  
             setTimeout(()=>{
             this.reload();
            },500)
              })
              .catch(err => {});

          }
        });
    }
  },

  created() {
    let local = localStorage.getItem("user_info");
    this.part = JSON.parse(local).part;
    //    console.log(this.part);

    //   console.log(local);
    alluser(this.part).then(res => {
    //   console.log(res.data);
      this.thedata = res.data;
      this.totalPeople = res.data.length;
    });
  },
  components: {
    MyLists
  },
  mounted() {
    this.rows = this.items.length;
  }
};
</script>

<style lang="less" scope>
td.align-middle {
  width: 150px;
}
.alert alert-info {
  background-color: none;
}
</style>