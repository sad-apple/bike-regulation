/**
 * Created by zhaochuanzhi on 2017/8/16.
 */

'use strict';

app.controller('adSupervisionController', ['$scope', function ($scope) {

  var complainCharts;
  var adStatChart;

  /**
   * 车身广告明细随机数据
   */
  function getDetails() {
    var plateNumArr = ["05511", "05512", "05513", "05514"];
    var operationOrgNameArr = ["A公司", "B公司", "C公司", "D公司"];
    var regionArr = ["蜀山区", "包河区", "瑶海区", "庐阳区", "经开区", "高新区", "政务区"];
    var adOwnerArr = ["甲公司", "乙公司", "丙公司"];
    var isComplaintArr = ["是", "否"];
    var index = Math.round(Math.random() * (plateNumArr.length - 1));
    var bikeAd = {};
    bikeAd.plateNumber = plateNumArr[index] + Math.round(Math.random() * 90000 + 10000);
    bikeAd.region = regionArr[Math.round(Math.random() * (regionArr.length - 1))];
    bikeAd.deliveryDate = new Date();
    bikeAd.operationOrgName = operationOrgNameArr[index];
    bikeAd.adType = "车身广告";
    bikeAd.adOwner = adOwnerArr[Math.round(Math.random() * (adOwnerArr.length - 1))];
    bikeAd.adContent = "******";
    bikeAd.isComplaint = isComplaintArr[parseInt(Math.random() * isComplaintArr.length)];
    bikeAd.isHandel = isComplaintArr[parseInt(Math.random() * isComplaintArr.length)];

    return bikeAd;
  }

  var dataSource = [];

  function getAdSupervisionDetails() {
    for (var i = 0; i < 30; i++)
      dataSource.push(getDetails());
    $scope.bikeAdDatas = dataSource;
    tableScrollFun();
  }

  getAdSupervisionDetails();

  // 初始化车身广告列表明细数据
  $scope.gridOptions = {
    data: 'bikeAdDatas',
    rowHeight: 41,
    headerRowHeight: 36,
    multiSelect: false,
    columnDefs: [
      {field: 'plateNumber', displayName: '车辆编号', width: '200px'},
      {field: 'region', displayName: '所属区域', width: '200px'},
      {field: 'deliveryDate', displayName: '投放日期', width: '200px', cellTemplate: '<div class="ngCellText ng-scope" >{{row.entity.deliveryDate| date:"yyyy-MM-dd"}}</div>'},
      {field: 'operationOrgName', displayName: '运营方', width: '200px'},
      {field: 'adType', displayName: '广告类型', width: '200px'},
      {field: 'adOwner', displayName: '投放商', width: '200px'},
      {field: 'adContent', displayName: '广告内容', width: '200px'},
      {field: 'isComplaint', displayName: '收到投诉', width: '200px'},
      {field: 'isHandel', displayName: '是否处理', width: '200px'}
    ]
  };


  // 投诉报表
  $scope.makeComplainChart = function (data) {
    var ech = document.getElementById('complaintChart');
    complainCharts = echarts.init(ech);
    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['投诉数', '已处理', '未处理'],
        x: '3%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        borderColor: '#51585F',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['A单车', 'B单车', 'C单车', 'D单车'],
        axisLine: {
          lineStyle: {
            color: '#51585F'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#51585F'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }

      }],
      series: [{
        name: '投诉数',
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#DB0D4A'
          }
        },

        barWidth: '15%',
        data: data[0]
      },
        {
          name: '已处理',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#00D0AA'
            }
          },
          barWidth: '15%',
          data: data[1]
        },
        {
          name: '未处理',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#EBE400'
            }
          },
          barWidth: '15%',
          data: data[2]
        }
      ],
      animationEasing: 'circularOut',
      animationDuration: 2000,
      animationDelay: 700
    };

    complainCharts.setOption(option);
    window.addEventListener("resize", function () {
      complainCharts.resize();
    });

  };

  // 随机投诉报表数据
  function complainChartData() {
    var complaintData = [];
    var totalComplaint = [];
    var handleComplaint = [];
    var unHandleComplaint = [];
    for (var i = 0; i < 4; i++) {
      var totalComplaintNum = Math.round(20 + Math.random() * 30);
      var handelComplaintNum = Math.round(10 + Math.random() * 10);
      totalComplaint.push(totalComplaintNum);
      handleComplaint.push(handelComplaintNum);
      unHandleComplaint.push(totalComplaintNum - handelComplaintNum);
    }
    complaintData.push(totalComplaint);
    complaintData.push(handleComplaint);
    complaintData.push(unHandleComplaint);

    $scope.makeComplainChart(complaintData);
  }

  // 改变时间的同时改变报表的数据
  $scope.$watch('complaintTime', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      complainChartData();
    }
  }, true);

  // 车身广告投放报表
  $scope.makeAdStatChart = function (data) {
    var ech = document.getElementById('adStatChart');
    adStatChart = echarts.init(ech);
    var option = {
      title: {
        text: '广告投放统计',
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
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} : {b} <br/>数量 : {c}<br/> 占比  : {d}%"
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        top: '10%',
        data: ['A单车', 'B单车', 'C单车', 'D单车'],
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10
      },
      color: ["#DB0D4A", "#328DCB", "#00D0AA", "#EBE400"],
      series: [{
        name: '公司',
        type: 'pie',
        radius: ['30%', '80%'],
        center: ['50%', '60%'],
        data: data,
        label: {
          normal: {
            formatter: "数量 : {c}\n占比 : {d}%",
            position: "inner",
            show: true
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    adStatChart.setOption(option);
    window.addEventListener("resize", function () {
      adStatChart.resize();
    });

  };

  // 车身广告投放统计随机数据
  function adStatChartData() {
    var adStatData = [{
      value: Math.round(Math.random() * 200 + 500),
      name: "A单车"
    }, {value: Math.round(Math.random() * 270 + 450), name: "B单车"},
      {value: Math.round(Math.random() * 170 + 400), name: "C单车"}, {
        value: Math.round(Math.random() * 150 + 600),
        name: "D单车"
      }];
    $scope.makeAdStatChart(adStatData);
  }

  // 投诉报表日历工具事件
  $scope.complainTimeTool = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.complaintTimeOpened = true;
  };

  // 格式化时间
  Date.prototype.Format = function (fmt) {
    var obj = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), // 日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds() //秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in obj) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
      }
    }
    return fmt;
  };

  $scope.complaintTime = $scope.maxDate = new Date().Format("yyyy-MM-dd");

  // 初始化报表
  function init() {
    complainChartData();
    adStatChartData();
  }

  init();

}]);
