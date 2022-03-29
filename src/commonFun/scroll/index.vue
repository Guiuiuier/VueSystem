
/* 
 1.@param res 数据内容，
 2.pageNum 每页多少条
*/

<template>
  <div>
    <slot :content="items"></slot>
    <b-col v-if="loading">
      <span>加载中...</span>
    </b-col>
    <b-col v-if="noMore">
      <span>无更多数据</span>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "myScroll",
  props: {
    thedata: { type: Array, default: () => [] },
    perpage:{
        type:Number,
        default:3
    }
  
  },
 
  data() {
    return {
     page: 1, //当前页数
    //   pageNum: 5, //每页5条
      loading: false,
      noMore: false,
      totalcount:this.thedata,
       items:[],
    };
  },
  methods: {
    init: function() {
        this.totalcount=this.thedata;
        if (this.totalcount.length <= this.perpage) {
          this.items = this.totalcount;
          this.noMore = true;
        } else {
          this.items = this.totalcount.slice(0, this.perpage);
         this.loading = true;
        }
        this.$forceUpdate();
    },
    loadMore: function() {
      this.page++;
      let begin = this.perpage * this.page - this.perpage;
      let end = this.perpage * this.page;
      if (end >= this.totalcount.length) {
        end = this.totalcount.length;
        this.noMore = true;
        this.loading = false;
      } else {
        let end = this.perpage * this.page;
      }
      let data = [];
      data = [...this.items, ...this.totalcount.slice(begin, end)];
      this.items = data;
      this.$forceUpdate();
    }
    
  },
  mounted() {
    this.init();
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


  },
  created() {

  },
};
</script>

