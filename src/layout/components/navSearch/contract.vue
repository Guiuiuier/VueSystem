<template>
  <div>
    <!-- 内容框 -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-form>
        <b-modal v-model="show" title="上传合同模板">
          <b-container fluid>
            <b-row class="mb-1 text-center">
              <b-col cols="6">文件用途</b-col>
              <b-col cols="6">文件所属部门</b-col>
            </b-row>
            <b-col style="margin:0 auto"></b-col>
            <b-row class="mb-1">
              <b-col cols="6">
                <b-form-group>
                  <b-form-input v-model="newforms.fileContent"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group>
                  <b-form-select v-model="newforms.part" :options="variants"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group>
                  <b-form-file
                    ref="fileinput"
                    type="file"
                    class="mb-2"
                    name="uploadfile"
                    style="margin:0 !important"
                    placeholder="在这里上传文件"
                    required
                    v-model="fileinputName"
                    accept=".txt, .docx"
                  ></b-form-file>
                  <!-- <p>上传文件<input  ref="fileinput" name="uploadfile" type="file"  value="" /></p> -->
                  <span class="mt-2">
                    <small>仅允许docx.txt格式文件</small>
                  </span>
                  <span class="mt-2">
                    上传的文件是:
                    <b>{{fileinputName?fileinputName.name:''}}</b>
                  </span>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
                  <b-button @click="clearFiles">重置上传内容</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>

          <template #modal-footer>
            <div class="w-100">
              <p class="float-left">请确认无误上传！</p>
              <b-button
                type="submit"
                variant="primary"
                size="sm"
                class="float-right"
                @click="fileSub"
              >确定</b-button>
              <!-- @click="show=false" -->
            </div>
          </template>
        </b-modal>
      </b-form>

      <b-button size="sm" class="my-2 my-sm-0" variant="info" type="submit" @click="show=true">上传模板</b-button>
      <b-col sm="1" style="font-size:10px;color:red" v-show="sucessShow">上传成功!</b-col>
      <!-- <b-col sm="1" style="font-size:10px;color:red">失败!重新添加</b-col> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input v-model="form.field" size="sm" class="mr-sm-2" placeholder="请输入查询的账户"></b-form-input>
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
import axios from "axios";
import { newPer, uploadFile } from "@/api2";
import searchPerTravel from "./personsearch.js";
export default {
  data() {
    return {
      show: false,
      sucessShow: false,
      fileinputName: null,
      //files: "", //文件数据
      newforms: {
        part: null,
        fileContent: null
      },
      variants: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "销售部"
      ],
      form: {
        field: ""
      }
    };
  },
  methods: {
    //上传文件
     fileSub:function() {
      if (
        (this.newforms.part != undefined || this.newforms.part != null) &&
        this.fileinputName != null &&
        (this.newforms.fileContent != undefined ||
          this.newforms.fileContent != null)
      ) {
        let that = this;
        let fileinput = that.$refs.fileinput.files[0];
        let size = Math.floor(fileinput.size / 1024);
        console.log(size);
        if (size > 20 * 1024 * 1024) {
          alert("超过20M的图片,docx,pdf不允许上传！");
          return false;
        }
        let formData = new window.FormData();
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        let currentTime =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minutes +
          ":" +
          second +
          "";
        formData.append("currentTime", currentTime);
        formData.append("fileContent", this.newforms.fileContent);
        formData.append("part", that.newforms.part);
        formData.append("File", that.$refs.fileinput.files[0]); //指向全局中的files
        console.log(formData.get("part"));
        uploadFile(formData).then(res => {
          console.log(res);
        });
        this.show=false;
        this.sucessShow=true;
        // alert(JSON.stringify(this.newforms));
      } else {
        alert("请填完所有信息");
      }
    },
    clearFiles() {
      this.$refs["fileinput"].reset();
    },
    //   查询的内容
    searchBtn: function() {
      var event = event || window.event;
      event.preventDefault();
      // 传值 这个value要和兄弟组件接收的on相同 不支持驼峰命名
      searchPerTravel.$emit("pass-info", this.form.field);
    },
    // 清空的内容 对应index.vue 是人员管理的内容
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