<template>
  <div id="map" :style="{width: '100%', height: '1280px'}" ref="map"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/extension/bmap/bmap");
import { getList } from "@/api/device_data";
import resize from "./components/mixins/resize";
export default {
  mixins: [resize],
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
  },
  methods: {
    getMap() {
      getList().then(Response => {
        var data  = Response.data;
        var off = [];
        var normal = [];
        var abnormal = [];
        //判断数据上传时间与当前时间差
        var time;
        for (let i = 0; i < data.length; i++) {
          //如果设备从未上传数据则视为设备未安装启用，不予标注
          if (data[i] != null && data[i].createTime != null) {
            time =
              (Date.parse(new Date()) - Date.parse(data[i].createTime)) / 1000;
            // 如果5分钟内没有上传数据则标注为离线图标
            if (time > this.refreshTime) {
              // console.log("离线");
              let res = [];
              res.push(data[i].longitude);
              res.push(data[i].latitude);
              res.push(2);
              off.push({
                name: data[i].deviceName,
                value: res,
                id: data[i].deviceId
              });
            } else {
              if (data[i].switch1 == 0 || data[i].switch2 == 0) {
                // console.log("异常");
                let res = [];
                res.push(data[i].longitude);
                res.push(data[i].latitude);
                res.push(2);
                abnormal.push({
                  name: data[i].deviceName,
                  value: res,
                  id: data[i].deviceId
                });
              } else {
                // console.log("正常");
                let res = [];
                res.push(data[i].longitude);
                res.push(data[i].latitude);
                res.push(2);
                normal.push({
                  name: data[i].deviceName,
                  value: res,
                  id: data[i].deviceId
                });
              }
            }
          }
          //重新设置标注
          this.chart.setOption({
            series: [
              {
                name: "正常",
                type: "scatter",
                data: normal
              },
              {
                name: "离线",
                type: "effectScatter",
                data: off
              },
              {
                name: "漏电跳闸",
                type: "effectScatter",
                data: abnormal
              }
            ]
          });
        }
      });
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.map);
      var option = {
        //option 开始
        title: {
          text: "配电变压器柜智能管控仪系统 - 设备地图",
          // subtext: "data from device",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {a}"
        },
        bmap: {
          center: [112.73876, 27.23258],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd"
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "正常",
            type: "scatter",
            coordinateSystem: "bmap",
            // data: [],
            data: null,
            symbolSize: 20,
            // symbol:'arrow',
            silent: false,
            label: {
              normal: {
                formatter: "{b}",
                position: "top",
                show: false
              },
              emphasis: {
                show: false
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
            coordinateSystem: "bmap",
            data: [],
            // data: [{ name: "桂林", value: [110.3, 25.31, 1] },{ name: "平乐", value: [111.3, 25.31, 1] }],
            symbolSize: 20,
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
            symbolSize: 20,
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
        //options结束
      };
      this.chart.setOption(option);
      var that = this;
      this.chart.on("click", function(params) {
        // console.log(params.data);
        that.$store.commit("user/SET_DEVICE_ID", params.data.id);
        that.$router.push({ name: "phase" });
      });
    }
  }
};
</script>

<style scoped>
</style>
