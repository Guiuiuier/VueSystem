<template>
  <div>
    <!-- <div :id="chartId" style="width:100%;height:400px"></div> -->
    <div id="chartPie" class="pie-wrap"></div>
    <slot></slot>
  </div>
</template>

<script>
// 这是饼状图 不知道为什么这个组件不同类型图之间不能复用，代码不同
    import * as echarts from 'echarts';
    require('echarts/theme/macarons');//引入主题

    export default {
        props:{
            thedata:{
            type:Array,
            default:()=>[]
            },
            thename:{
                type:String,
                default:"",
            }
        },
    data() {
      return {
           chartId:"",
        chartPie: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.drawPieChart();
      })
    },
    methods: {
      drawPieChart() {
        let mytextStyle = {
          color: "red",                          
          fontSize: 18,                            
        };
        let mylabel = {
          show: true,                 
        //   position: "right",          
        //   offset: [30, 40],             
          formatter: '{b} : {c} ({d}%)',    
          textStyle: mytextStyle
        };
        this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
        this.chartPie.setOption({
          title: {
            text: '今日部门考勤',
            x: 'left',
          },
    
          legend: {
            data: ['今日迟到', '今日早退'],
            left:"center",                              
            top:"bottom",                         
            orient:"horizontal",                        
          },
          series: [
            {
            //   name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '50%'],
              data: [
                {value: 8, name: '测试1'},
                {value: 1, name: '测试2'},
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 900,
              label: {           
                emphasis: mylabel
              }
            }
          ]
        });
      }
    }
  }
</script>

<style lang='less' scope>
.pie-wrap {
  width: 100%;
  height: 300px;
}
</style>