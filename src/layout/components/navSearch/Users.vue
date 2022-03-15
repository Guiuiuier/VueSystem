<template>
  <div>
    <b-form>
      <b-modal v-model="show" title="新增人员">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="4">员工编号</b-col>
            <b-col cols="4">姓名</b-col>
         <b-col cols="4">部门</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perId"></b-form-input>
              </b-form-group>
            </b-col>


            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perName"></b-form-input>
              </b-form-group>
            </b-col>
    
            <b-col cols="4">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class="mb-1 text-center">
            <b-col cols="4">账号</b-col>
            <b-col cols="4">密码</b-col>
             <b-col cols="4">权限</b-col>
          </b-row>

          <b-row class="mb-1">

            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.userName"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group>
                <b-form-input type="password" id="input-1" v-model="newforms.password"></b-form-input>
              </b-form-group>
            </b-col>
                <b-col cols="4">
              <b-form-group>
                <b-form-select v-model="newforms.role" :options="variants"></b-form-select>
              </b-form-group>
            </b-col>

          </b-row>
        </b-container>

        <template #modal-footer>
          <div class="w-100">
            <p class="float-left">请确认无误再添加！</p>
                      <b-button
                      type="submit"
            variant="primary"
            size="sm"
            class="float-right"
            @click="sub"
          >
           确定
          </b-button>
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
import { newUsers } from "@/api2";
// 通过中间间 传入搜索信息
//  兄弟间传值
import searchPerTravel from "./personsearch.js";
export default {
  data() {
    return {
      show: false,
      sucessShow:false,
      newforms: {
        perName: "",
        userName:"",
        password:"",
        role: null,
        // perId: "",
        part: null,
        perId: ""
      },
      variants: [{text:"管理员",value:'管理员'},'员工'],
      variantsPart: [{text:"开发部",value:'开发部'},'管理部','资源部','销售部'],
      form: {
        field: ""
      }
    };
  },
  methods: {
    sub: function() {
      var event=event||window.event;
      event.preventDefault();
        // 解构一下
      let {perId,perName,part,password,role,userName}=this.newforms

      newUsers(perId,userName,password,perName,part,role).then(res=>{
        //  跳转到空白页面回退
         alert("添加成功")
      }).catch(err=>{
         console.log(err);
         
      })
      this.show = false;
      this.sucessShow=true;
    //   alert(JSON.stringify(this.newforms));
      this.newforms={};
        setTimeout(()=>{
           this.sucessShow=false;
        },3000);
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
    mounted() {
        
    },
  }
};
</script>