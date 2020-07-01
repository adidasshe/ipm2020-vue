<template>
  <div id="capa" :style="{width: '100%', height: '400px'}" />
</template>

<script>
import echarts from 'echarts'
// import resize from "../mixins/resize";
export default {
  // mixins: [resize],
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      msg: '电容'
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
  },
  created() {
    // this.getdata();
    // this.drawLine();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(
        document.getElementById('capa'),
        'infographic'
      )
      this.setOptions(this.chartData)
      // console.log(this.chartData.switch1)

      // 根据窗口的大小变动图表 --- 重点
      window.onresize = function() {
        this.chart.resize()
        // myChart1.resize();    //若有多个图表变动，可多写
      }
    },
    setOptions({ voltage1, current1 } = {}) {
      // console.log(current1)
      // 绘制图表
      this.chart.setOption({
        legend: {
          data: ['开', '关']
        },
        tooltip: {},
        dataset: {
          source: [
            ['电容', '电容1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
            ['开', 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
            // ["关", 0, 1, 0, 1, 1, 0,1, 1, 0, 1, 1, 0,1, 0, 1, 1, 0,1]
          ]
        },
        series: [
          {
            type: 'pie',
            radius: 40,
            center: ['10%', '30%'],
            encode: {
              itemName: '电容',
              value: '电容1'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['15%', '30%'],
            encode: {
              itemName: '电容',
              value: '2'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['20%', '30%'],
            encode: {
              itemName: '电容',
              value: '3'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['25%', '30%'],
            encode: {
              itemName: '电容',
              value: '4'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['30%', '30%'],
            encode: {
              itemName: '电容',
              value: '5'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['35%', '30%'],
            encode: {
              itemName: '电容',
              value: '6'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['40%', '30%'],
            encode: {
              itemName: '电容',
              value: '7'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['45%', '30%'],
            encode: {
              itemName: '电容',
              value: '8'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['50%', '30%'],
            encode: {
              itemName: '电容',
              value: '9'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['10%', '60%'],
            encode: {
              itemName: '电容',
              value: '10'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['15%', '60%'],
            encode: {
              itemName: '电容',
              value: '11'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['20%', '60%'],
            encode: {
              itemName: '电容',
              value: '12'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['25%', '60%'],
            encode: {
              itemName: '电容',
              value: '13'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['30%', '60%'],
            encode: {
              itemName: '电容',
              value: '14'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['35%', '60%'],
            encode: {
              itemName: '电容',
              value: '15'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['40%', '60%'],
            encode: {
              itemName: '电容',
              value: '16'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['45%', '60%'],
            encode: {
              itemName: '电容',
              value: '17'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
            type: 'pie',
            radius: 40,
            center: ['50%', '60%'],
            encode: {
              itemName: '电容',
              value: '18'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
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
      })
    }
  }
}
</script>

<style scoped>
</style>
