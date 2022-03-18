<template>
  <div>
    <b-container fluid class="typography" v-if="isShow">
      <b-row class="topic">
        <b-col class="contentNumber">
          共有
          <font color="red">{{items.length}}</font>条公告
        </b-col>
        <b-col class="btnNew">
          <b-button variant="success" @click="newA">新增公告</b-button>
        </b-col>
      </b-row>
      <div class="con" v-for="(item, id) in items" :key="item.id">
        <b-row class="con-model">
          <b-col cols="6">
            <a href="javascript:0" @click="detalis(id)">{{item.topic}}</a>
          </b-col>
          <b-col class="top-name" cols="3">
            <b-icon icon="person 
" class="icon-position"></b-icon>
            {{item.user}}
          </b-col>
          <b-col class="top-date" cols="3">
            <b-icon icon="clock
" class="icon-position"></b-icon>
            {{item.date}}
          </b-col>
        </b-row>
        <div class="con-bot" id="contentHeight" ref="contentHeight">{{item.content}}</div>
        <div class="content-button">
          <b-button class="contentbtn" v-b-modal.modal-1 variant="danger" @click="btnDelet(id)">删除</b-button>
          <b-button class="contentbtn" variant="warning" @click="btnEdit(id)">编辑文章</b-button>
        </div>
      </div>
    </b-container>
    <router-view ></router-view>
  </div>
</template>
<script>

import { allAnnounce, announceDelet } from "@/api2";
export default {
  inject:['reloads'],
  data() {
    return {
      boxOne: "",
      isRouterAlive: true,
      items: [],
      isShow: true,
      replay:0,
    };
  },
  methods: {

    detalis: function(id) {
      // console.log(this.items[id]);
      let contentId = this.items[id].id;
      // console.log(contentId);
      this.$router.push(`/index/announcemain/content/${contentId}`);
    },
    newA: function() {
      this.$router.push("/index/announcemain/newannounce");
    },

    btnDelet: function(id) {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认删除吗？无法恢复的操作！")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          // console.log(typeof this.boxOne);
          let flag = String(this.boxOne);
          if (flag === "true") {
            announceDelet(this.items[id].id)
              .then(res => {
              })
              .catch({});
               this.reloads();
          }
           
           
        })
        .catch(err => {});
    },

    btnEdit: function(id) {
      // console.log(this.items[id].id);
      let editannounceId = this.items[id].id;
      this.$router.push(`/index/announcemain/editannounce/${editannounceId}`);
    }
  },
  watch: {
    //判断当前路由
    $route(to, from) {
      // console.log(to);
      if (
        to.name === "content" ||
        to.name === "newannounce" ||
        to.name === "editannounce"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;

      }
    }
  },
  created() {
    allAnnounce().then(res => {
      let cont = res.data;
      this.items = cont;
    });
    if (this.$route.name === "content") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.typography {
  border: 1px solid rgb(229, 229, 229);

  .topic {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgb(229, 229, 229);
    margin: 0 0 0 1px;
  }
  .btnNew {
    text-align: right;
    padding-right: 0;
    margin: 0 5px;
  }
  .contentNumber {
    font-size: 16px;
    font-weight: bold;
    padding: 0;
  }
  .con {
    border-bottom: 1px solid rgb(229, 229, 229);

    .con-model {
      padding-top: 20px;
      .top-name {
        .icon-position {
          margin-right: 5px;
        }
        text-align: right;
        font-size: 13px;
        //   line-height: 20px;
        padding: 0 20px;
      }
      .top-date {
        .icon-position {
          margin-right: 5px;
        }
        text-align: right;
        font-size: 13px;
        padding: 0 20px;
      }
    }
    .con-bot {
      padding-top: 25px;
      font-size: 13px;
      padding-bottom: 30px;
      height: 6.5em;
      overflow: hidden; /*自动隐藏文字*/
      text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
      /*不允许出现半汉字截断*/
    }
    .content-button {
      text-align: right;
      padding-bottom: 10px;
      .contentbtn {
        margin: 0 5px;
      }
    }
  }
}
</style>