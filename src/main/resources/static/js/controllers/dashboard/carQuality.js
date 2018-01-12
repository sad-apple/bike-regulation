'use strict';

app.controller('carQualityCtrl', ['$rootScope', '$scope', '$http', 'toaster', '$timeout', '$state', '$interval', 'Fullscreen', '$filter', function ($rootScope, $scope, $http, toaster, $timeout, $state, $interval, Fullscreen, $filter) {

  var carTotal = 5000;
  var carTotalWell = 4500;
  var carA = 950;
  var carAWell = 900;
  var carB = 1200;
  var carBWell = 1050;
  var carC = 1000;
  var carCWell = 850;
  var carD = 850;
  var carDWell = 800;
  var carE = 1000;
  var carEWell = 900;

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

  $scope.qualityBarCharts = function () {
    var data = [carA - carAWell, carB - carBWell, carC - carCWell, carD - carDWell, carE - carEWell];
    var markLineData = [];

    for (var i = 1; i < data.length; i++) {
      markLineData.push([{
        xAxis: i - 1,
        yAxis: data[i - 1],
        value: (data[i] / data[i - 1] * 100).toFixed(2)
      }, {
        xAxis: i,
        yAxis: data[i]
      }]);
    }

    var em = document.getElementById("container2");
    var qualiCharts = echarts.init(em);
    var option = {
      title: {
        text: '汽车质量统计',
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
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
        bottom: '0%',
        top: '20%',
        borderColor: '#51585F',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['A汽车', 'B汽车', 'C汽车', 'D汽车', 'E汽车'],
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
              type: 'solid'  // 设置坐标轴线为实线
            }
          },
          axisLine: {
            show: false     // 隐藏y轴
          },
          axisTick: {
            show: false  // 隐藏y轴坐标出头
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'    // y坐标的文字颜色
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
          data: [carA, carB, carC, carD, carE]
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
          data: [carAWell, carBWell, carCWell, carDWell, carEWell]
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
    qualiCharts.setOption(option);
    window.addEventListener("resize", function () {
      qualiCharts.resize();
    });
  };

  $scope.qualityPieCharts = function () {
    var em = document.getElementById("container3");
    var qualiCharts = echarts.init(em);
    var option = {
      color: ['#3498DC', '#D7D300'],
      title: {
        text: '汽车质量统计',
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
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
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
      series: [
        {
          name: '车辆质量',
          type: 'pie',
          radius: ['45%', '65%'],
          center: ['50%', '60%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [
            {
              value: carTotalWell,
              name: '合格车辆',
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
            },
            {
              value: carTotal - carTotalWell,
              name: '不合格车辆',
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
            }
          ]
        }
      ]
    };
    qualiCharts.setOption(option);
    window.addEventListener("resize", function () {
      qualiCharts.resize();
    });
  };

  $scope.getBikeQuality = function () {
    $http.get("json/carQuality.json").success(function (data) {
      $scope.bikeQualityDtos = data;
    }).error(function (err) {
      alert("carQualityCtrl: " + err.error);
    })
  };

  function init() {
    $scope.qualityBarCharts();
    $scope.qualityPieCharts();
    $scope.getBikeQuality();
    tableScrollFun();
  }

  init();

}]);
