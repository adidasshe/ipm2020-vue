<template>
  <div class="bg">
    <!-- 标题 -->

    <div class="header">
      <div class="title">配电变压器智能管理-综合大屏</div>
      <div class="showTime">{{nowTime}}</div>
    </div>
    <!-- 页面主体 -->

    <div class="mainbox">
      <el-row>
        <!-- 布局1 -->
        <el-col :span="4">
          <div class="colunm">
            <div class="panel">
              <div class="title">安全运行</div>

              <div id="chart1" class="chart">
                <line-chart />
              </div>
              <div class="panel-footer"></div>
            </div>
            <div class="panel">
              <div class="title">日实时负荷（KW）</div>
              <div class="chart" id="load"></div>
              <div class="panel-footer"></div>
            </div>
            <div class="panel">
              <div class="title">负荷曲线</div>
              <div class="chart" id="chart2"></div>
              <div class="panel-footer"></div>
            </div>
          </div>
        </el-col>
        <!-- 布局2 -->
        <el-col :span="16">
          <div class="colunm">
            <!-- no模块制作 -->
            <div class="no">
              <!-- <div class="no-hd">
                <ul>
                  <li>115</li>
                  <li>100000 KVA</li>
                </ul>
              </div>-->
              <!-- <div class="no-bd">
                <ul>
                  <li>总变压器数</li>
                  <li>变压器总容量</li>
                </ul>
              </div>-->
              <!-- 地图模块 -->
              <div class="map">
                <div class="map1"></div>
                <div class="map2"></div>
                <div class="map3"></div>
                <div class="chart" id="chartMap"></div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 布局3 -->
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="colunm">
              <div class="panel">
                <div class="title">总变压器数</div>
                <div class="chart" id="total"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">变压器总容量</div>
                <div class="chart" id="totalKw"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">日报警数量</div>
                <div class="chart" id="chart3"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import mapChart from "./components/MapChart";
import lineChart from "./components/LineChart";
import "echarts/map/js/china.js";
import { option } from "runjs";

