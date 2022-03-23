<template>
  <div>
    <b-container fluid class="typography" v-if="isShow">
      <b-row class="topic">
        <b-col class="contentNumber">
          共有
          <font color="red">{{totalcont.length}}</font>条公告
        </b-col>
        <b-col class="btnNew">
          <b-button variant="success" @click="newA">新增公告</b-button>
        </b-col>
      </b-row>
      <!-- 为按钮添加一个id -->
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
      <b-col v-if="loading">
        <span>加载中...</span>
      </b-col>
      <b-col v-if="noMore">
        <span>无更多数据</span>
      </b-col>
    </b-container>
    <router-view></router-view>
  </div>
</template>
<script>
import { allAnnounce, announceDelet } from "@/api2";
export default {
  inject: ["reloads"],
  data() {
    return {
      loading: false,
      noMore: false,
      items:[],
      page: 1, //当前页数
      pageNum: 5, //每页3条
      totalcont: "",
      boxOne: "",
      isRouterAlive: true,
      items: [],
      isShow: true,
      replay: 0
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
              .then(res => {})
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
    },

    init: function() {
      //       allAnnounce().then(res => {
      //   let cont = res.data;
      //   this.items = cont;
      // });
      allAnnounce().then(res => {
        this.totalcont = res.data;
        // console.log(this.totalcont);
        if (res.data.length <= this.pageNum) {
          this.items = this.totalcontcont;
          // console.log(this.items);
          this.noMore = true;
        } else {
          this.items = res.data.slice(0, this.pageNum);
          this.loading = true;
                    // console.log(this.items);

        }
      });
    },

    // //滚动加载
    loadMore: function() {
      this.page++;
      let begin = this.pageNum * this.page - this.pageNum;
      let end = this.pageNum * this.page;
      if (end >= this.totalcont.length) {
        end = this.totalcont.length;
        this.noMore = true;
        this.loading = false;
      } else {
        let end = this.pageNum * this.page;
      }
      let data = [];
      data = [...this.items, ...this.totalcont.slice(begin, end)];
      this.items = data;
    },
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
    // allAnnounce().then(res => {
    //   let cont = res.data;
    //   this.items = cont;
    // });
    if (this.$route.name === "content") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  mounted() {
    //初始化数据
    this.init();
    // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
    // document.compatMode 判断当前浏览器的渲染方式用于兼容 CSS1Compat表示标准兼容模式开启
    // 浏览器标准模式与怪异模式-CSS1Compat and BackCompat 　BackCompat 对应quirks mode
    // 　  CSS1Compat 对应strict mode
    // 　  BackCompat：标准兼容模式关闭。
    // 　  CSS1Compat：标准兼容模式开启。

    window.addEventListener("scroll", () => {
      const scrollY =
        document.body.scrollTop || document.documentElement.scrollTop; // 滚动条在Y轴上的滚动距离
      const compatibility =
        document.compatMode === "CSS1Compat"
          ? document.documentElement.clientHeight
          : document.body.clientHeight; // clientHeight 属性是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条，是一个整数，单位是像素 px。
      const TotalHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ); // 页面总高度
      if (scrollY + compatibility >= TotalHeight) {
        // 当滚动条滑到页面底部
        this.loadMore();
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "/public/an_leave.less";
</style>