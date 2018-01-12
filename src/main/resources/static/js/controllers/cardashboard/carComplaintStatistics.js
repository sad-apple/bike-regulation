/**
 * Created by shuzhengxing on 2017/8/25.
 */
'use strict';

app.controller('carComplaintStatistics', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

  // 生成特定长度数字字符串
  function getRandomNum(length) {
    var num = '';
    for (var i = 0; i < length; i++)
      num += Math.floor(Math.random() * 10)
    return num;
  }

  // 设置随机号码
  function getRandomPhoneNum() {
    var numArr = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
    return numArr[parseInt(Math.random() * numArr.length)] + '****' + getRandomNum(4);
  }

  // 生成账单编号
  var z = 1;

  function getBillNumber() {
    z = z + 1;
    var zero = '';
    if (z.toString().length < 6) {
      for (var i = 0; i < 6 - z.toString().length; i++) {
        zero += 0;
      }
    }
    return new Date().getFullYear().toString().substring(2, 4) + (new Date().getMonth() + 1) + new Date().getDate() + zero + z;
  }

  var plantNum = ["皖A·", "皖B·", "皖C·", "皖D·", "皖E·", "皖F·", "皖G·", "皖H·", "皖J·", "皖K·", "皖L·", "皖M·", "皖N·", "皖P·", "皖R·", "皖S·"];
  var names = ["孙*智", "顾*雪", "乐*睿", "陆*", "钮*亦", "魏*南", "华*娜", "项*易", "程*寒", "董*汐", "岑*怡", "贝*烈", "祁*波", "任*冰", "郎*妮", "毕*辉", "潘*秀", "杨*雁", "张*涛", "毕*懿", "孟*菡", "郑*", "顾*", "苏*然"];
  var orgType = ["快车", "顺风车"];
  var type = ["未送达", "危险驾驶", "迟到", "态度恶劣", "车牌不符", "临时加价"];
  var content = ["临时加价", "态度恶劣，车内有异味", "没到达指定地点", "司机绕远路", "没有车牌", "危险驾驶"];
  var result = ["未处理", "已处理"];

  function getDetails() {
    var details = {};
    details.billNumber = getBillNumber();
    details.carNumber = plantNum[parseInt(Math.random() * plantNum.length)] + getRandomNum(5);
    details.carOwner = names[parseInt(Math.random() * names.length)];
    details.telephoneNumber = getRandomPhoneNum();
    details.orgType = orgType[parseInt(Math.random() * orgType.length)];
    details.date = new Date();
    details.type = type[parseInt(Math.random() * type.length)];
    details.content = content[parseInt(Math.random() * content.length)];
    details.result = result[parseInt(Math.random() * result.length)];

    return details;
  }

  var complaintDetails = [];

  // 初始化非法移动报警明细数据
  function setDetailsList() {
    for (var j = 0; j < 30; j++)
      complaintDetails.push(getDetails());
    $scope.tableSource = complaintDetails;
  }

  setDetailsList();
  tableScrollFun();

  $scope.setColor = function (text) {
    if (text == "未处理")
      return {"color": 'red'};
  };

  // 初始化日期
  $scope.date = formatDate("YYYY-MM-DD", new Date());
  $scope.maxDate = new Date();

  // 时间戳转化日期过滤器
  app.filter('formatTime', function () {
    return function (time) {
      var date = new Date(time);
      return formatDate('YYYY-MM-DD', date);
    }
  });

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

  // 初始化日历工具
  $scope.timeTool = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.createTimeOpened = true;
  };

  // 数字显示样式
  var formatNumber = function (n) {
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) {
      return b;
    }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
  };

  // 初始化数据
  var moneyData = [
    [2, 3, 4, 4, 4, 4, 5],
    [3, 1, 1, 2, 2, 3, 4]
  ];

  // 车辆投保统计折线图
  function complaintDashboard() {
    var interval = 5000;
    var option = {
      title: {
        text: '实时投诉统计',
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
        padding: [0, 0, 0, 30],
        left: 'left',
        textStyle: {
          color: '#DCDCDC'
        },
        itemHeight: 10,
        borderRadius: 10,
        top: '10%',
        data: ['顺风车', '快车']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          lineStyle: {
            color: '#48b',
            width: 2,
            type: 'solid' // 虚线
          }
        },
        formatter: function (params) {
          var res = params[0].name;   // 获得x轴的值
          for (var i = 0; i < params.length; i++) {
            res += '<br/>' + params[i].seriesName + ' : ' + formatNumber(params[i].value) + '￥'; // 获得y轴对应的值
          }
          return res;
        }
      },
      grid: {
        x: 50,
        y: 100,
        x2: 50,
        y2: 0,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: '(时间)',
        nameTextStyle: {
          color: '#ffffff'
        },
        max: 6,
        min: 0,
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
        data: (function () {
          var now = new Date();
          var res = [];
          var len = 7;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - interval);
          }
          return res;
        })()
      }],
      yAxis: [{
        name: '(投诉数)',
        type: 'value',
        min: 0,
        max: 5,
        nameTextStyle: {
          color: '#ffffff'
        },
        axisLabel: {
          textStyle: {
            color: '#ffffff' // y坐标的文字颜色
          }
        },
        splitLine: {
          lineStyle: {
            color: '#3a424a',
            width: 2,
            type: 'solid'
          }
        },
        axisLine: {
          show: false // 隐藏y轴
        },
        axisTick: {
          show: false // 隐藏y轴坐标出头
        }
      }],
      series: [{
        name: '顺风车',
        type: 'line',
        symbolSize: 10, // 拐点大小
        itemStyle: {
          normal: {
            width: 3,
            color: '#FD3F8D' // 折线颜色
          }
        },
        data: moneyData[0]
      }, {
        name: '快车',
        type: 'line',
        symbolSize: 10,
        itemStyle: {
          normal: {
            width: 3,
            color: '#EAE600'
          }
        },
        data: moneyData[1]
      }]
    };

    var myChart = echarts.init(document.getElementById('option1'));
    myChart.setOption(option);

    window.addEventListener("resize",function(){
      myChart.resize();
    });

    setInterval(function () {
      $scope.$apply(function () {
        for (var i = 0; i < moneyData.length; i++) {
          moneyData[i].shift();
          moneyData[i].push(parseInt(Math.random() * 3 + 2));
        }
      });

      // 设置x轴动态改变
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      myChart.setOption(option);

    }, interval);
  }

  complaintDashboard();

  // 初始化数据
  var complaintTypeData = {
    cate: ["未送达", "危险驾驶", "迟到", "态度恶劣", "车牌不符", "临时加价"],
    data: [2, 3, 3, 3, 1, 3]
  };

  // 车辆投保明细饼状图报表
  function complaintTypeDashboard() {
    var barOption = {
      title: {
        text: '投诉种类统计',
        subtext: '—————————————————',
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
        x: 'center',
        top: '10%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        data: complaintTypeData.cate
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}：{c}<br/>占比：{d}%"
      },
      series: [{
        type: "pie",
        center: ['50%', '60%'],
        radius: ['30%', '80%'],
        label: {
          normal: {
            position: 'inner',
            formatter: '{c}次({d}%)',
            textStyle: {
              fontSize: 12
            }
          }
        },
        data: [{
          name: '未送达',
          value: complaintTypeData.data[0],
          itemStyle: {
            normal: {
              color: '#1F55C0'
            }
          }
        }, {
          name: '危险驾驶',
          value: complaintTypeData.data[1],
          itemStyle: {
            normal: {
              color: '#C5C303'
            }
          }
        }, {
          name: '迟到',
          value: complaintTypeData.data[2],
          itemStyle: {
            normal: {
              color: '#C11C62'
            }
          }
        }, {
          name: '态度恶劣',
          value: complaintTypeData.data[3],
          itemStyle: {
            normal: {
              color: '#DF00C7'
            }
          }
        }, {
          name: '车牌不符',
          value: complaintTypeData.data[4],
          itemStyle: {
            normal: {
              color: '#468ADA'
            }
          }
        }, {
          name: '临时加价',
          value: complaintTypeData.data[5],
          itemStyle: {
            normal: {
              color: '#27C6CE'
            }
          }
        }],
        animationType: 'expansion',
        animationDuration: 4000
      }]
    };

    var myBarChart = echarts.init(document.getElementById('option2'));
    myBarChart.setOption(barOption);

    window.addEventListener("resize",function(){
      myBarChart.resize();
    });

    // 当日期改变时改变报表数据
    function getRandomData() {
      for (var i = 0; i < 6; i++)
        barOption.series[0].data[i].value = parseInt(Math.random() * 2 + 2, 10);
      myBarChart.setOption(barOption);
    }

    // 日期添加监听事件
    $scope.$watch('date', function (newVal, oldVal) {
      if (newVal != oldVal && newVal != null)
        getRandomData();
    }, true);

  }

  complaintTypeDashboard();

}]);