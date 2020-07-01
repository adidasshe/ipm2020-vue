<template>
  <div id="capa" :style="{width: '100%', height: '400px'}"></div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize"
// import resize from "../mixins/resize";
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
        // console.log(this.chartData);
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
      this.chart = echarts.init(document.getElementById("capa"), "infographic");
      this.setOptions(this.chartData);
      // console.log(this.chartData.switch1)

      //根据窗口的大小变动图表 --- 重点
      window.onresize =function(){
        this.chart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      };
    },
    setOptions() {
      // console.log(current1)
      // 绘制图表
      this.chart.setOption({
        legend: {
          // data:['开','关']
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} : {b}"
        },

        series: [
           {
            name: "电容空",
            data: [{ value: 1, name:"开"}],
            type: "pie",
            radius: 0,
            center: ["150%", "100%"],
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
            name: "电容空",
            data: [{ value: 1, name: "关"}],
            type: "pie",
            radius: 0,
            center: ["150%", "120%"],
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
            name: "电容1",
            data: [{ value: 1, name: this.chartData['capacitanceSwitch1'] }],
            type: "pie",
            radius: 20,
            center: ["5%", "30%"],
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
            name: "电容2",
            data: [{ value: 1, name: this.chartData['capacitanceSwitch2'] }],
            type: "pie",
            radius: 20,
            center: ["15%", "30%"],
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
            name: "电容3",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch3 }],
            type: "pie",
            radius: 20,
            center: ["25%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容4",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch4 }],
            type: "pie",
            radius: 20,
            center: ["40%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容5",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch5 }],
            type: "pie",
            radius: 20,
            center: ["50%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容6",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch6 }],
            type: "pie",
            radius: 20,
            center: ["60%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容7",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch7 }],
            type: "pie",
            radius: 20,
            center: ["75%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容8",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch8 }],
            type: "pie",
            radius: 20,
            center: ["85%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容9",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch9 }],
            type: "pie",
            radius: 20,
            center: ["95%", "30%"],
            encode: {
              itemName: "电容",
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
            name: "电容10",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch10 }],
            type: "pie",
            radius: 20,
            center: ["5%", "60%"],
            encode: {
              itemName: "电容",
              value: "10"
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
            name: "电容11",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch11}],
            type: "pie",
            radius: 20,
            center: ["15%", "60%"],
            encode: {
              itemName: "电容",
              value: "11"
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
            name: "电容12",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch12 }],
            type: "pie",
            radius: 20,
            center: ["25%", "60%"],
            encode: {
              itemName: "电容",
              value: "12"
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
            name: "电容13",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch13 }],
            type: "pie",
            radius: 20,
            center: ["40%", "60%"],
            encode: {
              itemName: "电容",
              value: "13"
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
            name: "电容14",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch14 }],
            type: "pie",
            radius: 20,
            center: ["50%", "60%"],
            encode: {
              itemName: "电容",
              value: "14"
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
            name: "电容15",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch15 }],
            type: "pie",
            radius: 20,
            center: ["60%", "60%"],
            encode: {
              itemName: "电容",
              value: "15"
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
            name: "电容16",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch16 }],
            type: "pie",
            radius: 20,
            center: ["75%", "60%"],
            encode: {
              itemName: "电容",
              value: "16"
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
            name: "电容17",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch17 }],
            type: "pie",
            radius: 20,
            center: ["85%", "60%"],
            encode: {
              itemName: "电容",
              value: "17"
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
            name: "电容18",
            data: [{ value: 1, name: this.chartData.capacitanceSwitch18 }],
            type: "pie",
            radius: 20,
            center: ["95%", "60%"],
            encode: {
              itemName: "电容",
              value: "18"
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
         

        ]
      });
    }
  }
};
</script>

<style scoped>
</style>
