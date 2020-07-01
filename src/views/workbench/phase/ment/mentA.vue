<template>
  <div id="meterA" :style="{width: '100%', height: '400px'}"></div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
export default {
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      msg: "仪表盘"
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  created() {
    // this.getdata();
    // this.drawLine();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(
        document.getElementById("meterA"),
        "infographic"
      );
      this.setOptions(this.chartData);
      // console.log(this.chartData.switch1)

      //根据窗口的大小变动图表 --- 重点
      window.onresize = function() {
        this.chart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      };
    },
    setOptions({ voltage1, current1 } = {}) {
      // console.log(current1)
      // 绘制图表
      this.chart.setOption({
        // backgroundColor: '#1b1b1b',
        tooltip: {
          formatter: "{c}{a}"
        },
        toolbox: {
          feature: {
            // restore: {},
            // saveAsImage: {}
          }
        },
        series: [
          {
            name: "V",
            type: "gauge",
            z: 1,
            radius: "75%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            axisLabel: {
              backgroundColor: "auto",
              borderRadius: 1,
              color: "#eee",
              padding: 1,
              textShadowBlur: 1,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: "#222"
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 15,
              fontStyle: "italic"
            },
            // radius: 110,
            center: ["30%", "50%"],
            max: "500",
            detail: { formatter: "{value}V" },
            data: [
              {
                value: voltage1,
                name: "A相电压"
              }
            ]
          },
          {
            name: "A",
            type: "gauge",
            radius: "60%",
            center: ["80%", "50%"],
            startAngle: 135,
            endAngle: -135,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 3
              }
            },
            max: "300",
            detail: { formatter: "{value}A" },
            data: [
              {
                value: current1,
                name: "A相电流"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>