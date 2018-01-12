'use strict';

app.controller('carAccidentInsured', ['$rootScope', '$scope', function ($rootScope, $scope) {

  var intervalfunc;
  // 得到随机下标
  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  // 设置随机号码
  function getRandomPhoneNum() {
    var numArr = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
    return numArr[getRandomIndex(numArr)] + '****' + getRandomNum(4);
  }

  // 生成特定长度数字字符串
  function getRandomNum(length) {
    var num = '';
    for (var i = 0; i < length; i++)
      num += Math.floor(Math.random() * 10)
    return num;
  }

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

  function getRandomSource(arr) {
    return arr[parseInt(Math.random() * arr .length)];
  }
  
  var interval = 2000;

  var accidentType = ['特大事故', '重大事故', '一般事故', '轻微事故'];

  function getDetails() {
    var plantNum = ["皖A·", "皖B·", "皖C·", "皖D·", "皖E·", "皖F·", "皖G·", "皖H·", "皖J·", "皖K·", "皖L·", "皖M·", "皖N·", "皖P·", "皖R·", "皖S·"];
    var names = ["孙*智", "顾*雪", "乐*睿", "陆*", "钮*亦", "魏*南", "华*娜", "项*易", "程*寒", "董*汐", "岑*怡", "贝*烈", "祁*波", "任*冰", "郎*妮", "毕*辉", "潘*秀", "杨*雁", "张*涛", "毕*懿", "孟*菡", "郑*", "顾*", "苏*然"];
    var orgType = ["快车", "顺风车"];
    var accidentType = ['特大事故', '重大事故', '一般事故', '轻微事故', '一般事故', '轻微事故', '一般事故', '轻微事故'];
    var insuredStatus = ["已投保", "已投保", "已投保", "已投保", "未投保"];
    var insuranceCompany = ["中国平安", "中国人保财险", "太平洋财险", "天安保险"];
    var insuredType = ["车辆损失险", "盗抢险", "自燃险", "划痕险"];

    var details = {};
    details.platNumber = getRandomSource(plantNum) + getRandomNum(5);
    details.ownerName = getRandomSource(names);
    details.phone = getRandomPhoneNum();
    details.operationType = getRandomSource(orgType);
    details.accidentType = getRandomSource(accidentType);
    details.dateTime = new Date();
    details.insuredStatus = getRandomSource(insuredStatus);
    details.insuranceCompany = details.insuredStatus == "未投保" ? "--" : getRandomSource(insuranceCompany);
    details.insuredType = details.insuredStatus == "未投保" ? "--" : getRandomSource(insuredType);

    return details;
  }

  var detailsList = [];

  // 初始化交通事故及投保情况数据
  function setDetailsList() {
    for (var j = 0; j < 30; j++)
      detailsList.push(getDetails());
    $scope.tableSource = detailsList;
  }

  setDetailsList();
  tableScrollFun();
  var insuredData = [
    [0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [1, 2, 2, 2, 1, 1],
    [2, 1, 1, 2, 1, 2]
  ];

  // 折线图
  function myLineChart() {
    var option = {
      title: {
        text: '事故累计统计',
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
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        itemHeight: 10,
        padding: [0, 0, 0, 30],
        left: 'left',
        top: '10%',
        textStyle: {
          color: '#ffffff'
        },
        data: accidentType
      },
      grid: {
        x: 20,
        y: 100,
        x2: 50,
        y2: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          name: '(时间)',
          boundaryGap: false,
          nameTextStyle: {
            color: '#ffffff'
          },
          max: 5,
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
            var len = 6;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
              now = new Date(now - interval);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          name: '(次)',
          type: 'value',
          min: 0,
          max: 6,
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#3a424a',
              type: 'solid'
            }
          },
          axisLine: {
            show: false // 隐藏y轴
          },
          axisTick: {
            show: false // 隐藏y轴坐标出头
          }
        }
      ],
      series: [
        {
          name: '特大事故',
          type: 'line',
          stack: '总量',
          symbol: 'rect',
          symbolSize: 14,
          lineStyle: {
            normal: {
              color: 'rgb(255, 0, 144)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgb(255, 0, 144)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(255, 0, 144)'
            }
          },
          data: insuredData[0]
        },
        {
          name: '重大事故',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 16,
          lineStyle: {
            normal: {
              color: 'rgb(227, 149, 0)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgb(255, 137, 0)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(255, 137,0)'
            }
          },
          data: insuredData[1]
        },
        {
          name: '一般事故',
          type: 'line',
          stack: '总量',
          symbol: 'triangle',
          symbolSize: 16,
          lineStyle: {
            normal: {
              color: 'rgb(249, 228, 3)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(249, 228, 3,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(249, 228, 3)'
            }
          },
          data: insuredData[2]
        },
        {
          name: '轻微事故',
          type: 'line',
          stack: '总量',
          symbol: 'diamond',
          symbolSize: 16,
          lineStyle: {
            normal: {
              color: 'rgb(16, 166, 219)'
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(16, 166, 219,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(16, 166, 219)'
            }
          },
          data: insuredData[3]
        }
      ]
    };

    var myChart = echarts.init(document.getElementById('option1'));
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });

    var oneLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    var twoLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    var threeLevel = [0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 2, 1];
    var fourLevel = [1, 1, 0, 2, 1, 0, 1, 0, 2, 2, 1, 2];

    intervalfunc = setInterval(function () {
      $scope.$apply(function () {
        for (var i = 0; i < insuredData.length; i++) {
          insuredData[i].shift();
          switch (i) {
            case 0:
              insuredData[i].push(oneLevel[parseInt(Math.random() * oneLevel.length)]);
              break;
            case 1:
              insuredData[i].push(twoLevel[parseInt(Math.random() * twoLevel.length)]);
              break;
            case 2:
              insuredData[i].push(threeLevel[parseInt(Math.random() * threeLevel.length)]);
              break;
            case 3:
              insuredData[i].push(fourLevel[parseInt(Math.random() * fourLevel.length)]);
              break;
            default:
              break;
          }
        }
      });

      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      myChart.setOption(option);
    }, interval);
  }

    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        clearInterval(intervalfunc);
    });

  myLineChart();

  // 车辆投保统计饼状图
  function myPieCharts() {
    var option = {
      title: {
        text: '投保明细',
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
          value: 710,
          itemStyle: {
            normal: {
              color: 'rgb(12, 168, 243)'
            }
          },
          label: {
            normal: {
              formatter: '{b}：{c}辆\n',
              textStyle: {
                fontSize: 16
              }
            }
          }
        }, {
          name: '未投保',
          value: 109,
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
              formatter: '{b}：{c}辆',
              textStyle: {
                fontSize: 16
              }
            }
          }
        }]
      }]
    };

    var myChart = echarts.init(document.getElementById('option2'));
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  myPieCharts();

}]);

