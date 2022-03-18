<template>
  <div>
    <b-container fluid class="con">
       <b-button @click="pre">返回</b-button>
      <b-row class="topic">
        <b-col class="topic">{{contents.topic}}</b-col>
      </b-row>
      <b-row>
        <b-col class="dearName">{{contents.toPerson}}:</b-col>
      </b-row>
      <b-row>
        <b-col
          class="content" v-html="contents.content"
        ></b-col>
      </b-row>
      <b-row>
        <b-col class="endName">{{contents.endName}}</b-col>
      </b-row>
      <b-row>
        <b-col class="endDate">{{contents.date}}</b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import {announceId} from '@/api2'
export default {
  data() {
    return {
        contents:[],
    };
  },
  methods: {
      pre:function(){
          this.$router.back();
      }
  },
  created() {
      announceId(this.$route.params.id).then(res=>{
          this.contents=res.data[0];
      })
  },
};
</script>
<style lang="less" scoped>
.con {
  div.dearName.col {
    padding: 50px 50px 0px 150px;
    text-align: left;
    font-size: 20px;
  }
  div.topic.col {
    text-align: center;
    padding: 50px;
    font-weight: bold;
    font-size: 30px;
  }
  div.content.col {
    // text-align: center;
    font-size: 20px;
    padding: 20px 150px;
  }
  div.endDate.col {
    text-align: right;
    font-size: 20px;
    padding: 10px 150px 50px 0;
  }
  div.endName.col {
    text-align: right;
    font-size: 20px;
    padding: 100px 150px 0px 0px;
  }
}
</style>