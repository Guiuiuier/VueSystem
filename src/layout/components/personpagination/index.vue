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
            <b-col cols="4">姓名</b-col>
            <b-col cols="4">性别</b-col>
            <b-col cols="4">年龄</b-col>
          </b-row>

          <b-row class="mb-1">
            <b-col cols="4">
              <b-form-group>
                <b-form-input id="input-1" v-model="newforms.perName"></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select :options="variants" v-model="newforms.gender"></b-form-select>
              </b-form-group>
            </b-col>

            <b-col cols="4">
              <b-form-group>
                <b-form-select id="input-1" v-model="newforms.age" :options="variantsAge"></b-form-select>
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
// var index = "";
import MyLists from "@/components/list/index";
import searchPerTravel from "../sameLevelJS/search";
import {  personnelInfo,deletPer, updatePer } from "@/api2";
export default {
  inject: ["reload"],

  data() {
    return {
      thedata: [],
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
      isShow: true,
      perPage: 20,
      currentPage: 1,
      bordered: true,
      filter: "",
      fixed: true,
      items: [],
      show: false,
      boxOne: "",
      newforms: {
        id: "",
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
      variants: [{ text: "男", value: "男" }, "女", "其他"],
      variantsState: [{ text: "在职", value: "在职" }, "离职", "待入职"],
      variantsPart: [
        { text: "开发部", value: "开发部" },
        "管理部",
        "资源部",
        "营销部"
      ],

      //fields 插槽 自定义字段! 不过要和items的内容匹配才能多加
      tableSection: [
        { key: "idPer", label: "员工编号", sortable: true },
        { key: "namePer", label: "姓名" },
        { key: "genderPer", label: "性别", sortable: true },
        { key: "agePer", label: "年龄", sortable: true },
        { key: "partPer", label: "部门", sortable: true },
        { key: "addressPer", label: "地址" },
        { key: "statePer", label: "在职状态", sortable: true },
        { key: "contactPer", label: "联系方式" },
        { key: "actions", label: "操作", tdClass: "align-middle" }
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

    edit: function(item) {
      // console.log(item);
      var event = event || window.event;
      event.preventDefault();
      this.newforms.perName = item.namePer;
      this.newforms.gender = item.genderPer;
      this.newforms.age = item.agePer;
      this.newforms.part = item.partPer;
      this.newforms.contact = item.contactPer;
      this.newforms.perState = item.statePer;
      this.newforms.address = item.addressPer;
      this.newforms.perId = item.idPer;
      this.newforms.id = item.id;
    },
    sub: function() {
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
          .msgBoxConfirm("确认修改吗？")
          .then(value => {
            this.boxOne = value;

            // console.log(typeof this.boxOne);
            let flag = String(this.boxOne);
            if (flag === "true") {
              updatePer(
                this.newforms.id,
                this.newforms.perId,
                this.newforms.perName,
                this.newforms.gender,
                this.newforms.age,
                this.newforms.part,
                this.newforms.address,
                this.newforms.contact,
                this.newforms.perState
              )
                .then(res => {})
                .catch(err => {
                  console.log(err);
                });
              this.show = false;
              setTimeout(() => {
                this.reload();
              }, 1000);
            }
          })
          .catch(err => {});
      }
    },

    // 获取编辑内容
    perUpdate: function(item) {
      var event = event || window.event;
      event.preventDefault();
      this.newforms.perName = item.namePer;
      this.newforms.gender = item.genderPer;
      this.newforms.age = item.agePer;
      this.newforms.part = item.partPer;
      this.newforms.contact = item.contactPer;
      this.newforms.perState = item.statePer;
      this.newforms.address = item.addressPer;
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
            deletPer(Ids)
              .then(res => {})
              .catch(err => {});
            this.reload();
          }
        });
    }
  },
  mounted() {
    this.rows = this.items.length;
  },

  created() {
    personnelInfo().then(res => {
      this.thedata = res.data;
    });
  }
};
</script>

<style lang="less" >
td.align-middle {
  width: 120px;
}
</style>