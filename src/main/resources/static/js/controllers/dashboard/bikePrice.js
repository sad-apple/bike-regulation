'use strict';

app.controller('bikePriceCtrl', ['$rootScope', '$scope', '$http', 'toaster', '$timeout', '$state', '$interval', 'Fullscreen', '$filter', function ($rootScope, $scope, $http, toaster, $timeout, $state, $interval, Fullscreen, $filter) {
  var myChart;
  var option;
  var data1 = [862, 1018, 964, 1026];
  var data2 = [220, 182, 191, 234];
  var data3 = [1020, 1132, 1001, 1134];

  $scope.createTime = formatDate("YYYY-MM-DD", new Date());
  $scope.today = new Date();

  //日期格式化方法
  function formatDate(pattern, date) {
    function formatNumber(data, format) {
      format = format.length;
      data = data || 0;
      return format == 1 ? data : (data = String(Math.pow(10, format) + data)).substr(data.length - format);
    }

    return pattern.replace(/([YMDhsm])\1*/g, function (format) {
      switch (format.charAt()) {
        case 'Y':
          return formatNumber(date.getFullYear(), format);
        case 'M':
          return formatNumber(date.getMonth() + 1, format);
        case 'D':
          return formatNumber(date.getDate(), format);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return formatNumber(date.getHours(), format);
        case 'm':
          return formatNumber(date.getMinutes(), format);
        case 's':
          return formatNumber(date.getSeconds(), format);
      }
    });
  }

  // 柱状图数据
  function qualityBarCharts() {
    var em = document.getElementById("container")
    myChart = echarts.init(em);
    option = {
      title: {
        text: '收费实际和标准对比',
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
        },
        x:'1.5%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['应收总额', '应收范围', '实收总额'],
        padding: [0, 0, 0, 30],
        left: '1.5%',
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
        right: '1%',
        top: '20%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['A单车', 'B单车', 'C单车', 'D单车'],
          nameTextStyle: {
            fontSize: 14
          },
          axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.83)',
              fontSize: 15
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0.33)'
            }
          },
          axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
            show: true,
            lineStyle: {
              color: 'rgba(170,172,178,0)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.83)',
              fontSize: 15
            }
          }
        }
      ],
      series: [
        {
          name: '应收总额',
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'rgba(27, 188, 156,1)'
            }
          },
          barWidth: '8%',
          stack: '实收总额',
          data: data1
        },
        {
          name: '应收范围',
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'rgba(49, 254, 246,1)'
            }
          },
          barWidth: '8%',
          stack: '实收总额',
          data: data2
        },
        {
          name: '实收总额',
          type: 'bar',
          barCategoryGap: '60%',
          barWidth: '8%',
          itemStyle: {
            normal: {
              color: 'rgba(52, 152, 220,1)'
            }
          },
          data: data3
        }
      ],
      animationEasing: 'circularOut',
      animationDuration: 2000,
      animationDelay: 700
    };
    myChart.setOption(option);

    window.addEventListener("resize",function(){
      myChart.resize();
    });
  }
  
  //历史订单统计数据
  function getRunResult() {
    $http.get("json/bikePrice.json").success(function (data) {
      $scope.bikePriceDtos = data;
      angular.forEach($scope.bikePriceDtos, function (item, index) {
        item.rideTime = new Date(((new Date()).getTime() - ((index * parseInt(Math.random() * 4)) * 60 * 1000)));
      })
    })
  };

  // 时间选择添加监听事件
  $scope.$watch('createTime', function (newVal, oldVal) {
    if (newVal != oldVal) {
      var d1 = [];
      var d3 = [];
      for (var d = 0; d < data1.length; d++) {
        d1.push(data1[d] - Math.round(Math.random() * 200 + 1));
        d3.push(data3[d] - Math.round(Math.random() * 250 + 1));
      }
      option.series[0].data = d1;
      option.series[1].data = data2;
      option.series[2].data = d3;

      myChart.setOption(option);
    }
  }, true);

  function init() {
    getRunResult();
    qualityBarCharts();
    tableScrollFun();
  }

  init();

  var interval;
  // 离开页面后停止轮询
  $scope.$on('$destroy', function () {
    $interval.cancel(interval);
  });

  interval = $interval(function () {
    getRunResult();
  }, 3000, -1);

  //日历工具事件
  $scope.timeTool = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.createTimeOpened = true;
  }

}]);
