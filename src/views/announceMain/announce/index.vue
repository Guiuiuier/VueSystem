<template>
  <div>
    <b-container fluid class="typography" v-if="isShow">
      <myScroll v-if="flag" :thedata="thedata" :perpage="10">
        <template v-slot="{content}">
          <b-row class="topic">
            <b-col class="contentNumber">
              共有
              <font color="red">{{content.length}}</font>条公告
            </b-col>
            <b-col class="btnNew">
              <b-button variant="success" @click="newA">新增公告</b-button>
            </b-col>
          </b-row>
          <div class="con" v-for="(item, id) in content" :key="item.id">
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
              <b-button
                class="contentbtn"
                v-b-modal.modal-1
                variant="danger"
                @click="btnDelet(id)"
              >删除</b-button>
              <b-button class="contentbtn" variant="warning" @click="btnEdit(id)">编辑文章</b-button>
            </div>
          </div>
        </template>
      </myScroll>
    </b-container>
    <router-view></router-view>
  </div>
</template>
<script>
import myScroll from "@/commonFun/scroll/index.vue";
// Vue.prototype
import { allAnnounce, announceDelet } from "@/api2";
export default {
  inject: ["reloads"],
  data() {
    return {
      flag: false,
      page: 1, //当前页数
      pageNum: 5, //每页3条
      boxOne: "",
      thedata: [],
      isRouterAlive: true,
      isShow: true,
      replay: 0
    };
  },
  components: {
    myScroll
  },
  methods: {
    detalis: function(id) {
      // console.log(this.thedata[id]);
      let contentId = this.thedata[id].id;
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
            announceDelet(this.thedata[id].id)
              .then(res => {})
              .catch({});
            setTimeout(() => {
              this.reloads();
            }, 500);
          }
        })
        .catch(err => {});
    },

    btnEdit: function(id) {
      // console.log(this.items[id].id);
      let editannounceId = this.thedata[id].id;
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
      this.thedata = res.data;
      this.flag = true;
    });

    if (this.$route.name === "content") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  mounted() {
    // allAnnounce().then(res => {
    //   this.thedata=res.data;
    //   // console.log(this.thedata)
    // });
    //初始化数据
    //   allAnnounce().then(res => {
    //   let cont = res.data;
    //    jia(cont);
    // });
    //  console.log(items);
    //   jia(this.totalcont);
    // document.documentElement.scrollTop表示当前页面滚动条的位置,documentElement对应的是html标签,body对应的是body标签
    // document.compatMode 判断当前浏览器的渲染方式用于兼容 CSS1Compat表示标准兼容模式开启
    // 浏览器标准模式与怪异模式-CSS1Compat and BackCompat 　BackCompat 对应quirks mode
    // 　  CSS1Compat 对应strict mode
    // 　  BackCompat：标准兼容模式关闭。
    // 　  CSS1Compat：标准兼容模式开启。
    // this.init();
    // window.addEventListener("scroll", () => {
    //   const scrollY =
    //     document.body.scrollTop || document.documentElement.scrollTop; // 滚动条在Y轴上的滚动距离
    //   const compatibility =
    //     document.compatMode === "CSS1Compat"
    //       ? document.documentElement.clientHeight
    //       : document.body.clientHeight; // clientHeight 属性是一个只读属性，它返回该元素的像素高度，高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条，是一个整数，单位是像素 px。
    //   const TotalHeight = Math.max(
    //     document.body.scrollHeight,
    //     document.documentElement.scrollHeight
    //   ); // 页面总高度
    //   if (scrollY + compatibility >= TotalHeight) {
    //     // 当滚动条滑到页面底部
    //     this.loadMore();
    //   }
    // });
    //           <b-row class="topic">
    //         <b-col class="contentNumber">
    //           共有
    //           <font color="red">{{totalcont.length}}</font>条公告
    //         </b-col>
    //         <b-col class="btnNew">
    //           <b-button variant="success" @click="newA">新增公告</b-button>
    //         </b-col>
    //       </b-row>
    //       <div class="con" v-for="(item, id) in items" :key="item.id">
    //         <b-row class="con-model">
    //           <b-col cols="6">
    //             <a href="javascript:0" @click="detalis(id)">{{item.topic}}</a>
    //           </b-col>
    //           <b-col class="top-name" cols="3">
    //             <b-icon icon="person
    // " class="icon-position"></b-icon>
    //             {{item.user}}
    //           </b-col>
    //           <b-col class="top-date" cols="3">
    //             <b-icon icon="clock
    // " class="icon-position"></b-icon>
    //             {{item.date}}
    //           </b-col>
    //         </b-row>
    //         <div class="con-bot" id="contentHeight" ref="contentHeight">{{item.content}}</div>
    //         <div class="content-button">
    //           <b-button class="contentbtn" v-b-modal.modal-1 variant="danger" @click="btnDelet(id)">删除</b-button>
    //           <b-button class="contentbtn" variant="warning" @click="btnEdit(id)">编辑文章</b-button>
    //         </div>
    //       </div>
    //       <b-col v-if="loading">
    //         <span>加载中...</span>
    //       </b-col>
    //       <b-col v-if="noMore">
    //         <span>无更多数据</span>
    //       </b-col>
  }
};
</script>

<style lang="less" scoped>
@import "/public/an_leave.less";
</style>