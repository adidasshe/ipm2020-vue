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
          <div class="grid-content bg-purple">
            <div class="colunm">
              <div class="panel">
                <div class="title">安全运行</div>

                <div id="chart1" class="chart">
                  <!-- <map-chart /> -->
                </div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">日实时负荷（KW）</div>
                <div class="chart"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">负荷曲线</div>
                <div class="chart" id="chart2"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 布局2 -->
        <el-col :span="16">
          <div class="grid-content bg-purple-light cl2">
            <div class="colunm">
              <!-- no模块制作 -->
              <div class="no">
                <div class="no-hd">
                  <ul>
                    <li>115</li>
                    <li>100000 KVA</li>
                  </ul>
                </div>
                <div class="no-bd">
                  <ul>
                    <li>总变压器数</li>
                    <li>变压器总容量</li>
                  </ul>
                </div>
              </div>
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
                <div class="title">日电量</div>
                <div class="chart"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">总接入量</div>
                <div class="chart"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="panel">
                <div class="title">日报警数量</div>
                <div class="chart"></div>
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
     * 评分表
     */
    initChart1() {
      var myChart = echarts.init(document.getElementById("chart1"));
      var dataArr = [
        {
          value: 91,
          name: "综合健康评分"
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
        backgroundColor: "#0E1327",
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
     * 趋势表
     */
    initChart2() {
      var myChart = echarts.init(document.getElementById("chart2"));
      myChart.setOption({
        backgroundColor: "#fff",
        grid: {
          top: "15%",
          right: "10%",
          left: "10%",
          bottom: "12%"
        },
        xAxis: [
          {
            type: "category",
            color: "#59588D",
            data: ["2019Q1", "2019Q2", "2019Q3", "2019Q4"],
            axisLabel: {
              margin: 20,
              color: "#999",
              textStyle: {
                fontSize: 18
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(107,107,107,0.37)"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}%",
              color: "#999",
              textStyle: {
                fontSize: 18
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(107,107,107,0.37)"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "rgba(131,101,101,0.2)",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            data: [40, 80, 20, -16],
            barWidth: "50px",
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorArr =
                    params.value > 0
                      ? ["#FF9A22", "#FFD56E"]
                      : ["#FFD56E", "#FF9A22"];
                  return new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: colorArr[0] // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: colorArr[1] // 100% 处的颜色
                      }
                    ],
                    false
                  );
                },
                barBorderRadius: [30, 30, 0, 0]
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                position: "top"
              }
            }
          },
          {
            data: [48, 40, 10, -6],
            type: "line",
            smooth: true,
            name: "折线图",
            symbol: "none",
            lineStyle: {
              color: "#3275FB",
              width: 4,
              shadowColor: "rgba(0, 0, 0, 0.3)", //设置折线阴影
              shadowBlur: 15,
              shadowOffsetY: 20
            }
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
     * 中国地图
     */
    initChartMap() {
      var myChart = echarts.init(document.getElementById("chartMap"));
      //内容

      var namedata = [
        { name: "张" },
        { name: "刘" },
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
        上海: [119.1803, 31.2891],
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
          name: "上海",
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
        backgroundColor: "#00013a",
        title: [
          {
            show: true,
            text: "2019年度销售排行",
            subtext: "单位：万辆",
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
                    "{fline|客户：" +
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
                    "{fline|客户：" +
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
                    "{fline|客户：" +
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
            name = namedata[roundnum].name + "先生";
            break;
          case 2:
            name = namedata[roundnum].name + "女士";
            break;
          default:
            name = namedata[roundnum].name + "先生";
            break;
        }
        return name;
      }
      function getAddress(num, type) {
        var addstr = "";
        switch (type) {
          case 1:
            addstr = "在" + chinaDatas[num].name + "-保时捷4S店购买车辆";
            break;
          case 2:
            addstr = "在" + chinaDatas[num].name + "-奔驰4S店购买车辆";
            break;
          default:
            addstr = "在" + chinaDatas[num].name + "-法拉利4S店购买车辆";
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
  height: 0.520833rem;
  background-image: url(../../assets/imags/head_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 0.197917rem;
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
  max-height: 1920px;
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
          line-height: 0.416667rem;
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
          font-size: 0.09375rem;
          height: 0.208333rem;
          line-height: 0.208333rem;
          padding-top: 0.052083rem;
        }
      }
    }
  }
  .map {
    position: relative;
    background-color: red;
    height: 3.541667rem;
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
      opacity: 0.6;
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
      opacity: 0.6;
      background-size: 100% 100%;
    }
    .chart {
      position: absolute;
      top: 0;
      left: 0;
      // background-color: pink;
      width: 100%;
      opacity: 0.5;
      height: 400px;
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
