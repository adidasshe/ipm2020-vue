<template>
  <div id="map" :style="{width: '100%', height: '1300px'}"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
import { getList } from "@/api/device_data";
const rjs = require.context("echarts/map/js/province");
rjs.keys().forEach(rjs);
export default {
  data() {
    return {
      msg: "地图",
      normal: [],
      abnormal: [],
      off: [],
      refreshTime: 300 //数据上传时间差，用以判断多久没上传数据表示设备离线
    };
  },
  mounted() {
    this.initChart();
    this.times = window.setInterval(() => {
      setTimeout(this.getMap, 0);
    }, 5 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.times);
  },
  created() {
    this.getMap();
    console.log(this.off);
    // this.getdata();
    // this.drawLine();
  },
  methods: {
    getMap() {
      getList().then(Response => {
        let data = Response.data;
        let off = [];
        let normal = [];
        let abnormal = [];
        for (let i = 0; i < data.length; i++) {
          //如果设备从未上传数据则视为设备未安装启用，不予标注
          if (data[i] != null && data[i].createTime != null) {
            let time =
              (Date.parse(new Date()) - Date.parse(data[i].createTime)) / 1000;
            // 如果5分钟内没有上传数据则标注为离线图标
            if (time > this.refreshTime) {
              console.log("离线");

              let res = [];
              res.push(data[i].longitude);
              res.push(data[i].latitude);
              res.push(2);
              off.push({
                name: data[i].deviceName,
                value: res,
                id: data[i].deviceId
              });
              //   this.off = off;
              this.chart.setOption({
                series: [
                  {
                    name: "离线",
                    type: "effectScatter",
                    data: off
                  }
                ]
              });
            } else {
              if (data[i].switch1 == 0 || data[i].switch2 == 0) {
                console.log("异常");
                let res = [];
                res.push(data[i].longitude);
                res.push(data[i].latitude);
                res.push(2);
                abnormal.push({
                  name: data[i].deviceName,
                  value: res,
                  id: data[i].deviceId
                });
                this.chart.setOption({
                  series: [
                    {
                      name: "异常",
                      type: "effectScatter",
                      data: abnormal
                    }
                  ]
                });
              } else {
                console.log("正常");
                let res = [];
                res.push(data[i].longitude);
                res.push(data[i].latitude);
                res.push(2);
                normal.push({
                  name: data[i].deviceName,
                  value: res,
                  id: data[i].deviceId
                });
                this.chart.setOption({
                  series: [
                    {
                      name: "正常",
                      type: "scatter",
                      data: normal
                    }
                  ]
                });
                //   this.chart.resize();
              }
            }
          }
        }
      });
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("map"), "infographic");
      var option = {
        backgroundColor: "#404a59",
        title: {
          text: "配电变压器智能管控系统 - 设备地图",
          subtext: "data from device",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "正常",
            type: "scatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: 20,
            silent: false,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(0,128,0)"
              }
            }
          },
          {
            name: "离线",
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 30,
            data: [],
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(0,0,255)",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          },
          {
            name: "漏电跳闸",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: [],
            // data: [{ name: "郴州", value: [113.3, 25.31, 1] },{ name: "衡阳", value: [114.3, 25.31, 1] }],
            symbolSize: 30,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(255,0,0)",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };

      this.chart.setOption(option);
      var that = this;
      this.chart.on("click", function(params) {
        console.log(params);
        option.geo.map = params.name;
        that.chart.setOption(option, true);
        that.$store.commit("user/SET_DEVICE_ID", params.data.id);
        that.$router.push({ name: "phase" });
      });
    }
  }
};
</script>

<style scoped>
</style>
