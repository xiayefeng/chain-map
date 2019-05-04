<template>
  <div class="about">
    <div id="china-map" class="map-wrap"></div>
    <div class="text-wrap">

    </div>
  </div>
</template>
<script>

// 主模块
let echarts = require('echarts/lib/echarts')
// 散点图
require('echarts/lib/chart/scatter')
// 散点图放大
require('echarts/lib/chart/effectScatter')
// 地图
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
// 中国地图
require('echarts/map/js/china')
export default {
  data () {
    return {
      timer: null
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    let chinaMap = echarts.init(document.getElementById('china-map'))
    chinaMap.setOption({
      backgroundColor: '#272D3A',
      // 标题
      /* title: {
        text: '中国地图闪闪发光',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      }, */
      // 地图上圆点的提示
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' : ' + params.value[2]
        }
      },
      // 图例按钮 点击可选择哪些不显示
      legend: {
        show: false
      },
      // 地理坐标系组件
      geo: {
        map: 'china',
        label: {
          // true会显示城市名
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          // 地图背景色
          normal: {
            areaColor: '#465471',
            borderColor: '#282F3C'
            /* color: 'rgba(37,124,169)',
            label: {
              show: true, // 是否显示标签
              textStyle: {
                color: 'rgb(249, 249, 249)'
              }
            }, */

            /*  borderWidth: 3,
            borderColor: 'rgba(37,124,169)',
            areaColor: 'rgba(37,124,169)',
            shadowColor: 'rgba(37,124,169)',
            shadowOffsetY: 15,
            shadowOffsetX: 8 */
            // shadowBlur: 3,

          },
          // 悬浮时
          emphasis: {
            areaColor: '#8796B4'
          }
        }
      },
      /* visualMap: { // 颜色的设置  dataRange
        show: false,
        x: 'left',
        y: 'center',
        seriesIndex: [0],

        min: 1000,
        max: 3000,
        // splitList: [

        // ],
        //            min: 0,
        //            max: 2500,
        //            calculable : true,//颜色呈条状
        text: ['高', '低'], // 文本，默认为数值文本
        color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
        textStyle: {
          color: '#fff'
        }

      }, */
      // 系列列表
      series: [
        {
          name: '地区热度',
          // 表的类型 这里是散点
          type: 'effectScatter',
          // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
          coordinateSystem: 'geo',
          data: [],
          // 标记的大小
          symbolSize: function (val) {
            return val[2] / 10
          },
          // 鼠标悬浮的时候在圆点上显示数值
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
              /* shadowColor: 'rgba(20,78,139,1)',
              shadowOffsetY: 15,
              shadowOffsetX: 15 */
              // color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
              /*  normal: { // 是图形在默认状态下的样式
                label: {
                  show: true, // 是否显示标签
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                  // shadowColor:'rgba(17,84,148,0.8)',
                },

                // borderWidth: 3,
                // borderColor: 'rgba(37,124,169)',
                // areaColor: 'rgba(20,78,139,1)'

                // //shadowBlur: 100,
              } */
            },
            // 鼠标悬浮的时候圆点样式变化
            emphasis: {
              /* label: {
                show: true
              }, */
              // borderColor: '#3baced',
              // areaColor: '#0b558e'
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }
        /* {
          name: 'top5',
          // 表的类型 这里是散点
          type: 'effectScatter',
          // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
          coordinateSystem: 'geo',
          data: [],
          // 标记的大小
          symbolSize: 12,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        } */
      ]
    })
    // chinaMap.showLoading(showLoadingDefault)
    // this.$store.commit('openLoading')
    this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
    this.timer = setInterval(() => {
      this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
    }, 2000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .about{
    @extend %rel;
  }
  .map-wrap{
    width: 600px;
    height:500px;
  }
  .text-wrap{
    @extend %abs;
    left: 20px;
    top: 20px;
    width: 150px;
    height:200px;
    background:rgba(255,255,255,.2);
  }
</style>
