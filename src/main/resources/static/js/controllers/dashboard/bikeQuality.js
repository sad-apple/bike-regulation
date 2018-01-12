'use strict';

app.controller('bikeQualityCtrl', ['$rootScope', '$scope', '$http', 'toaster', '$timeout', '$state', '$interval', 'Fullscreen', '$filter', function ($rootScope, $scope, $http, toaster, $timeout, $state, $interval, Fullscreen, $filter) {

  var bikeTotal = 40000; // 单车投放量
  var bikeTotalWell = 35000; // 质量合格数量
  var bikeA = 9500;  // 各单车的投放量，合格数量
  var bikeAWell = 8750;
  var bikeB = 12000;
  var bikeBWell = 10250;
  var bikeC = 10000;
  var bikeCWell = 8250;
  var bikeD = 8500;
  var bikeDWell = 7750;
  var interval;

  // 数字显示样式
  function formatNumber(n) {
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) {
      return b;
    }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
  }

  // 柱状图数据加载
  function qualityBarCharts() {
    var data = [bikeA - bikeAWell, bikeB - bikeBWell, bikeC - bikeCWell, bikeD - bikeDWell];

    var myChart = echarts.init(document.getElementById("container2"));
    var option = {
      title: {
        text: '单车质量统计',
        subtext: '——————————',
        itemGap: 0,
        padding: [0, 0, 0, 30],
        textStyle: {
          color: '#DCDCDC'
        },
        subtextStyle: {
          color: '#008C9E',
          verticalAlign: 'top',
          fontSize: 22
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['车辆总数', '质量合格', '质量不合格'],
        padding: [0, 0, 0, 30],
        left: 'left',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        top: '10%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        borderColor: '#51585F',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['A单车', 'B单车', 'C单车', 'D单车'],
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: 15
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#51585F'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#51585F',
              borderColor: '#6a7985',
              type: 'solid' // 设置坐标轴线为实线
            }
          },
          axisLine: {
            show: false // 隐藏y轴
          },
          axisTick: {
            show: false // 隐藏y轴坐标出头
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff' // y坐标的文字颜色
            }
          }
        }
      ],
      series: [
        {
          name: '车辆总数',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#1BBC9C'
            }
          },

          barWidth: '8%',
          data: [bikeA, bikeB, bikeC, bikeD]
        },
        {
          name: '质量合格',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#3498DC'
            }
          },
          barWidth: '8%',
          data: [bikeAWell, bikeBWell, bikeCWell, bikeDWell]
        },
        {
          name: '质量不合格',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#9C59B7'
            }
          },
          barWidth: '8%',
          data: data
        }
      ],
      animationEasing: 'circularOut',
      animationDuration: 3000,
      animationDelay: 700
    };
    myChart.setOption(option);

    window.addEventListener("resize",function(){
      myChart.resize();
    });

  };

  // 饼状图数据
  function qualityPieCharts() {
    var myChart = echarts.init(document.getElementById("container3"));
    var option = {
      title: {
        text: '单车质量统计',
        subtext: '——————————',
        itemGap: 0,
        textStyle: {
          color: '#DCDCDC'
        },
        subtextStyle: {
          color: '#008C9E',
          verticalAlign: 'top',
          fontSize: 22
        },
        left: 'center'
      },
      legend: {
        orient: 'horizontal',
        textStyle: {
          color: '#DCDCDC'
        },
        x: 'center',
        top: '10%',
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        data: ['合格车辆', '不合格车辆']
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      series: [{
        type: "pie",
        radius: ['45%', '65%'],
        center: ['50%', '60%'],
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [{
          name: '合格车辆',
          value: bikeTotalWell,
          itemStyle: {
            normal: {
              color: 'rgb(12, 168, 243)'
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name + '：' + formatNumber(params.value) + '辆\n';
              },
              textStyle: {
                fontSize: 14
              }
            }
          }
        }, {
          name: '不合格车辆',
          value: bikeTotal - bikeTotalWell,
          tooltip: {
            show: true
          },
          itemStyle: {
            normal: {
              color: 'rgb(255, 255, 70)'
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name + '：' + formatNumber(params.value) + '辆\n';
              },
              textStyle: {
                fontSize: 14
              }
            }
          }
        }],
        animationType: 'expansion',
        animationDuration: 4000
      }]
    };
    myChart.setOption(option);

    window.addEventListener("resize",function(){
      myChart.resize();
    });

  };
  
  // 获取数据
  var getBikeQuality = function () {
    $http.get("json/bikeQuality.json").success(function (data) {
      $scope.bikeQualityDtos = data;
    })
  };

  function init() {
    getBikeQuality();
    qualityBarCharts();
    qualityPieCharts();
    tableScrollFun();
  }


    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        $interval.cancel(interval);
    });

  interval = $interval(function () {
    getBikeQuality();
  }, 3000, -1);

  init();

}]);
