<template>
  <div>
    <b-form>
      <b-modal v-model="show" title="新增人员">
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
                <b-form-select v-model="newforms.gender" :options="variants"></b-form-select>
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
//  兄弟间传值
import { newPer } from "@/api2";

import searchPerTravel from "./personsearch.js";
export default {
  data() {
    return {
      show: false,
      sucessShow:false,
      newforms: {
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
      variants: [{text:"男",value:'男'},'女','其他'],
      variantsState: [{text:"在职",value:'在职'},'辞职','待入职'],
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
      let {perId,perName,gender,age,part,address,contact,perState}=this.newforms

      newPer(perId,perName,gender,age,part,address,contact,perState).then(res=>{
        //  跳转到空白页面回退
        //  alert("添加成功")
      }).catch(err=>{
         console.log(err);
         
      })
      this.show = false;
      this.sucessShow=true;
      // alert(JSON.stringify(this.newforms));
      this.newforms={};
        setTimeout(()=>{
           this.sucessShow=false;
        },3000)
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