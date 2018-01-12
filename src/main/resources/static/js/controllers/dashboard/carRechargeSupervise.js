/**
 * Created by shuzhengxing on 2017/8/16.
 * 充值监管报表
 * 对应数据库表格--recharge_details
 */
'use strict';

app.controller('carRechargeSupervise', ['$scope', function ($scope) {

  // 设置随机号码
  function getRandomPhoneNum() {
    var numArr = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
    return numArr[Math.floor(Math.random() * numArr.length)] + "****" + getRandomNum(4);
  }

  // 生成特定长度数字字符串
  function getRandomNum(length) {
    var num = '';
    for (var i = 0; i < length; i++)
      num += Math.floor(Math.random() * 10)
    return num;
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

  var payTypes = ["支付宝", "微信", "银行卡"];
  var type = ["充值", "消费"];
  var accountNumber = ["￥5", "￥10", "￥20", "￥50"];

  function getDetails() {
    var details = {};
    details.billNumber = getBillNumber();
    details.dateTime = new Date();
    details.id = 1;
    details.name = getRandomPhoneNum();
    details.payType = payTypes[parseInt(Math.random() * payTypes.length)];
    details.state = type[parseInt(Math.random() * type.length)];
    details.accountNumber = details.state == "充值" ? accountNumber[parseInt(Math.random() * accountNumber.length)] : ("￥" + parseInt(Math.random() * 3));

    return details;
  }

  var rechargeDetailsData = [];

  // 初始化显示10条数据
  function getRechargeDetailsData() {
    for (var i = 0; i < 10; i++)
      rechargeDetailsData.push(getDetails());
    $scope.rechargeDetails = rechargeDetailsData.reverse();
  }

  getRechargeDetailsData();
  tableScrollFun();
  $scope.gridOptions = {
    data: 'rechargeDetails',
    rowHeight: 41,
    headerRowHeight: 36,
    multiSelect: false,
    columnDefs: [
      {field: 'billNumber', displayName: '账单编号', width: '17%'},
      {field: 'name', displayName: '用户', width: '16%'},
      {field: 'accountNumber', displayName: '金额', width: '16%'},
      {field: 'payType', displayName: '支付方式', width: '16%'},
      {
        field: 'dateTime',
        displayName: '时间',
        width: '18%',
        cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.dateTime| date:"yyyy-MM-dd hh:mm:ss"}}</div>'
      },
      {field: 'state', displayName: '账单状态', width: '17%'}
    ]
  };

  var moneyData = [
    [1, 0, 3, 4, 5, 2, 5, 1, 3, 0, 4, 2],
    [0, 1, 2, 0, 3, 1, 2, 0, 3, 1, 0, 2]
  ];

  // 初始化当前余额，充值金额，消费金额
  var total = 4500000;
  $scope.total = formatNumber(total);

  function rechargeDashboard() {
    var interval = 2000;

    var option = {
      title: {
        text: '充值统计',
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
        left: '2.5%'
      },
      legend: {
        orient: 'horizontal',
        x: '2.5%',
        top: '10%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemHeight: 10,
        borderRadius: 10,
        data: ['充值金额', '消费金额']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#808080',
            width: 2,
            type: 'dashed'  // 虚线
          }
        },
        formatter: function (params) {
          var res = params[0].name;
          for (var i = 0; i < params.length; i++) {
            res += '<br/>' + params[i].seriesName + ' : ￥' + formatNumber(params[i].value);
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
      xAxis: [
        {
          type: 'category',
          name: '(时间)',
          nameTextStyle: {
            color: '#ffffff'
          },
          max: 11,
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
            var len = 12;
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
          name: '(金额)',
          type: 'value',
          min: 0,
          max: 7,
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
      series: [{
        name: '充值金额',
        type: 'line',
        symbolSize: 10,
        itemStyle: {
          normal: {
            width: 3,
            color: '#3afafd'
          }
        },
        data: moneyData[0]
      }, {
        name: '消费金额',
        type: 'line',
        symbolSize: 10,
        itemStyle: {
          normal: {
            width: 3,
            color: '#03f182'
          }
        },
        data: moneyData[1]
      }]
    };

    var myChart = echarts.init(document.getElementById('option'));
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
    var randomNum1,randomNum2,totalOld;
    setInterval(function () {
      $scope.$apply(function () {
        for (var i = 0; i < moneyData.length; i++) {
          moneyData[i].shift();
          if (i == 0) {
            randomNum1 = Math.round(Math.random() * 5);
            moneyData[i].push(randomNum1);
          } else {
            randomNum2 = Math.round(Math.random() * 3);
            moneyData[i].push(randomNum2)
          }
        }
        totalOld = formatNumberBack($scope.total) + (randomNum1 - randomNum2);
      });
      // 设置x轴动态改变
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      myChart.setOption(option);

      Demo();

    }, interval);

    function Demo() {
      var smallInterval = setInterval(function(){
        $scope.$apply(function () {
          if((randomNum1 - randomNum2) > 0){
            total ++;
          }else if ((randomNum1 - randomNum2) < 0){
            total --;
          }
          $scope.total = formatNumber(total);
          if (formatNumberBack(totalOld) == total){
            clearInterval(smallInterval);
          }})
      },400);
    }
  }

  rechargeDashboard();

}]);