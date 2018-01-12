'use strict';

app.controller('bikeQuantityCtrl', ['$rootScope', '$scope', '$http', 'toaster', '$timeout', '$state', '$interval', 'Fullscreen', '$filter', function ($rootScope, $scope, $http, toaster, $timeout, $state, $interval, Fullscreen, $filter) {

  // 隐藏左侧列表函数

  var bikeA = 9500; // 实际投放数量 4万
  var bikeB = 12000;
  var bikeC = 10000;
  var bikeD = 8500;
  var bikeAWell = 2500; // 数量差
  var bikeBWell = 3000;
  var bikeCWell = 2500;
  var bikeDWell = 2000;

  var shuShan = 6800; // 17%
  var baoHe = 6000; // 15%
  var luYang = 3600; // 9%
  var yaoHai = 4400; // 11%
  var zhengWu = 4800; // 12%
  var jingKai = 4000; // 10%
  var gaoXin = 3600; // 9%
  var binHu = 3600;  // 9%
  var xinZhan = 3200; // 8%

    var interval;


  // 加载柱状图数据
  function quantityBarCharts() {
    var data = [bikeAWell, bikeBWell, bikeCWell, bikeDWell];
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

    var myChart = echarts.init(document.getElementById("container2"));
    var option = {
      title: {
        text: '单车数量统计',
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
        data: ['应投数量', '实投数量', '数量差'],
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
          name: '应投数量',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#1BBC9C'
            }
          },
          barWidth: '8%',
          data: [bikeA + bikeAWell, bikeB + bikeBWell, bikeC + bikeCWell, bikeD + bikeDWell]
        },
        {
          name: '实投数量',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#3498DC'
            }
          },
          barWidth: '8%',
          data: [bikeA, bikeB, bikeC, bikeD]
        },
        {
          name: '数量差',
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
      animationDuration: 2500,
      animationDelay: 700
    };
    myChart.setOption(option);
    window.addEventListener("resize",function(){
      myChart.resize();
    });
  };

  // 加载饼状图数据
  function quantityPieCharts() {
    var myChart = echarts.init(document.getElementById("container3"));
    var option = {
      title: {
        text: '单车数量统计',
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
        x: 'center',
        top: '10%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        data: ['蜀山区', '经开区', '包河区', '庐阳区', '瑶海区', '政务区', '高新区', '新站区', '滨湖区']
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '80%'],
          center: ['50%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              position: 'inner',
              formatter: "{c}辆({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: shuShan, name: '蜀山区'},
            {value: jingKai, name: '经开区'},
            {value: baoHe, name: '包河区'},
            {value: luYang, name: '庐阳区'},
            {value: yaoHai, name: '瑶海区'},
            {value: zhengWu, name: '政务区'},
            {value: gaoXin, name: '高新区'},
            {value: xinZhan, name: '新站区'},
            {value: binHu, name: '滨湖区'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'expansion',
          animationDuration: 4000
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize",function(){
      myChart.resize();
    });
  };

  // 获取数据
  function getBikeQuantity() {
    $http.get("json/bikeQuantity.json").success(function (data) {
      $scope.bikeQuantityDtos = data;
    })
  };

  function init() {
    getBikeQuantity();
    quantityBarCharts();
    quantityPieCharts();
    tableScrollFun();
  }

  init();

    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        $interval.cancel(interval);
    });

    interval = $interval(function () {
      getBikeQuantity();
    }, 2000, -1);

}]);