export default {
  data() {
    return {
      date: new Date(),
      nowTime: "",
      url: require("@/assets/imags/bg.jpg")
    };
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.initChartLoad();
    this.initChartAlarm();
    this.initChartTotal();
    this.initChartTotalKw();
    this.initChartMap();
    this.nowTimes();
  },
  methods: {
    //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    /**
     * 安全运行表
     */
    initChart1() {
      var myChart = echarts.init(document.getElementById("chart1"));
      var dataArr = [
        {
          value: 91,
          name: ""
        }
      ];
      var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#5CF9FE" // 0% 处的颜色
        },
        {
          offset: 0.17,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 0.9,
          color: "#468EFD" // 100% 处的颜色
        },
        {
          offset: 1,
          color: "#5CF9FE" // 100% 处的颜色
        }
      ]);
      var colorSet = [
        [0.91, color],
        [1, "#15337C"]
      ];
      var rich = {
        white: {
          fontSize: 15,
          color: "#fff",
          fontWeight: "500",
          padding: [-150, 0, 0, 0]
        },
        bule: {
          fontSize: 50,
          fontFamily: "DINBold",
          color: "#fff",
          fontWeight: "700",
          padding: [-120, 0, 0, 0]
        },
        radius: {
          width: 250,
          height: 80,
          // lineHeight:80,
          borderWidth: 1,
          borderColor: "#0092F2",
          fontSize: 50,
          color: "#fff",
          backgroundColor: "#1B215B",
          borderRadius: 20,
          textAlign: "center"
        },
        size: {
          height: 300,
          padding: [100, 0, 0, 0]
        }
      };
      myChart.setOption({
        // backgroundColor: "#0E1327",
        //透明背景
        backgroundColor: "rgba(128, 128, 128, 0)",
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            //内圆
            type: "pie",
            radius: "85%",
            center: ["50%", "50%"],
            z: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(17,24,43,0)"
                    },
                    {
                      offset: 0.5,
                      // color: '#1E2B57'
                      color: "rgba(28,42,91,.6)"
                    },
                    {
                      offset: 1,
                      color: "#141C33"
                      // color:'rgba(17,24,43,0)'
                    }
                  ],
                  false
                ),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            label: {
              show: false
            },
            tooltip: {
              show: false
            },
            data: [100]
          },
          {
            type: "gauge",
            name: "外层辅助",
            radius: "74%",
            startAngle: "225",
            endAngle: "-45",
            splitNumber: "100",
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 1
              }
            ],
            // data: [{value: 1, name: 90}],
            title: {
              show: true,
              offsetCenter: [0, 30],
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontWeight: "normal",
                fontFamily: "微软雅黑",
                fontSize: 20
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "#00FFFF"]],
                width: 2,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#051932",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            type: "gauge",
            radius: "70%",
            startAngle: "225",
            endAngle: "-45",
            pointer: {
              show: false
            },
            detail: {
              formatter: function(value) {
                var num = Math.round(value);
                return (
                  "{bule|" +
                  num +
                  "}{white|分}" +
                  "{size|" +
                  "}\n{radius|综合健康评分}"
                );
              },
              rich: rich,
              offsetCenter: ["0%", "0%"]
            },
            data: dataArr,
            title: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 25,
                // shadowBlur: 15,
                // shadowColor: '#B0C4DE',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: "#00377a",
                width: 2,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            name: "灰色内圈", //刻度背景
            type: "gauge",
            z: 2,
            radius: "60%",
            startAngle: "225",
            endAngle: "-45",
            //center: ["50%", "75%"], //整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#018DFF"]],
                width: 2,
                opacity: 1 //刻度背景宽度
              }
            },
            splitLine: {
              show: false
            },
            // data: [{
            //     show: false,
            //     value: '80'
            // }], //作用不清楚
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            detail: {
              show: 0
            }
          },
          {
            name: "白色圈刻度",
            type: "gauge",
            radius: "60%",
            startAngle: 225, //刻度起始
            endAngle: -45, //刻度结束
            z: 4,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 16, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "rgba(1,244,255, 0.9)"
              } //刻度节点线
            },
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: 12
            }, //刻度节点文字颜色
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0,
                name: ""
              }
            ]
          },
          {
            //内圆
            type: "pie",
            radius: "56%",
            center: ["50%", "50%"],
            z: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(
                  0.5,
                  0.5,
                  0.8,
                  [
                    {
                      offset: 0,
                      color: "#4978EC"
                    },
                    {
                      offset: 0.5,
                      color: "#1E2B57"
                    },
                    {
                      offset: 1,
                      color: "#141F3D"
                    }
                  ],
                  false
                ),
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            label: {
              show: false
            },
            tooltip: {
              show: false
            },
            data: [100]
          }
        ]
      });
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 负荷曲线表
     */
    initChart2() {
      var myChart = echarts.init(document.getElementById("chart2"));
      var option = {
        backgroundColor: "rgba(128, 128, 128, 0)",
        title: {
          text: "一周负荷曲线",
          left: "center",
          bottom: "5%",
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        },
        grid: {
          top: "20%",
          left: "10%",
          right: "10%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
          axisLabel: {
            margin: 30,
            color: "#ffffff63"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            length: 25,
            lineStyle: {
              color: "#ffffff1f"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ffffff1f"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            position: "right",
            axisLabel: {
              margin: 20,
              color: "#ffffff63"
            },

            axisTick: {
              show: true,
              length: 15,
              lineStyle: {
                color: "#ffffff1f"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#ffffff1f"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            smooth: true, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#fff" // 线条颜色
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff"
              }
            },
            itemStyle: {
              color: "red",
              borderColor: "#fff",
              borderWidth: 3
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#eb64fb"
                    },
                    {
                      offset: 1,
                      color: "#3fbbff0d"
                    }
                  ],
                  false
                )
              }
            },
            data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 日实时负荷
     */
    initChartLoad() {
      var myChart = echarts.init(document.getElementById("load"));
      var option = {
        backgroundColor: "rgba(128, 128, 128, 0)",
        series: [
          {
            name: "刻度",
            type: "gauge",
            radius: "90%",
            min: 0,
            max: 1000,
            splitNumber: 10, //刻度数量
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#fff",
              distance: 30
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 1
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: "#fff"
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: "gauge",
            radius: "80%",
            center: ["50%", "50%"],

            splitNumber: 0, //刻度数量
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                color: [
                  [
                    0.98,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#ae3df6"
                      },
                      {
                        offset: 1,
                        color: "#53bef9"
                      }
                    ])
                  ],
                  [1, "#222e7d"]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "-20%"], // x, y，单位px
              textStyle: {
                color: "#ddd",
                fontSize: 10
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, 0],
              color: "#ddd",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                name: "KW",
                value: 9800
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 报警数量
     */
    initChartAlarm() {
      var myChart = echarts.init(document.getElementById("chart3"));
      let dataPie = [
        {
          value: 410,
          name: "电流"
        },
        {
          value: 380,
          name: "功率因数"
        },
        {
          value: 501,
          name: "空开"
        }
      ];
      let colorPie = ["#173852", "#0b2036", "#002e49"];
      let colorWrap = ["#3087d6", "#afe1ff", "#4be1ff"];
      let baseDataPie = [],
        baseDataWrap = [];
      for (var i = 0; i < dataPie.length; i++) {
        baseDataPie.push({
          value: dataPie[i].value,
          name: dataPie[i].name,
          itemStyle: {
            normal: {
              borderWidth: 50,

              borderColor: colorPie[i]
            }
          }
        });
        baseDataWrap.push(
          {
            value: dataPie[i].value,
            name: dataPie[i].name,
            itemStyle: {
              normal: {
                color: colorWrap[i],
                borderWidth: 10,
                borderColor: colorWrap[i],
                shadowBlur: 50,
                shadowColor: "rgba(48, 135, 214, 0.3)"
              }
            }
          },
          {
            value: 10,
            name: "",
            itemStyle: {
              normal: {
                color: "transparent",
                borderWidth: 10,
                borderColor: "transparent"
              }
            }
          }
        );
      }

      var option = {
        backgroundColor: "#021228",
        title: {
          text: "报警总数",
          subtext: "10,225",
          textStyle: {
            color: "#00b5f3",
            fontSize: 12
          },
          subtextStyle: {
            align: "center",
            fontSize: 18,
            color: ["#85c7e3"],
            fontWeight: 800
          },
          x: "38%",
          y: "center"
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}：{b} <br/>占比：{d}%"
        },
        legend: {
          data: ["电流", "功率因数", "空开"],
          icon: "vertical",
          right: "1%",
          top: "center",
          orient: "vertical",
          itemGap: 20,
          itemWidth: 15,
          itemHeight: 8,

          formatter: function(name) {
            let target;
            for (let i = 0; i < dataPie.length; i++) {
              if (dataPie[i].name === name) {
                target = dataPie[i].value;
              }
            }
            let arr = [name, target];
            return arr.join("\n");
          },
          textStyle: {
            lineHeight: 20,
            color: "#9ed2f5"
          }
        },
        grid: {
          left: "1%", // 与容器左侧的距离
          right: "1%", // 与容器右侧的距离
          top: "1%", // 与容器顶部的距离
          bottom: "1%" // 与容器底部的距离
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["40%", "50%"],
            radius: ["80%", "81%"],
            tooltip: {
              show: false
            },
            label: {
              normal: {
                show: false
              }
            },
            data: baseDataWrap
          },
          {
            name: "报警",
            type: "pie",
            color: colorPie,
            selectedMode: "single",
            radius: ["55%", "58%"],
            center: ["40%", "50%"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false
              }
            },

            data: baseDataPie
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 变压器总数
     */
    initChartTotal() {
      var myChart = echarts.init(document.getElementById("total"));
      var data = [
        {
          name: "1",
          value: 10
        },
        {
          name: "2",
          value: 10
        },
        {
          name: "3",
          value: 10
        },
        {
          name: "4",
          value: 10
        },
        {
          name: "5",
          value: 10
        },
        {
          name: "6",
          value: 20
        },
        {
          name: "7",
          value: 30
        }
      ];

      var option = {
        color: [
          "#A0CE3A",
          "#31C5C0",
          "#1E9BD1",
          "#0F347B",
          "#585247",
          "#7F6AAD",
          "#009D85",
          "rgba(250,250,250,0.3)"
        ],
        backgroundColor: "rgba(128, 128, 128, 0)",
        title: {
          text: "总数",
          subtext: 7789,
          textStyle: {
            color: "#f2f2f2",
            fontSize: 10
            // align: 'center'
          },
          subtextStyle: {
            fontSize: 15,
            color: ["#ff9d19"]
          },
          x: "center",
          y: "center"
        },
        grid: {
          bottom: 150,
          left: 100,
          right: "10%"
        },
        legend: {
          orient: "vertical",
          top: "middle",
          right: "5%",
          textStyle: {
            color: "#f2f2f2",
            fontSize: 15
          },
          icon: "roundRect",
          data: data
        },
        series: [
          // 主要展示层的
          {
            radius: ["30%", "61%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: true,
                formatter: "{c}%",
                textStyle: {
                  fontSize: 30
                },
                position: "outside"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 55
              },
              emphasis: {
                show: true
              }
            },
            name: "民警训练总量",
            data: data
          },
          // 边框的设置
          {
            radius: ["30%", "34%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(250,250,250,0.3)"
                }
              }
            ]
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "50%"],
            radius: ["65%", "65%"],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: "#0b5263"
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 总容量
     */
    initChartTotalKw() {
      var myChart = echarts.init(document.getElementById("totalKw"));
      var data = 45000; //数值大小
      var max = 50000; //满刻度大小
      var option = {
        title: {
          text: "-KW-",
          top: "40%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 5
          }
        },
        backgroundColor: "#266eff",
        color: ["#fff", "rgba(255,255,255,.5)", "rgba(255,255,255,.2)"],
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["48%", "50%"],
            hoverAnimation: false,

            data: [
              {
                name: "",
                value: data,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0.05,
                        color: "#cf3"
                      },
                      {
                        offset: 0.1,
                        color: "#9f3"
                      },
                      {
                        offset: 0.2,
                        color: "#3f6"
                      },
                      {
                        offset: 0.3,
                        color: "#3fc"
                      },
                      {
                        offset: 0.4,
                        color: "#3ff"
                      },
                      {
                        offset: 0.5,
                        color: "#39f"
                      },
                      {
                        offset: 0.6,
                        color: "#33f"
                      },
                      {
                        offset: 0.7,
                        color: "#93f"
                      },
                      {
                        offset: 0.8,
                        color: "#f3f"
                      },
                      {
                        offset: 0.9,
                        color: "#f39"
                      },
                      {
                        offset: 1,
                        color: "#f36"
                      }
                    ])
                  }
                },
                label: {
                  show: true,
                  position: "center",
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                  formatter: function(o) {
                    return data;
                  }
                },
                labelLine: {
                  show: false,
                  emphasis: {
                    show: false
                  }
                }
              },
              {
                //画中间的图标
                name: "",
                value: 0,
                label: {
                  position: "inside",
                  backgroundColor: {
                    image:
                      "data:image/png;base64,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0p8zAAA6E2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE5LTA0LTMwVDEyOjI0OjUyKzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOS0wNC0zMFQxMjoyNDo1MiswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTktMDQtMzBUMTI6MjQ6NTIrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjAxNzk3ZjYxLWRhMGQtNmQ0My1iN2I1LWNiZWFiYzFhZjhkZTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDozMjBiNzQ0MC0xZWI3LWU2NGMtYWExMi01MmVjNzFjZmU0NDQ8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDozMjBiNzQ0MC0xZWI3LWU2NGMtYWExMi01MmVjNzFjZmU0NDQ8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MzIwYjc0NDAtMWViNy1lNjRjLWFhMTItNTJlYzcxY2ZlNDQ0PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE5LTA0LTMwVDEyOjI0OjUyKzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDowMTc5N2Y2MS1kYTBkLTZkNDMtYjdiNS1jYmVhYmMxYWY4ZGU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDQtMzBUMTI6MjQ6NTIrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NTQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PiP4UGsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAxRJREFUeNrcmk1PE1EUhh8mCIoiNdMmboQSqIFoUugaF641iv/FhQt3bkz8M8To2oWsKSwIidCk1piQ0BFRPhQJdTFnzGScfjD33OmUJ7mbpvfMfed+zLnnnKFWq4UlXCAvbQK4CpwDJ8Ah0JTm2Xj4kJKw4ZCIoF2EZqSd9VvYDHAngZBehH4BamkLKwIlWWI2+QF8Auq2hTnAIjBNutSBNdmj6sIKQAUYpz/8FHF7msLmgPtkg01gS0PYAjBLttgB1rvtmU6UMygKGVM5qbA5OfmySgmYv6iwQob2VCfuyVh7EubI6TcoVOJ0xAlb7OORnoTxuIlwYjyKaQaPorS2wkoMLqV2wmZS8P1sMiEa/l03AiaVH3QdWJI9OwXk5DriAbtAFVgFjhSfORncCALPYxhYVjJ+BXgMPBVxnTgC3gLvgFOl568AZ4Gw2/J2TSkALxLMfgN43auD24VVYDfYYxoXRRd4lXBJT0pfV2Ec+fDhkVdYfs8NB+aKjRFNYaZv6pGSszwrtlSEucCQgaEbwDPFk21ZbBptC0dhGS4BY4rCxhQOsryGsLKFj+2ChrCcoREbvmXRsH/OAUYVXBkb7pEJow4XCGm14U8WHUcH+GVo47uFcR0Y9v/t4MfrTPhqQVjd9GU7+HFyEzYsCFs37N/UELYKHCuKOhabxsI8wCTlcihXBS1WxKYJXuArmibf3svVw5SG2DKarbATbLocT4E3wL6BjW9i4zRLwpDr/suEM9eQvrsK42jaCg2MSGjgSRZCAwAPlW6w4WDOA3Fop4Bb8vs+8FmO9I/KwRwP+BCeMfBDV4sMNlUkShWOK9YUXJl+ckAoGR+NBG8PsLDtqBMc9dHqAyjqv3HHZVvWFBzjNAmS7nQTdh73xwwTWybRLqO5h5+dzzqbtIked8pBb2FQ8pMCNTqURXSrGqjilx5kjR0ZW1t6LWCZx09kZ2X5qRSwBFzKkqPw0q1gHvdL8p2yViQWpgjcBW5aFpRaWV+UGfzclqssyJM7WuqFmFEuXelsJ6LFztfk9xPxxK0WO/8dAPx/3zmf5r6TAAAAAElFTkSuQmCC"
                  },
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  padding: 30
                }
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: max - data,
                label: {
                  show: false
                },
                labelLine: {
                  show: false,
                  emphasis: {
                    show: false
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    /**
     * 中国地图
     */
    initChartMap() {
      var myChart = echarts.init(document.getElementById("chartMap"));
      //内容

      var namedata = [
        { name: "上海" },
        { name: "福建" },
        { name: "李" },
        { name: "邓" },
        { name: "熊" },
        { name: "田" },
        { name: "周" },
        { name: "赵" },
        { name: "钱" },
        { name: "孙" },
        { name: "吴" },
        { name: "郑" },
        { name: "王" },
        { name: "冯" },
        { name: "陈" },
        { name: "杨" },
        { name: "朱" },
        { name: "秦" },
        { name: "许" },
        { name: "徐" },
        { name: "何" },
        { name: "曹" },
        { name: "陶" },
        { name: "邹" },
        { name: "苏" },
        { name: "范" },
        { name: "彭" },
        { name: "鲁" },
        { name: "马" },
        { name: "方" },
        { name: "唐" },
        { name: "顾" }
      ];
      var option = null;
      var geoCoordMap = {
        上海村变压器: [119.1803, 31.2891],
        福建: [119.4543, 25.9222],
        重庆: [108.384366, 30.439702],
        北京: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        吉林: [125.8154, 44.2584],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        内蒙古: [110.3467, 41.4899],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        黑龙江: [127.9688, 45.368],
        台湾: [121.4648, 25.563]
      };
      var chinaDatas = [
        {
          name: "北京",
          value: 86
        },
        {
          name: "福建",
          value: 65
        },
        {
          name: "广东",
          value: 53
        },
        {
          name: "上海村变压器",
          value: 48
        },

        {
          name: "河北",
          value: 2
        },
        {
          name: "天津",
          value: 6
        },
        {
          name: "山西",
          value: 12
        },
        {
          name: "陕西",
          value: 2
        },
        {
          name: "甘肃",
          value: 4
        },
        {
          name: "宁夏",
          value: 5
        },
        {
          name: "青海",
          value: 3
        },
        {
          name: "新疆",
          value: 0.4
        },
        {
          name: "西藏",
          value: 0.3
        },
        {
          name: "四川",
          value: 22
        },
        {
          name: "重庆",
          value: 12
        },
        {
          name: "山东",
          value: 9
        },
        {
          name: "河南",
          value: 0.9
        },
        {
          name: "江苏",
          value: 24
        },
        {
          name: "安徽",
          value: 15
        },
        {
          name: "湖北",
          value: 6
        },
        {
          name: "浙江",
          value: 15
        },
        {
          name: "内蒙古",
          value: 0.3
        },
        {
          name: "江西",
          value: 34
        },
        {
          name: "湖南",
          value: 12
        },
        {
          name: "贵州",
          value: 0.8
        },
        {
          name: "广西",
          value: 16
        },
        {
          name: "海南",
          value: 37
        },
        {
          name: "辽宁",
          value: 0.2
        },
        {
          name: "吉林",
          value: 0.4
        },
        {
          name: "云南",
          value: 34
        },
        {
          name: "黑龙江",
          value: 5
        },
        {
          name: "台湾",
          value: 43
        }
      ];
      var convertData = function(data, type) {
        /*type:1 地图参数；type:2数据参数*/
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            if (type == 2) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
                username: data[i].username,
                telphone: data[i].telphone,
                address: data[i].address
              });
            } else {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
        }
        //console.log(res);
        return res;
      };
      var yData = [];
      var barData = chinaDatas;
      barData = barData.sort(function(a, b) {
        return b.value - a.value;
      });
      for (var j = 0; j < barData.length; j++) {
        if (j < 10) {
          yData.push("0" + j + barData[j].name);
        } else {
          yData.push(j + barData[j].name);
        }
      }

      option = {
        backgroundColor: "rgba(128, 128, 128, 0)",
        title: [
          {
            show: true,
            text: "全国变压器监测中心",
            subtext: "单位：台",
            subtextStyle: {
              color: "#ffffff",
              lineHeight: 20
            },
            textStyle: {
              color: "#fff",
              fontSize: 18
            },
            right: 140,
            top: 20
          }
        ],
        grid: {
          right: 10,
          top: 80,
          bottom: 20,
          width: "200"
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: "category",
          inverse: true,
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLabel: {
            interval: 0,
            margin: 85,
            textStyle: {
              color: "#fff",
              align: "left",
              fontSize: 14
            },
            rich: {
              a: {
                color: "#fff",
                backgroundColor: "#f0515e",
                width: 20,
                height: 20,
                align: "center",
                borderRadius: 2
              },
              b: {
                color: "#fff",
                backgroundColor: "#24a5cd",
                width: 20,
                height: 20,
                align: "center",
                borderRadius: 2
              }
            },
            formatter: function(params) {
              if (parseInt(params.slice(0, 2)) < 3) {
                return [
                  "{a|" +
                    (parseInt(params.slice(0, 2)) + 1) +
                    "}" +
                    "  " +
                    params.slice(2)
                ].join("\n");
              } else {
                return [
                  "{b|" +
                    (parseInt(params.slice(0, 2)) + 1) +
                    "}" +
                    "  " +
                    params.slice(2)
                ].join("\n");
              }
            }
          },
          data: yData
        },
        geo: {
          map: "china",
          label: {
            show: true,
            color: "#ffffff",
            emphasis: {
              color: "white",
              show: false
            }
          },
          roam: false, //是否允许缩放
          top: 100,
          left: "left",
          right: "300",
          zoom: 1, //默认显示级别
          scaleLimit: {
            min: 0,
            max: 3
          }, //缩放级别
          itemStyle: {
            normal: {
              borderColor: "rgba(26,82,231, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(14, 101, 247, .1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(125, 183, 252, .1)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: "rgba(255, 255, 255, 0)",
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: "rgba(249,157,51, .)",
              borderWidth: 0
            }
          },
          //是否显示南海诸岛
          /*regions: [{
			name: "南海诸岛",
			value: 0,
			itemStyle: {
				normal: {
					opacity: 0,
					label: {
						show: false
					}
				}
			}
		}],*/
          tooltip: {
            show: false
          }
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 1,
            data: [],
            symbolSize: 14,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return (
                    "{fline|变压器：" +
                    params.data.username +
                    "  " +
                    params.data.telphone +
                    "}\n{tline|" +
                    params.data.address +
                    "}"
                  );
                },
                position: "top",
                backgroundColor: "rgba(254,174,33,.8)",
                padding: [0, 0],
                borderRadius: 3,
                lineHeight: 32,
                color: "#f7fafb",
                rich: {
                  fline: {
                    padding: [0, 10, 10, 10],
                    color: "#ffffff"
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: "#ffffff"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              color: "#feae21"
            }
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 1,
            data: [],
            symbolSize: 14,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return (
                    "{fline|变压器：" +
                    params.data.username +
                    "  " +
                    params.data.telphone +
                    "}\n{tline|" +
                    params.data.address +
                    "}"
                  );
                },
                position: "top",
                backgroundColor: "rgba(233,63,66,.9)",
                padding: [0, 0],
                borderRadius: 3,
                lineHeight: 32,
                color: "#ffffff",
                rich: {
                  fline: {
                    padding: [0, 10, 10, 10],
                    color: "#ffffff"
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: "#ffffff"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              color: "#e93f42"
            }
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 1,
            data: [],
            symbolSize: 14,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return (
                    "{fline|变压器：" +
                    params.data.username +
                    "  " +
                    params.data.telphone +
                    "}\n{tline|" +
                    params.data.address +
                    "}"
                  );
                },
                position: "top",
                backgroundColor: "rgba(8,186,236,.9)",
                padding: [0, 0],
                borderRadius: 3,
                lineHeight: 32,
                color: "#ffffff",
                rich: {
                  fline: {
                    padding: [0, 10, 10, 10],
                    color: "#ffffff"
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: "#ffffff"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              color: "#08baec"
            }
          },
          //地图
          {
            type: "map",
            mapType: "china",
            geoIndex: 0,
            z: 0,
            data: convertData(chinaDatas, 1)
          },
          {
            name: "barSer",
            type: "bar",
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 16,
            barGap: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f0515e"
                        },
                        {
                          offset: 1,
                          color: "#ef8554"
                        }
                      ]
                    },
                    {
                      colorStops: [
                        {
                          offset: 0,
                          color: "#3c38e4"
                        },
                        {
                          offset: 1,
                          color: "#24a5cd"
                        }
                      ]
                    }
                  ];
                  if (params.dataIndex < 3) {
                    return colorList[0];
                  } else {
                    return colorList[1];
                  }
                },
                barBorderRadius: [0, 15, 15, 0]
              }
            },
            label: {
              normal: {
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2
              }
            },
            data: barData.sort((a, b) => {
              return b.value - a.value;
            })
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      function getTel() {
        var n = 2,
          telstr = "1";
        while (n < 12) {
          if (n < 3) {
            while (1) {
              var nums = Math.floor(Math.random() * 10);
              if (
                nums !== 0 &&
                nums !== 1 &&
                nums !== 2 &&
                nums !== 3 &&
                nums !== 4 &&
                nums !== 6
              ) {
                telstr += nums;
                break;
              }
            }
          } else if (n > 3 && n < 8) {
            telstr += "*";
          } else {
            telstr += Math.floor(Math.random() * 10);
          }
          n++;
        }
        return telstr;
      }
      function getName(type) {
        var name = "";
        var roundnum = Math.floor(Math.random() * 32);
        switch (type) {
          case 1:
            name = namedata[roundnum].name + "供电所";
            break;
          case 2:
            name = namedata[roundnum].name + "供电局";
            break;
          default:
            name = namedata[roundnum].name + "供电所";
            break;
        }
        return name;
      }
      function getAddress(num, type) {
        var addstr = "";
        switch (type) {
          case 1:
            addstr = "在-" + chinaDatas[num].name + "-出现故障";
            break;
          case 2:
            addstr = "在-" + chinaDatas[num].name + "-运行正常";
            break;
          default:
            addstr = "在-" + chinaDatas[num].name + "-发生报警";
            break;
        }
        return addstr;
      }

      var timer = setInterval(() => {
        //数据情况重绘，清除formatter移动效果，也可根据自身需求是否需要，删除这两行代码
        /*option.series[seriesjson[runidx].createType-1].data = [];
    myChart.setOption(option, true);*/
        var runidx = Math.floor(Math.random() * 3);
        var typeidx = Math.floor(Math.random() * 3);
        var dataidx = Math.floor(Math.random() * 32);
        var ranval = Math.floor(Math.random() * 10);
        chinaDatas[dataidx].value = chinaDatas[dataidx].value + ranval;
        var valarr = geoCoordMap[chinaDatas[dataidx].name];
        valarr.push(ranval);
        option.series[typeidx].data = [
          {
            name: "",
            username: getName(runidx),
            telphone: getTel(),
            address: getAddress(dataidx, typeidx),
            value: valarr
          }
        ];
        option.series[4].data = option.series[4].data.sort(function(a, b) {
          return b.value - a.value;
        });
        myChart.setOption(option, true);
      }, 3000);
      //设置chart
      window.addEventListener("resize", () => {
        if (myChart) {
          myChart.resize();
        }
      });
    }
  },
  components: {
    mapChart,
    lineChart
  },
  destroyed() {
    this.clear();
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/imags/bg.jpg);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  line-height: 1.15;
}
.header {
  position: relative;
  height: 0.364583rem;
  background-image: url(../../assets/imags/head_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 0.182292rem;
    color: #fff;
    text-align: center;
    line-height: 0.416667rem;
  }
  .showTime {
    top: 0;
    position: absolute;
    right: 0.15625rem;
    line-height: 0.390625rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.104167rem;
  }
}
.mainbox {
  min-width: 1024px;
  // max-height: 1920px;
  margin: 0 auto;

  padding: 0.052083rem 0.052083rem 0;
  .cl2 {
    margin: 0 0.052083rem 0.078125rem;
  }
  .panel {
    position: relative;
    height: 1.458333rem;
    padding: 0 0.078125rem 0.208333rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    margin-bottom: 0.078125rem;
    background-image: url(../../assets/imags/line.png) rgba(255, 255, 255, 0.03);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
    }
    .title {
      height: 0.25rem;
      color: #fff;
      line-height: 0.208333rem;
      text-align: center;
      font-size: 0.104167rem;
      font-weight: 400;
    }
    .chart {
      height: 1.041667rem;
      // background-color: pink;
    }
  }
  // no数字模块
  .no {
    background: rgba(101, 132, 226, 0.1);
    padding: 0.078125rem;
    .no-hd {
      position: relative;
      border: 1px solid rgba(25, 186, 139, 0.17);
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 30px;
        height: 10px;
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        content: "";
        width: 30px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
      }
      ul {
        display: flex;
        li {
          position: relative;
          flex: 1;
          line-height: 0.15625rem;
          font-size: 0.364583rem;
          color: #ffeb7b;
          text-align: center;
          font-family: "electronicFont";
          &::after {
            content: "";
            position: absolute;
            top: 25%;
            right: 0;
            height: 50%;
            width: 1px;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .no-bd {
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.104167rem;
          height: 0.052083rem;
          line-height: 0.052083rem;
          padding-top: 0.052083rem;
        }
      }
    }
  }
  .map {
    position: relative;
    // background-color: red;
    height: 4.427083rem;
    overflow: hidden;
    .map1 {
      width: 2.697917rem;
      height: 2.697917rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url(../../assets/imags/map.png);
      background-size: 100% 100%;
      opacity: 0.3;
    }
    .map2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2.604167rem;
      height: 2.604167rem;
      background-image: url(../../assets/imags/lbx.png);
      animation: rotate1 15s linear infinite;
      opacity: 0.5;
      background-size: 100% 100%;
    }
    .map3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2.604167rem;
      height: 2.604167rem;
      background-image: url(../../assets/imags/jt.png);
      animation: rotate2 10s linear infinite;
      opacity: 0.5;
      background-size: 100% 100%;
    }
    .chart {
      position: absolute;
      top: 0;
      left: 0;
      // background-color: pink;
      width: 100%;
      opacity: 0.9;
      height: 4.375rem;
    }
    @keyframes rotate1 {
      form {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    @keyframes rotate2 {
      form {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }
  }
}
</style>
