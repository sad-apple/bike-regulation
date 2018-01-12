/**
 * Created by zhaochuanzhi on 2017/8/29.
 */

app.controller('shareCarPriceController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

  var priceChargeChart;
  var option;
  var timeInterval = 2000;

  // 从数据库中获取数据
  $scope.getPagedDataAsync = function () {
    $http.get("json/shareCarPriceSupervise.json").success(function (data) {
      $scope.shareCarPriceSupervises = data;
      angular.forEach($scope.shareCarPriceSupervises, function (item, index) {
        item.rideTime = new Date(((new Date()).getTime() - ((index * parseInt(Math.random() * 4)) * 60 * 1000)));
      })
    }).error(function (err) {
      alert("shareCarPriceController: " + err.error);
    });
  };
  $scope.getPagedDataAsync();


  // 初始化收费总额
  function chareAmount() {
    $scope.charge = {};
    $scope.charge.operation = Math.round(Math.random() * 1000 + 4000); // 运营收费总额
    $scope.charge.standard = Math.round(Math.random() * 1000 + 5000);  // 标准收费总额
    $scope.carTypes = ['A品牌汽车', 'B品牌汽车', 'C品牌汽车', 'D品牌汽车'];
  }

  // 随机数据
  function randomData(type) {
    var data = [];
    if (type == 1) {
      for (var i = 0; i < 7; i++) {
        data.push(Math.round(2000 + Math.random() * 3000));
      }
      return data;
    }

    if (type == 2) {
      for (var i = 0; i < 7; i++) {
        data.push(Math.round(500 + Math.random() * 500));
      }
      return data;
    }

    if (type == 3) {
      for (var i = 0; i < 7; i++) {
        data.push(Math.round(2500 + Math.random() * 1000));
      }
      return data;
    }

  }

  // 格式化时间
  Date.prototype.Format = function (fmt) {
    var obj = {
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
    };
    for (var k in obj) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
      }
    }
    return fmt;
  };

  // 实际收费与标准收费柱状图
  function makePriceChargeChart() {
    priceChargeChart = echarts.init(document.getElementById('priceChargeChart'));
    option = {
      title: {
        text: '运营收费和收费标准',
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
      color: ['#019aba', '#7a201f', '#11565d'],
      legend: {
        padding: [0, 0, 0, 30],
        left: 'left',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        top: '10%',
        data: ['标准收费', '可波动幅度', '运营收费']

      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#ddd'
          }
        }
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        borderColor: '#51585F',
        containLabel: true
      },
      xAxis: [{
        show: true,
        axisLabel: {
          interval: 0,
          margin: 30,
          textStyle: {
            color: '#ddd',
            align: 'center'
          }
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        data: (function () {
          var now = new Date();
          var res = [];
          var len = 7;
          while (len--) {
            res.unshift(now.Format("HH:mm:ss"));
            now = new Date(now - 2000);
          }
          return res;
        })()
      }],
      yAxis: [{
        type: 'value',
        name: '金额',
        nameTextStyle: {
          color: '#ddd'
        },
        axisLabel: {
          textStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        type: 'bar',
        name: '标准收费',
        stack: '收费',
        itemStyle: {
          normal: {
            color: '#18D8C6'
          }
        },
        barWidth: '15%',
        data: [5000, 4000, 5500, 6500, 6200, 6100, 7000],
        label: {
          normal: {
            textStyle: {
              color: '#000'
            }
          }
        }
      },
        {
          type: 'bar',
          name: '可波动幅度',
          stack: '收费',
          itemStyle: {
            normal: {
              color: '#EDB23F'
            }
          },
          barWidth: '15%',
          data: [800, 900, 950, 700, 750, 650, 900],
          label: {
            normal: {
              textStyle: {
                color: '#000'
              }
            }
          }
        },
        {
          type: 'bar',
          name: '运营收费',
          itemStyle: {
            normal: {
              color: '#228BC6'
            }
          },
          barWidth: '15%',
          data: [4200, 3100, 4550, 5800, 5450, 5450, 6100],
          label: {
            normal: {
              textStyle: {
                color: '#000'
              }
            }
          }
        }
      ]
    };
    priceChargeChart.setOption(option);
    window.addEventListener("resize", function () {
      priceChargeChart.resize();
    });
  }

  // 打车方式改变 其报表数据也会改变
  $scope.$watch('carType', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      option.series[0].data = randomData(1);
      option.series[1].data = randomData(2);
      option.series[2].data = randomData(3);
      priceChargeChart.setOption(option);
    }
  }, true);
  var standardCharges, rangCharges, operation = 12584, standard = 18952, operationOld, standardOld;
  $scope.operation = formatNumber(operation);
  $scope.standard = formatNumber(standard);
  setInterval(function () {
    standardCharges = Math.round(2000 + Math.random() * 3000);//2000-5000应收
    rangCharges = Math.round(500 + Math.random() * 500);//500-1000实收
    // operation = formatNumberBack(operation);
    // standard = formatNumberBack(standard);
    operationOld = operation;
    standardOld = standard;
    option.series[0].data.shift();
    option.series[0].data.push(standardCharges);
    option.series[1].data.shift();
    option.series[1].data.push(rangCharges);
    option.series[2].data.shift();
    option.series[2].data.push(standardCharges - rangCharges);
    $scope.$apply(function () {
      operation += (standardCharges - rangCharges);
      standard += standardCharges;
      Demo();
    });
    option.xAxis[0].data.shift();
    option.xAxis[0].data.push((new Date()).Format("HH:mm:ss"));
    priceChargeChart.setOption(option);

  }, timeInterval);

  function Demo() {
    var bb = standardCharges;
    var aa = bb - rangCharges;
    var smallInterval = setInterval(function () {
      $scope.$apply(function () {
        operationOld = operationOld + Math.floor(aa / 39);
        standardOld = standardOld + Math.floor(bb / 39);
        $scope.operation = formatNumber(operationOld);
        $scope.standard = formatNumber(standardOld);
      })
    }, 50);
    setTimeout(function () {
      clearInterval(smallInterval);
      $scope.operation = formatNumber(operation);
      $scope.standard = formatNumber(standard);
    }, timeInterval)
  }

  // 初始化数据
  function init() {
    makePriceChargeChart();
    chareAmount();
    tableScrollFun();
  }

  init();

}]);



