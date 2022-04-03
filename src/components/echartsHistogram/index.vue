<template>
  <!-- <div id="chartPie1"  class="pie-wrap"> -->
  <!-- </div> -->
        <div :id="theid"  class="pie-wrap">
            <slot></slot>
        </div>
        
</template>
<script>
// 两个图的组件写的都不是很好。。。。。有空改一改。凑活着用先
// 这是柱状图 代码不同
   import * as echarts from 'echarts';
    require('echarts/theme/macarons');//引入主题
export default {
     props:{
            thedata:{
            type:Array,
            default:()=>[]
            },
            theseries:{
                type:Array,
                default:()=>[]
            },
            theid:{
                type:String,
                default:"",
            }
     },
  data() {
    return {
        chartPie:null
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.drawLine();
      })
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chartPie = echarts.init(document.getElementById(this.theid),'macarons');
      // 绘制图表
      this.chartPie.setOption({
        tooltip: {},
        
        xAxis: {
          data:this.theseries,
        },
        yAxis: {},
        series: [
          {
            // name: "销量",
            type: "bar",
             animationDuration: 900,
             animationEasing: 'cubicInOut',
            data:this.thedata,
          }
        ]
      });
    }
  },created() {
    //   console.log(this.theseries,this.thedata,this.the)
  },
};
</script>
<style lang='less' scope>
    .pie-wrap{
        width:100%;
        height:300px;

    }
</style>