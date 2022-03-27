<template>
  <div>
    <b-form>
      <b-modal v-model="show" title="新增人员">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <!-- <b-col cols="3">员工编号</b-col> -->
            <b-col cols="4">姓名</b-col>
            <b-col cols="4">性别</b-col>
            <b-col cols="4">年龄</b-col>
          </b-row>

          <b-row class="mb-1">
            <!-- <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perId"></b-form-input>
              </b-form-group>
            </b-col>-->
            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perName"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select v-model="newforms.gender" :options="variants"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select v-model="newforms.age" :options="variantsAge"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="6">联系方式</b-col>
            <b-col cols="6">地址</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.contact"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.address"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="6">在职状态</b-col>
            <b-col cols="6">部门</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.perState" :options="variantsState"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">入职时间（非必选）</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-form-datepicker v-model="newforms.InTheTime" block locale="zh" :max="max" :min="min"></b-form-datepicker>
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
import { newPer } from "@/api2";
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
    minDate.setMonth(minDate.getMonth());
    //  两个月前的前十五天
    // minDate.setDate(15);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      InTheTime: "",
      boxOne: "",
      show: false,
      sucessShow: false,
      newforms: {
        perName: "",
        age: "",
        address: "",
        contact: "",
        perState: "",
        gender: "",
        // perId: "",
        part: ""
        // perId: ""
      },
      variants: [{ text: "男", value: "男" }, "女", "其他"],
      variantsState: [{ text: "在职", value: "在职" }, "待入职"],
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "销售部"
      ],
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
  methods: {
    sub: function() {
      var event = event || window.event;
      event.preventDefault();
      this.boxOne = "";
      if (
        this.newforms.contact.length < 11 ||
        this.newforms.perName.length < 1 ||
        this.newforms.age.length < 1 ||
        this.newforms.perState.length < 1 ||
        this.newforms.gender.length < 1 ||
        this.newforms.part.length < 1 ||
        this.newforms.address.length < 1
      ) {
        alert("请核对信息再提交(或手机号是否为11位?)");
        return false;
      } else {
        this.$bvModal
          .msgBoxConfirm("确认发布吗？")
          //判断是不是确定删除
          .then(value => {
            this.boxOne = value;

            let flag = String(this.boxOne);
            if (flag === "true") {
              // 解构一下
              let {
                perName,
                gender,
                age,
                part,
                address,
                contact,
                perState
              } = this.newforms;

              newPer(perName, gender, age, part, address, contact, perState)
                .then(res => {
                  //  跳转到空白页面回退
                  //  alert("添加成功")
                })
                .catch(err => {
                  console.log(err);
                });
              this.show = false;
              this.sucessShow = true;
              // alert(JSON.stringify(this.newforms));
              this.newforms = {};
              setTimeout(() => {
                this.reload();
              }, 1000);
              setTimeout(() => {
                this.sucessShow = false;
              }, 3000);
            }
          });
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
    },
    mounted() {}
  }
};
</script>