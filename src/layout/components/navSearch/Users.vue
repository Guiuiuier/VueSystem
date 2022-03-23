<template>
  <div>
    <b-form>
      <b-modal v-model="show" title="新增人员">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="12">员工编号</b-col>
            <!-- <b-col cols="4">部门</b-col> -->
          </b-row>

          <b-row class="mb-1">
            <b-col cols="12">
              <b-form-group
                valid-feedback="可以注册"
                :invalid-feedback="invalidFeedbackUser"
                :state="stateUser"
              >
                <b-form-select
                  id="input-1"
                  v-model="newforms.perId"
                  :options="userId"
                  :state="stateUser"
                  trim
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="6">权限</b-col>
            <b-col cols="6">部门</b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.role" :options="variants"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="6">账号</b-col>
            <b-col cols="6">邮箱(重要找回密码用！)</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group
                valid-feedback="可以注册"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input id="input-1" v-model="newforms.userName" :state="state" trim></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" type="email" v-model="newforms.email"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
             <b-col cols="6">账号密码</b-col>
            <b-col cols="6">请再次输入密码</b-col>
          </b-row>

          <b-row class="mb-1">
                        <b-col cols="6">
              <b-form-group>
                <b-form-input type="password" id="input-1" v-model="newforms.password"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-input type="password" id="input-1" v-model="newforms.rePassword"></b-form-input>
              </b-form-group>
            </b-col>
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
          <b-nav-form>
            <b-form-input v-model="form.field" size="sm" class="mr-sm-2" placeholder="请输入员工姓名或者ID"></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              variant="success"
              type="submit"
              @click="searchBtn"
            >查询内容</b-button>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="emptyInfo">清空</b-button>
          </b-nav-form>
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
import { newUsers, idAll, allUsername } from "@/api2";
// 通过中间间 传入搜索信息
//  兄弟间传值
import searchPerTravel from "./personsearch.js";
export default {
  inject: ["reload"],
  data() {
    return {
      show: false,
      boxOne: "",
      sucessShow: false,
      allusername: [],
      allroleid: [],
      newforms: {
        userName: "",
        password: "",
        rePassword: "",
        role: null,
        // perId: "",
        part: null,
        perId: "",
        email:"",
      },
      variants: [{ text: "管理员", value: "管理员" }, "员工"],
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "销售部"
      ],
      form: {
        field: ""
      },
      userId: []
    };
  },
  computed: {
    stateUser(){
        if(this.newforms.perId!=""&&this.newforms.perId!=null){
           let exists = this.allroleid.includes(this.newforms.perId);
        if (exists !== true) {
          return true;
        } else {
          return false;
        }
        }
    },
    invalidFeedbackUser(){
      let exists = this.allroleid.includes(this.newforms.perId);
      if (exists === true) {
        return "账号已存在！";
      }
    },
    state() {
      if (this.newforms.userName != "" && this.newforms.userName != null) {
        let exists = this.allusername.includes(this.newforms.userName);
        if (exists !== true) {
          return true;
        } else {
          return false;
        }
      }
    },
    invalidFeedback() {
      // includes 匹配数组是否有某个值
      let exists = this.allusername.includes(this.newforms.userName);
      if (exists === true) {
        return "账号已存在！";
      }
    }
  },
  methods: {
    sub: function() {
      var event = event || window.event;
      event.preventDefault();
      // 解构一下
      let { perId, part, password, role, userName,email } = this.newforms;
      let existsUsername = this.allusername.includes(this.newforms.userName);
      let existsRoleId=this.allroleid.includes(this.newforms.perId);
     if (
        (this.newforms.userName != "" ||
          this.newforms.password != "" ||
          this.newforms.role != null ||
          this.newforms.part != null,
        this.newforms.perId != ""||this.newforms.email!="")
      ) {
        if (existsUsername !== true &&existsRoleId!==true) {
          if (this.newforms.password == this.newforms.rePassword) {
            this.boxOne = "";
            this.$bvModal
              .msgBoxConfirm("确认创建新用户吗？")
              //判断是不是确定删除
              .then(value => {
                this.boxOne = value;

                // console.log(typeof this.boxOne);
                let flag = String(this.boxOne);
                if (flag === "true") {
                  newUsers(perId, password, userName, part, role,email)
                    .then(res => {
                      alert("添加成功");
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
                  allUsername().then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                      this.allusername.push(res.data[i].username);
                    }
                  });
                }
              });
          } else {
            alert("两次输入密码不一致");
          }
        }
      } else {
        alert("请检查邮箱格式或者输入内容？");
      }
    },

    searchBtn: function() {
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
  },
  created() {
    idAll().then(res => {
      // console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        this.userId.push(res.data[i].roleid);
      }
    });
    allUsername().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.allusername.push(res.data[i].username);
        this.allroleid.push(res.data[i].roleid);
        // console.log(this.allroleid)
      }
    });
  }
};
</script>