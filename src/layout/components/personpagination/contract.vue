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
      <template v-slot:cell(actions)="row">
        <b-button-group>
          <b-button type="submit" variant="warning" @click="show=true,fileUpdate(row.item)">编辑</b-button>
          <!-- 传值 -->
          <!-- <b-button variant="danger" @click="perDelet(row.item,row.index,$event.target)">删除</b-button> -->
          <b-button variant="info" @click="downloadFile(row.item)">下载</b-button>
          <b-button variant="danger" @click="fileDelet(row.item)">删除</b-button>

          <!-- <b-button variant="info">Info</b-button> -->
        </b-button-group>
      </template>
    </b-table>
    <b-form>
      <b-modal v-model="show" title="修改信息">
        <b-container fluid>
          <b-row class="mb-1 text-center">
            <b-col cols="3">部门</b-col>
            <b-col cols="3">备注</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="3">
              <b-form-group>
                <b-form-select v-model="newforms.part" :options="variantsPart"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.tips"></b-form-input>
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
import { DeletFile, updateFile, downloadFile } from "@/api2";
export default {
  props: {
    theFiles: {
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
      show: false,

      items: [],
      newforms: {
        tips: null,
        // perId: "",
        part: null,
        id: ""
      },
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "营销部"
      ],
      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      fields: [
        { key: "id", label: "#", sortable: true },
        { key: "user", label: "上传用户", sortable: true },
        { key: "partment", label: "部门", sortable: true },
        { key: "fileName", label: "文件名", sortable: true },
        { key: "uploadTime", label: "上传时间", sortable: true },
        { key: "tip", label: "备注" },
        { key: "actions", label: "操作", sortable: true }
      ]
    };
  },
  methods: {
    //修改
    sub: function() {
      //为什么能获取到这个id 因为点击编辑的时候已经提前在slot中获取到了。
      updateFile(this.newforms.id, this.newforms.part, this.newforms.tips)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(res);
        });
      this.show = false;
    },

    // 下载



    
    downloadFile: function(item) {
      downloadFile(item.fileName).then(res => {
        //  console.log(res);
         //返回blob对象里的url
        const fileUrl=window.URL.createObjectURL(res.data);
        // console.log(fileUrl);
        // 创建一个标签
         const fileLink = document.createElement('a');
          fileLink.href = fileUrl;
        //定义下载的文件名称  可以改为接收到的参数
        fileLink.download =item.fileName;
        fileLink.click();
       this.newforms.id = item.id;
      // console.log(item.fileName);
    })
    },

    //传值到编辑里面
    fileUpdate:function(item) {
      var event = event || window.event;
      event.preventDefault();
      // this.newforms.perId=item.perId;
      // 一时半会儿没有很好的方法全部赋值 尝试过解构。。。。 到时候这些模板我给写成组件就好了。先这样吧。
      // 调试过程中注意名字是否相反。 因为我想不出有啥很好的变量名。怪我。
      this.newforms.part = item.partment;
      this.newforms.tips = item.tip;
      this.newforms.id = item.id;
    },
    // 调用方法 删除
    fileDelet: function(item) {
      var event = event || window.event;
      event.preventDefault();
      // console.log(item.id,item.fileName);
       DeletFile(item.id,item.fileName).then(res=>{

       })
    },
    // 接收兄弟组件内容 //查询过滤的信息
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
        return this.theFiles.length;
      }
    }
  },
  // 监控一个props动态
  watch: {
    theFiles(val) {
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
</style>