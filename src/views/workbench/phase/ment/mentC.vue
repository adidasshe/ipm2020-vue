<template>
  <div id="meterC" :style="{width: '100%', height: '400px'}"></div>
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
        document.getElementById("meterC"),
        "infographic"
      );
      this.setOptions(this.chartData);

      //根据窗口的大小变动图表 --- 重点
      window.onresize = function() {
        this.chart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      };
    },
    setOptions({ voltage3, current3 } = {}) {
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
            z: 3,
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
              borderRadius: 2,
              color: "#eee",
              padding: 3,
              textShadowBlur: 2,
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

            center: ["30%", "50%"],
            max: "500",
            detail: { formatter: "{value}V" },
            data: [
              {
                value: voltage3,
                name: "C相电压"
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
                value: current3,
                name: "C相电流"
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