<template>
  <div>
    <b-form>
      <b-modal v-model="show" title="新增人员">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <!-- <b-col cols="3">员工编号</b-col> -->
            <b-col cols="12">员工编号</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="12">
              <b-form-group
                valid-feedback="可以注册"
                :invalid-feedback="invalidFeedbackUser"
                :state="stateUser"
              >
                <b-form-select
                  :state="stateUser"
                  trim
                  @change="changeHireTime(newforms.roleid)"
                  v-model="newforms.roleid"
                  :options="variantsName"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="6">入职时间</b-col>
            <b-col cols="6">部门</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.hireTime" disabled></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.part" disabled></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="6">津贴</b-col>
            <b-col cols="6">基本工资</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.allowance"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.basicSalary"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">职位</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-form-input id="input-1" v-model="newforms.position" disabled></b-form-input>
          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <p class="float-left">请确认无误再添加！</p>
            <b-button type="submit" variant="primary" size="sm" class="float-right" @click="sub">确定</b-button>
            <!-- @click="show=false" -->
          </div>
        </template>
      </b-modal>
    </b-form>
    <!-- <pre class="m-0">{{ newforms }}</pre> -->
    <!-- 内容框 -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-button
          size="sm"
          class="my-2 my-sm-0"
          variant="info"
          type="submit"
          @click="show=true"
        >新增用户</b-button>
        <b-col sm="1" style="font-size:10px;color:red" v-show="sucessShow">添加成功!</b-col>
        <!-- <b-col sm="1" style="font-size:10px;color:red">失败!重新添加</b-col> -->

        <b-navbar-nav class="ml-auto">
          <searchContent></searchContent>
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
import searchContent from "@/components/searchBox/index";
import { newPer_salary, idAll, isRegistered } from "@/api2";
// 通过中间间 传入搜索信息
//  兄弟间 查询传值
// import searchPerTravel from "../sameLevelJS/search.js";
export default {
  inject: ["reload"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    // 60
    minDate.setDate(60);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      boxOne: "",
      show: false,
      sucessShow: false,
      min: minDate,
      max: maxDate,
      variantsName: [],
      items: [], //存储后端的所有数据
      newforms: {
        roleid: "",
        hireTime: "",
        part: "",
        basicSalary: 0,
        allowance: 0,
        position: ""
      },
      userRoleId: [],
      //    [
      // { label: "开发部", options: ["前端开发工程师", "后端开发工程师"]},{label:"管理部", options:["管理部经理","行政主管","行政专员","人事专员","培训主管"]},{label:"资源部", options:["物料员","物料总监"]},{label:"销售部", options:["销售专员","销售主管"] }
      //   ],
      variants: [{ text: "男", value: "男" }, "女", "其他"],
      variantsState: [{ text: "在职", value: "在职" }, "待入职"],
      variantsAge: [
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85"
      ],
      form: {
        field: ""
      }
    };
  },
  components: {
    searchContent //查询组件
  },
  computed: {
    stateUser() {
      if (this.newforms.roleid != "" && this.newforms.roleid != null) {
        let exists = this.userRoleId.includes(this.newforms.roleid);
        if (exists !== true) {
          return true;
        } else {
          return false;
        }
      }
    },
    invalidFeedbackUser() {
      let exists = this.userRoleId.includes(this.newforms.roleid);
      if (exists === true) {
        return "账号已存在！";
        return false;
      }
    }
  },
  methods: {
    changeHireTime: function(id) {
      // console.log(this.items);
      for (let i = 0; i < this.items.length; ++i) {
        if (this.items[i].roleid === id) {
          this.newforms.hireTime = this.items[i].hireTime;
          this.newforms.part = this.items[i].partPer;
          this.newforms.position = this.items[i].position;
        }
      }
    },

    sub: function() {
      var event = event || window.event;
      event.preventDefault();
        this.boxOne = "";
      let existsRoleId = this.userRoleId.includes(this.newforms.roleid);
           if ( existsRoleId !== true&&this.newforms.roleid!="") {

     this.$bvModal
          .msgBoxConfirm("确认添加吗？")
          //判断是不是确定删除
          .then(value => {
            this.boxOne = value;

            let flag = String(this.boxOne);
            if (flag === "true") {         
        let {
          roleid,
          hireTime,
          part,
          basicSalary,
          allowance,
          position
        } = this.newforms;
        newPer_salary(
          roleid,
          part,
          position,
          hireTime,
          basicSalary,
          allowance
        ).then(res => {
            this.show=false;
          setTimeout(() => {
            this.reload();
          }, 1000);
        });
      }
          })
            }else{
          alert("请输入完整!")
      }
    },
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
  },
  mounted() {},
  created() {
      let local=localStorage.getItem("user_info");
      let part=JSON.parse(local).part;
    idAll().then(res => {
        let index=0;
        let index1=0;
        // 筛选出部门的数据
      for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].partPer.includes(part)){
              index++;
              let form={};
              let form1={};
        form=res.data[i].roleid;
        form1=res.data[i]
        this.variantsName.push(form);
        this.items.push(form1);
        // this.variantsName[i] = res.data[i].roleid;
        // this.items[i] = res.data[i];
        
          }
      }
        // console.log(this.variantsName,this.items);
    });
    //查询库中有没有这个注册过的id
    isRegistered().then(res => {
      // console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        this.userRoleId.push(res.data[i].roleid);
      }
    });
  }
};
</script>