<template>
  <div id="leakage"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    initCharts() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let leakage = echarts.init(
        document.getElementById("leakage"),
        "infographic"
      );
     var option = {
        title: {
          text: "三路漏电电流",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2011年", "2012年"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: "2012年",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      };
       leakage.setOption(option);
     
      window.onresize = function() {
        leakage.resize();
      };
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
