/**
 * Created by lihao on 2017/8/16.
 */

'use strict';

app.controller('depositSuperviseReport', ['$scope', '$http', function ($scope, $http) {

  var intreval = 2000;
  var now = new Date();
  var y = ['退款押金', '当前押金', '充值押金'];

  $scope.theme = 'default';
  $scope.obj = {};
  $scope.depositDatas = [
    {
      id: "121001",
      phoneNumber: "13902078603",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121002",
      phoneNumber: "13706505556",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121003",
      phoneNumber: "13605517171",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121004",
      phoneNumber: "18856005678",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121005",
      phoneNumber: "13805517689",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121006",
      phoneNumber: "13905513122",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121007",
      phoneNumber: "18226313777",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121008",
      phoneNumber: "18205648965",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121009",
      phoneNumber: "15665448754",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121010",
      phoneNumber: "15523799999",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121011",
      phoneNumber: "15885547751",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121012",
      phoneNumber: "18722589111",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121013",
      phoneNumber: "18202536800",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121014",
      phoneNumber: "18605811368",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121015",
      phoneNumber: "18919673986",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121016",
      phoneNumber: "13605517171",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121017",
      phoneNumber: "15885547751",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121018",
      phoneNumber: "15255471456",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121019",
      phoneNumber: "15855471247",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121001",
      phoneNumber: "13902078603",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121002",
      phoneNumber: "13706505556",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121003",
      phoneNumber: "13605517171",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121004",
      phoneNumber: "18856005678",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121005",
      phoneNumber: "13805517689",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121006",
      phoneNumber: "13905513122",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121007",
      phoneNumber: "18226313777",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121008",
      phoneNumber: "18205648965",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121009",
      phoneNumber: "15665448754",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121010",
      phoneNumber: "15523799999",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121011",
      phoneNumber: "15885547751",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121012",
      phoneNumber: "18722589111",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121013",
      phoneNumber: "18202536800",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121014",
      phoneNumber: "18605811368",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121015",
      phoneNumber: "18919673986",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "消费"
    },
    {
      id: "121016",
      phoneNumber: "13605517171",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "充值"
    },
    {
      id: "121017",
      phoneNumber: "15885547751",
      createTime: "",
      deposit: "￥299",
      payment: "微信",
      depositStatus: "充值"
    },
    {
      id: "121018",
      phoneNumber: "15255471456",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {
      id: "121019",
      phoneNumber: "15855471247",
      createTime: "",
      deposit: "￥299",
      payment: "支付宝",
      depositStatus: "消费"
    },
    {id: "121020", phoneNumber: "18114868815", createTime: "", deposit: "￥299", payment: "微信", depositStatus: "已付款"}
  ];

  function init() {
    $scope.categories = [];
    $scope.totals = [];
    $scope.increments = [];
    for (var i = 0; i < $scope.depositDatas.length; i++) {
      decorateData($scope.depositDatas[i]);
      $scope.depositDatas[i].createTime = new Date(+new Date() - ($scope.depositDatas.length - i) * 1000);
    }
    ;
    tableScrollFun();
  }

  init();

  // ngGrid初始化数据
  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true
  };

  $scope.pagingOptions = {
    pageSizes: [10, 20, 30],
    pageSize: '10',
    currentPage: 1
  };

  // 时间戳转化日期过滤器
  app.filter('formatTime', function () {
    return function (createTime) {
      var date = new Date(createTime);
      return formatDate('YYYY-MM-DD hh:mm:ss', date);
    }
  });

  // 金额过滤器
  app.filter('formatAmount', function () {
    return function (amount) {
      return '￥' + amount;
    }
  });

  // 数据修饰
  function decorateData(param) {
    param.createTime = new Date();
    param.id = formatDate("YYMMDD", now) + "1" + param.id;
    param.phoneNumber = param.phoneNumber.substr(0, 3) + "****" + param.phoneNumber.substr(7);
  }

  // 日期格式化方法
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

  $(function () {
    $("#depositSuperviseReportChartConfig").find("canvas").css({display: 'block', margin: '0 auto'});
  });

  function depositSuperviseReportChart() {
    var option = {
      title: {
        text: '押金明细',
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
        x: '1.5%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['退款押金', '当前押金', '充值押金'],
        padding: [0, 0, 0, 30],
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        top: '10%',
        left: '1.5%'
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
          type: 'time',
          name: '(时间)',
          nameTextStyle: {
            color: '#ffffff'
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff' // x坐标的文字颜色
            }
          }
        }
      ],
      yAxis: [
        {
          name: '(金额)',
          type: 'value',
          nameTextStyle: {
            color: '#ffffff'
          },
          splitLine: {
            show: false
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
          name: '退款押金',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: 'rgba(25, 255, 104, 1)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(25, 255, 104, 1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(25, 255, 104, 1)'
            }
          },
          data: data2
        },
        {
          name: '当前押金',
          type: 'line',
          stack: '总量',
          symbol: 'rect',
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: 'rgba(230, 255, 47, 1)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(230, 255, 47, 1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(230, 255, 47, 1)'
            }
          },
          data: data3
        },
        {
          name: '充值押金',
          type: 'line',
          stack: '总量',
          symbol: 'diamond',
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: 'rgba(31, 94, 255, 1)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(31, 94, 255, 0.8)'
            }
          },
          itemStyle: {
            normal: {

              color: 'rgba(31, 94, 255, 1)'
            }
          },
          data: data1
        }
      ]

    };
    var myChart = echarts.init(document.getElementById('depositSuperviseReportChartConfig'));
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });


    var total = 25295,recharge = 1315,refunds = 1047,totalOld,rechargeOld,refundsOld;
    $scope.total = formatNumber(total);
    $scope.recharge = formatNumber(recharge);
    $scope.refunds = formatNumber(refunds);
    setInterval(function () {
      var x = new Date(), // current time
          series = myChart.getOption().series;

      $scope.$apply(function () {
      totalOld = formatNumberBack(total);
      rechargeOld = formatNumberBack(recharge);
      refundsOld = formatNumberBack(refunds);
        for (var i = 0; i < y.length; i++) {
          series[i].data.shift();

          if (y[i] == '当前押金') {
            total = getRandomNum(1);
            series[i].data.push({name: x.toString(), value: [x, getRandomNum(0)]});
          } else if (y[i] == '充值押金') {
            recharge = getRandomNum(0);
            series[i].data.push({name: x.toString(), value: [x, $scope.obj.recharge]});
          } else {
            refunds = getRandomNum(0);
            series[i].data.push({name: x.toString(), value: [x, $scope.obj.refunds]});
          }
        }

        Demo1();
      });

      myChart.setOption({
        series: series
      });
    }, intreval);

    function Demo1() {
      var z1 = Math.abs(total - totalOld);
      var z2 = Math.abs(recharge - rechargeOld);
      var z3 = Math.abs(refunds - refundsOld);
      // z = Math.abs(z-intreval);
      var timeT1 = Math.floor(z1/21);
      var timeT2 = Math.floor(z2/21);
      var timeT3 = Math.floor(z3/21);
      timeT1 = timeT1 < 1 ? 1 : timeT1 < 50 ? 25 : timeT1 < 100 ? 55 : 88;
      timeT2 = timeT2 < 1 ? 1 : timeT2 < 30 ? 15 : timeT2 < 60 ? 35 : 55;
      timeT3 = timeT2 < 1 ? 1 : timeT3 < 30 ? 15 : timeT3 < 60 ? 35 : 55;
      totalOld = formatNumberBack(totalOld);
      total = formatNumberBack(total);
      rechargeOld = formatNumberBack(rechargeOld);
      recharge = formatNumberBack(recharge);
      refundsOld = formatNumberBack(refundsOld);
      refunds = formatNumberBack(refunds);
      function totalT(x,y,t){//数字操作函数
        if((x - y) < 0){
          x = x + t;
        }else if ((y - x) > 0){
          x = x - t;
        }
        return x;
      }
      var smallInterval = setInterval(function(){
        $scope.$apply(function () {
          totalOld = totalT(totalOld,total,timeT1);
          rechargeOld = totalT(rechargeOld,recharge,timeT2);
          refundsOld = totalT(refundsOld,refunds,timeT3);
          $scope.total = formatNumber(totalOld);
          $scope.recharge = formatNumber(rechargeOld);
          $scope.refunds = formatNumber(refundsOld);
        })
      },100);
      setTimeout(function(){
        clearInterval(smallInterval);
        $scope.total = formatNumber(total);
        $scope.recharge = formatNumber(recharge);
        $scope.refunds = formatNumber(refunds);
      },1900);
    }

  }

  //初始化数据
  var data1 = getRandomArr(0);
  $scope.obj.total = getRandomNum(1);
  var data2 = getRandomArr(0);
  $scope.obj.recharge = data2[9].value[1];
  var data3 = getRandomArr(0);
  $scope.obj.refunds = data3[9].value[1];

  depositSuperviseReportChart();

  function getRandomArr(type) {
    var data = [];
    for (var i = 0; i < 10; i++) {
      data.unshift(randomData(i, type));
    }
    return data;
  }

  function randomData(count, type) {
    var now1 = now;
    now1 = new Date(+now1 - count * (intreval));
    return {
      name: now1.toString(),
      value: [
        now1,
        getRandomNum(type)
      ]
    }
  }

  function getRandomNum(type) {
    var temp;
    if (type == 1) {
      temp = Math.round(Math.random() * 10000 + 25000);
    } else {
      temp = Math.round(Math.random() * 500 + 1000);
    }
    return temp;
  }

}]);

