<template>
  <div>
    <b-container fluid class="typography" v-if="isShow">
      <b-row class="topic">
        <b-col class="contentNumber">
          共有<font color="red">{{items.length}}</font>条公告
        </b-col>
      </b-row>
      <div class="con" v-for="(item, id) in items" :key="item.id">
        <b-row class="con-model">
          <b-col cols="6">
            <a href="javascript:0" @click="detalis(id)">{{item.topic}}</a>
          </b-col>
          <b-col class="top-name" cols="3">
            <b-icon icon="person 
" class="icon-position"></b-icon>{{item.user}}
          </b-col>
          <b-col class="top-date" cols="3">
            <b-icon icon="clock
" class="icon-position"></b-icon>{{item.date}}
          </b-col>
        </b-row>
        <div
        
          class="con-bot" id="contentHeight" ref="contentHeight"
        >{{item.content}}</div>
      </div>
    </b-container>
    <router-view></router-view>
  </div>
</template>
<script>
import { allAnnounce } from "@/api2";
export default {
  data() {
    return {
      items: [],
    isShow:true,
    };
  },
  methods: {
      detalis:function(id){
        //   console.log(id);
          this.$router.push("/index/announcemain/content")
        //   console.log(this.$route.matched);
          //判定当前路由
          let localRoute=this.$route.name;
        //  if(localRoute='content'){
        //      this.isShow=false;
        //  }else{
        //      this.isShow=true;
        //  }
        //   console.log(localRoute);
      },

  },
watch:{
    $route:{
      handler(val,oldval){
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    allAnnounce().then(res => {
      let cont = res.data;
      this.items = cont;
    //   console.log(this.items);
    });
  },
  mounted() {
    //   this.isShow=ture;
  },
  watch:{
 
  }
};
</script>
<style lang="less" scoped>
.typography {
  border: 1px solid rgb(229, 229, 229);

  .topic {
    height: 50px;
    line-height: 50px;
    //   border-bottom: 1px solid rgb(229, 229, 229);
  }
  .contentNumber {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid rgb(229, 229, 229);
    margin: 0 20px;
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
        height:6.5em;
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
        white-space:nowrap;/*强制不换行*/
        /*不允许出现半汉字截断*/
    }
  }
}
</style>