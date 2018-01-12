/**
 * Created by shuzhengxing on 2017/8/16.
 * 车辆投保情况报表
 * 对应数据库表——insured_details
 */
'use strict';

app.controller('dashBoardInsured', ['$scope', function ($scope) {

  // 生成特定长度数字字符串
  function getRandomNum(length) {
    var num = '';
    for (var i = 0; i < length; i++)
      num += Math.floor(Math.random() * 10)
    return num;
  }

  // 得到随机下标
  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  // 得到数组中的随机数据
  function getRandomSource(arr) {
    return arr[parseInt(Math.random() * arr.length)];
  }

  var plateNumArr = ["05511", "05512", "05513", "05514"];
  var operationNames = ["A公司", "B公司", "C公司", "D公司"];
  var money = ["￥35", "￥30"];

  function getDetails() {
    var index = getRandomIndex(plateNumArr);
    var details = {};
    var date1 = new Date();
    var dateTime = [date1, date1, "--"];
    details.plateNumber = plateNumArr[index] + getRandomNum(5);
    details.operationName = operationNames[index];
    details.dateTime = getRandomSource(dateTime);
    details.insuredType = details.dateTime == "--" ? "--" : "人身意外险";
    details.insuredAmount = details.dateTime == "--" ? "--" : getRandomSource(money);

    return details;
  }

  var dataSource = [];

  function getInsuredDetails() {
    for (var i = 0; i < 40; i++)
      dataSource.push(getDetails());
    $scope.tableSource = dataSource;
  }

  getInsuredDetails();
  tableScrollFun();
  var bikeData = [
    [8000, 11000, 10000, 11000],
    [5500, 7500, 8000, 8500],
    [2500, 3500, 2000, 2500]
  ];

  // 初始化车辆总数，投保车辆，未投保车辆
  $scope.total = formatNumber(sum(bikeData[0]));
  $scope.balance = formatNumber(sum(bikeData[1]));
  $scope.consumption = formatNumber(sum(bikeData[2]));

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

  // 计算总数量
  function sum(arr) {
    var sumNum = 0;
    for (var i = 0; i < arr.length; i++) {
      sumNum += arr[i];
    }
    return sumNum;
  }

  // 车辆投保柱状图
  function insuranceStatDashboard() {
    var myOption = {
      title: {
        text: '车辆投保统计',
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
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        padding: [0, 0, 0, 30],
        left: 'left',
        top: '10%',
        data: ['车辆总数', '投保车辆', '未投保车辆'],
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        x: 40,
        y: 80,
        x2: 0,
        y2: 0,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#3a424a',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#ffffff' // x坐标的文字颜色
          }
        },
        axisTick: false,
        data: ['A单车', 'B单车', 'C单车', 'D单车']
      }],
      yAxis: [{
        type: 'value',
        nameTextStyle: {
          color: '#ffffff'
        },
        max: 12000,
        min: 0,
        splitLine: {
          lineStyle: {
            color: '#3a424a',
            type: 'solid'  // 设置分割线为虚线
          }
        },
        axisLabel: {
          textStyle: {
            color: '#ffffff'
          }
        },
        axisLine: {
          show: false     // 隐藏y轴
        },
        axisTick: {
          show: false  // 隐藏纵坐标出头
        }
      }],
      series: [{
        name: '车辆总数',
        type: 'bar',
        barCategoryGap: '50%',
        data: bikeData[0],
        itemStyle: {
          normal: {
            color: '#2abb9c'
          }
        }
      }, {
        name: '投保车辆',
        type: 'bar',
        barCategoryGap: '50%',
        data: bikeData[1],
        itemStyle: {
          normal: {
            color: '#3a99d9'
          }
        }
      }, {
        name: '未投保车辆',
        type: 'bar',
        barCategoryGap: '50%',
        data: bikeData[2],
        itemStyle: {
          normal: {
            color: '#e32369'
          }
        }
      }],
      animationEasing: 'circularOut',
      animationDuration: 2500,
      animationDelay: 700
    };

    var myChart = echarts.init(document.getElementById('barOption'));
    myChart.setOption(myOption);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  insuranceStatDashboard();

  // 车辆投保统计明细饼状图
  function insuranceDetailsDashboard() {
    var myOption = {
      title: {
        text: '车辆投保明细',
        subtext: '——————————',
        itemGap: 0,
        padding: [0, 0, 30, 0],
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
        left: 'center',
        y: '11%',
        itemWidth: 10,
        itemHeight: 10,
        data: ["已投保", "未投保"],
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + '：' + formatNumber(params.value) + "辆(" + params.percent + '%)';
        }
      },
      series: [{
        type: "pie",
        center: ['50%', '59.4%'],
        radius: ['53%', '75%'],
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [{
          name: '已投保',
          value: sum(bikeData[1]),
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
                fontSize: 16
              }
            }
          }
        }, {
          name: '未投保',
          value: sum(bikeData[2]),
          tooltip: {
            show: true
          },
          itemStyle: {
            normal: {
              color: '#e32369'
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name + '：' + formatNumber(params.value) + '辆\n';
              },
              textStyle: {
                fontSize: 16
              }
            }
          }
        }]
      }]
    };

    var myChart = echarts.init(document.getElementById('circleOption'));
    myChart.setOption(myOption);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  insuranceDetailsDashboard();

}]);

