<template>
  <div class="overflow-auto" v-if="isShow">
    <MyLists :thedata="thedata" :tablesection="tableSection" :perpage="10">
      <template v-slot="{btnid}">
        <b-button type="submit" variant="warning" @click="show=true,fileUpdate(btnid)">编辑</b-button>
        <b-button variant="info" @click="downloadFile(btnid)">下载</b-button>
        <b-button variant="danger" @click="fileDelet(btnid)">删除</b-button>
      </template>
    </MyLists>

    <b-form>
      <b-modal v-model="show" title="修改信息">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="6">部门</b-col>
            <b-col cols="6">备注</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="6">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.tips" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-1 text-center">
            <b-col cols="12">重新上传文件</b-col>
          </b-row>
          <b-row class="mb-1">
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
            <p class="float-left">请确认无误再修改！</p>
            <b-button type="submit" variant="primary" size="sm" class="float-right" @click="sub">确定</b-button>
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
import {
  DeletFile,
  uploadFile,
  updateFile,
  downloadFile,
  Fileinfors,
  updateFileWord
} from "@/api2";
export default {
  inject: ["reload"],
  data() {
    return {
      thedata: [],
      fileinputName: null,
      isShow: true,
      perPage: 20,
      currentPage: 1,
      bordered: true,
      filter: "",
      fixed: true,
      show: false,
      boxOne: "",
      items: [],
      newforms: {
        tips: null,
        part: null,
        id: ""
      },
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "营销部"
      ],
      tableSection: [
        { key: "id", label: "#", sortable: true },
        { key: "user", label: "上传用户", sortable: true },
        { key: "partment", label: "部门", sortable: true },
        { key: "fileName", label: "文件名", sortable: true },
        { key: "uploadTime", label: "上传时间", sortable: true },
        { key: "tip", label: "备注" },
        {
          key: "actions",
          label: "操作",
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

    //修改
    sub: function() {
      let local = localStorage.getItem("user_info");
      let username = JSON.parse(local).username;
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
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认修改吗？").then(value => {
        this.boxOne = value;
        // console.log(typeof this.boxOne);
        let flag = String(this.boxOne);
        if (flag === "true") {
          let that = this;
          let fileinput = that.$refs.fileinput.files[0];

          //判断文件是否为空
          if (fileinput != undefined || fileinput != null) {
            let size = Math.floor(fileinput.size / 1024);
            // console.log(size);
            if (size > 20 * 1024 * 1024) {
              alert("超过20M的图片,docx,pdf不允许上传！");
              return false;
            }
            let formData = new window.FormData();
            formData.append("id", this.newforms.id);
            formData.append("username", username);
            formData.append("currentTime", currentTime);
            formData.append("fileContent", this.newforms.tips);
            formData.append("part", that.newforms.part);
            formData.append("File", that.$refs.fileinput.files[0]); //指向全局中的files
            // console.log(formData.get("part"));
            updateFile(formData).then(res => {
              // console.log(res);
            });
            this.show = false;
            this.fileinputName = [];
            setTimeout(() => {
              this.reload();
            }, 1000);
            // this.reload();
          } else {
            //如果用户没有重新上传文件则进入这里
            updateFileWord(
              username,
              currentTime,
              this.newforms.id,
              this.newforms.part,
              this.newforms.tips
            )
              .then(res => {})
              .catch(err => {});
            this.show = false;
            this.fileinputName = [];
            setTimeout(() => {
              this.reload();
            }, 1000);
            // this.reload();
          }
        }
      });
    },
    clearFiles() {
      this.$refs["fileinput"].reset();
      this.fileinputName = [];
    },
    // 下载

    downloadFile: function(item) {
      downloadFile(item.fileName).then(res => {
        //返回blob对象里的url
        const fileUrl = window.URL.createObjectURL(res.data);
        // 创建一个标签
        const fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        //定义下载的文件名称  可以改为接收到的参数
        fileLink.download = item.fileName;
        fileLink.click();
        this.newforms.id = item.id;
      });
    },

    //传值到编辑里面
    fileUpdate: function(item) {
      var event = event || window.event;
      event.preventDefault();
      this.newforms.part = item.partment;
      this.newforms.tips = item.tip;
      this.newforms.id = item.id;
    },
    // 调用方法 删除
    fileDelet: function(item) {
      this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认删除吗？").then(value => {
        this.boxOne = value;
        let flag = String(this.boxOne);
        if (flag === "true") {
          var event = event || window.event;
          event.preventDefault();
          DeletFile(item.id, item.fileName).then(res => {});
                   setTimeout(() => {
              this.reload();
            }, 1000);
        }
      });
    }
  },
  computed: {},
  mounted() {
    this.rows = this.items.length;
  },

  created() {
    Fileinfors().then(res => {
      this.thedata = res.data;
    });
  }
};
// 接收兄弟组件内容 //查询过滤的信息
// getPassInfo() {
//   const that = this;
//   searchPerTravel.$on("pass-info", function(val) {
//     that.filter = val;
//   });
// },
// getEmptyInfo() {
//   const that = this;
//   searchPerTravel.$on("empty-info", function(val) {
//     that.filter = val;
//   });
// }
// 监控一个props动态
// watch: {
//   theFiles(val) {
//     this.items = val;
//   }
// },
// rows() {
//   if (this.filter != "") {
//     return this.filter.length;
//   } else {
//     return this.items.length;
//   }
// }
</script>

<style lang="less" >
td.align-middle {
  width: 190px;
}
</style>