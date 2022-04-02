<template>
  <div id="chartPie1"  class="pie-wrap">
  </div>
</template>
<script>
// 这是柱状图 代码不同
   import * as echarts from 'echarts';
    require('echarts/theme/macarons');//引入主题
export default {
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
      this.chartPie = echarts.init(document.getElementById("chartPie1"),'macarons');
      // 绘制图表
      this.chartPie.setOption({
        tooltip: {},
        
        xAxis: {
          data: ["前端开发", "后端开发", "运维", "IT实习生"]
        },
        yAxis: {},
        series: [
          {
            // name: "销量",
            type: "bar",
             animationDuration: 900,
             animationEasing: 'cubicInOut',
            data: [5, 20, 36, 10, 10, 20],
          }
        ]
      });
    }
  }
};
</script>
<style lang='less' scope>
    .pie-wrap{
        width:100%;
        height:300px;

    }
</style>