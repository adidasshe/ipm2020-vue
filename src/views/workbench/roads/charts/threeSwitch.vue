<template>
  <div id="threes" :style="{width: '100%', height: '400px'}"></div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize"
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
      msg: "电容"
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
        // console.log(this.chartData)
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
        document.getElementById("threes"),
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
        legend: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} : {b}"
        },

        series: [
          {
            name: "开关0",
            data: [{ value: 1, name: "开" }],
            type: "pie",
            radius: 0,
            center: ["200%", "105%"],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关0",
            data: [{ value: 1, name: "关" }],
            type: "pie",
            radius: 0,
            center: ["200%", "215%"],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（1路A相）",
            data: [{ value: 1, name: this.chartData["psa1"] }],
            type: "pie",
            radius: 20,
            center: ["5%", "25%"],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（2路A相）",
            data: [{ value: 1, name: this.chartData["psa2"] }],
            type: "pie",
            radius: 20,
            center: ["15%", "25%"],
            encode: {
              itemName: "A相",
              value: "2"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（3路A相）",
            data: [{ value: 1, name: this.chartData["psa3"] }],
            type: "pie",
            radius: 20,
            center: ["25%", "25%"],
            encode: {
              itemName: "A相",
              value: "3"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（1路A相）",
            data: [{ value: 1, name: this.chartData["psa4"] }],
            type: "pie",
            radius: 20,
            center: ["40%", "25%"],
            encode: {
              itemName: "A相",
              value: "4"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（2路A相）",
            data: [{ value: 1, name: this.chartData["psa5"] }],
            type: "pie",
            radius: 20,
            center: ["50%", "25%"],
            encode: {
              itemName: "A相",
              value: "5"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（3路A相）",
            data: [{ value: 1, name: this.chartData["psa6"] }],
            type: "pie",
            radius: 20,
            center: ["60%", "25%"],
            encode: {
              itemName: "A相",
              value: "6"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（1路A相）",
            data: [{ value: 1, name: this.chartData["psa7"] }],
            type: "pie",
            radius: 20,
            center: ["75%", "25%"],
            encode: {
              itemName: "A相",
              value: "7"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（2路A相）",
            data: [{ value: 1, name: this.chartData["psa8"] }],
            type: "pie",
            radius: 20,
            center: ["85%", "25%"],
            encode: {
              itemName: "A相",
              value: "8"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（3路A相）",
            data: [{ value: 1, name: this.chartData["psa9"] }],
            type: "pie",
            radius: 20,
            center: ["95%", "25%"],
            encode: {
              itemName: "A相",
              value: "9"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（1路B相）",
            data: [{ value: 1, name: this.chartData["psb1"] }],
            type: "pie",
            radius: 20,
            center: ["5%", "45%"],
            encode: {
              itemName: "A相",
              value: "1"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（2路B相）",
            data: [{ value: 1, name: this.chartData["psb2"] }],
            type: "pie",
            radius: 20,
            center: ["15%", "45%"],
            encode: {
              itemName: "A相",
              value: "2"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（3路B相）",
            data: [{ value: 1, name: this.chartData["psb3"] }],
            type: "pie",
            radius: 20,
            center: ["25%", "45%"],
            encode: {
              itemName: "A相",
              value: "3"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（1路B相）",
            data: [{ value: 1, name: this.chartData["psb4"] }],
            type: "pie",
            radius: 20,
            center: ["40%", "45%"],
            encode: {
              itemName: "A相",
              value: "4"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（2路B相）",
            data: [{ value: 1, name: this.chartData["psb5"] }],
            type: "pie",
            radius: 20,
            center: ["50%", "45%"],
            encode: {
              itemName: "A相",
              value: "5"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（3路B相）",
            data: [{ value: 1, name: this.chartData["psb6"] }],
            type: "pie",
            radius: 20,
            center: ["60%", "45%"],
            encode: {
              itemName: "A相",
              value: "6"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（1路B相）",
            data: [{ value: 1, name: this.chartData["psb7"] }],
            type: "pie",
            radius: 20,
            center: ["75%", "45%"],
            encode: {
              itemName: "A相",
              value: "7"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（2路B相）",
            data: [{ value: 1, name: this.chartData["psb8"] }],
            type: "pie",
            radius: 20,
            center: ["85%", "45%"],
            encode: {
              itemName: "A相",
              value: "8"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（3路B相）",
            data: [{ value: 1, name: this.chartData["psb9"] }],
            type: "pie",
            radius: 20,
            center: ["95%", "45%"],
            encode: {
              itemName: "A相",
              value: "9"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（1路C相）",
            data: [{ value: 1, name: this.chartData["psc1"] }],
            type: "pie",
            radius: 20,
            center: ["5%", "65%"],
            encode: {
              itemName: "A相",
              value: "1"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（2路C相）",
            data: [{ value: 1, name: this.chartData["psc2"] }],
            type: "pie",
            radius: 20,
            center: ["15%", "65%"],
            encode: {
              itemName: "A相",
              value: "2"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关一（3路C相）",
            data: [{ value: 1, name: this.chartData["psc3"] }],
            type: "pie",
            radius: 20,
            center: ["25%", "65%"],
            encode: {
              itemName: "A相",
              value: "3"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（1路C相）",
            data: [{ value: 1, name: this.chartData["psc4"] }],
            type: "pie",
            radius: 20,
            center: ["40%", "65%"],
            encode: {
              itemName: "A相",
              value: "4"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（2路C相）",
            data: [{ value: 1, name: this.chartData["psc5"] }],
            type: "pie",
            radius: 20,
            center: ["50%", "65%"],
            encode: {
              itemName: "A相",
              value: "5"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关二（3路C相）",
            data: [{ value: 1, name: this.chartData["psc6"] }],
            type: "pie",
            radius: 20,
            center: ["60%", "65%"],
            encode: {
              itemName: "A相",
              value: "6"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（1路C相）",
            data: [{ value: 1, name: this.chartData["psc7"] }],
            type: "pie",
            radius: 20,
            center: ["75%", "65%"],
            encode: {
              itemName: "A相",
              value: "7"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（2路C相）",
            data: [{ value: 1, name: this.chartData["psc8"] }],
            type: "pie",
            radius: 20,
            center: ["85%", "65%"],
            encode: {
              itemName: "A相",
              value: "8"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          },
          {
            name: "开关三（3路C相）",
            data: [{ value: 1, name: this.chartData["psc9"] }],
            type: "pie",
            radius: 20,
            center: ["95%", "65%"],
            encode: {
              itemName: "A相",
              value: "9"
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>
