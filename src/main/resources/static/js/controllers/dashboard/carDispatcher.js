/**
 * Created by Administrator on 2017/8/18.
 */

app.controller('carDispatcherController', ['$scope', function ($scope) {

  var interval = 2000; // 时间间隔2秒
  var intervalfunc;
  /**
   * 车辆调度明细随机数据
   */
  function randomData() {
    $scope.bikeDispatchDtoData = [];
    var plateNumArr = ["05511", "05512", "05513", "05514"];
    var operationOrgNameArr = ["A公司", "B公司", "C公司", "D公司"];
    var areaArr = ["蜀山区", "包河区", "瑶海区", "庐阳区", "经开区", "高新区", "政务区"];
    var dispatcherAddressArr = [
      ["合肥工业大学翡翠湖校区", "安徽建筑工业大学南校区", "望江西路", "潜山路"],
      ["桐城南路", "中国科学技术大学东校区", "淝河路", "花园大道"],
      ["瑶海公园", "合肥市第十一中学", "郎溪路", "临泉东路"],
      ["红星路小学", "合肥市第三十六中学", "阜南路", "庐阳中学"],
      ["集贤路", "芙蓉路", "翡翠公园", "莲花路"],
      ["合肥创新产业园", "海川路", "毓秀路", "文曲路"],
      ["合肥银泰城", "水墨兰庭", "茗香路", "合肥大剧院"]
    ];
    var dispatcherStatusArr = ["未调度", "正在调度", "已调度"];

    for (var i = 0; i < 30; i++) {
      var PlateNumIndex = Math.round(Math.random() * (plateNumArr.length - 1));
      var areaIndex = Math.round(Math.random() * (areaArr.length - 1));
      var addressIndex = Math.round(Math.random() * 3);
      var plateNum = plateNumArr[PlateNumIndex] + Math.round(Math.random() * 90000 + 10000);
      var areaData = areaArr[areaIndex];
      var startAddressData = dispatcherAddressArr[areaIndex][addressIndex];
      var endAddressData = dispatcherAddressArr[areaIndex][3 - addressIndex]
      var operationOrgNameData = operationOrgNameArr[PlateNumIndex];
      var parkTimeData = (Math.random() * 5).toFixed(1) + "小时";
      var dispatcherStatusData = dispatcherStatusArr[Math.round(Math.random() * 2)];
      var bikeDispatcher = {
        bikeId: plateNum,
        area: areaData,
        productionTime: new Date(),
        operationOrg: operationOrgNameData,
        dispatcher: "*****",
        parkingTime: parkTimeData,
        startAddress: startAddressData,
        endAddress: endAddressData,
        dispatchStatus: dispatcherStatusData
      };
      $scope.bikeDispatchDtoData.push(bikeDispatcher);
    }
  }
  
  // 车辆调度明细
  $scope.gridOptions = {
    data: 'bikeDispatchDtoData',
    enablePaging: true,
    rowHeight: 41,
    headerRowHeight: 36,
    multiSelect: false,
    totalServerItems: 'totalServerItems',
    columnDefs: [
      {field: 'bikeId', displayName: '车辆编号', width: '200px'},
      {field: 'area', displayName: '区域', width: '200px'},
      {
        field: 'productionTime',
        displayName: '出厂日期',
        width: '200px',
        cellTemplate: '<div class="ngCellText ng-scope" >{{row.entity.productionTime| date:"yyyy-MM-dd"}}</div>'
      },
      {field: 'operationOrg', displayName: '运营方', width: '200px'},
      {field: 'dispatcher', displayName: '调度人员', width: '200px'},
      {field: 'parkingTime', displayName: '停车时长', width: '200px'},
      {field: 'startAddress', displayName: '始发地', width: '200px'},
      {field: 'endAddress', displayName: '目的地', width: '200px'},
      {field: 'dispatchStatus', displayName: '调度情况', width: '200px'}
    ]
  };

  // 需求空缺和可调度车辆统计
  function bikeDispatch() {
    var lineChart = echarts.init(document.getElementById('lineChart'));
    var data1 = [];
    var data2 = [];

    for (var i = 0; i < 9; i++) {
      var num1 = Math.round(Math.random() * 500 + 1500);
      var num2 = Math.round(Math.random() * 500 + 1500);
      data1.push(num1);
      data2.push(num2);
    }

    var option = {
      title: {
        text: '需求空缺和可调度车辆统计',
        subtext: '——————————',
        itemGap: 0,
        padding: [0, 0, 30,0],
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
        trigger: 'axis', //触发类型。[ default: 'item' ] :数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用;'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      legend: {
        right: 'center',
        y: '8%',
        orient: 'horizontal',
        textStyle: {
          color: '#fff'

        },
        data: ['需求空缺', '可调度车辆']

      },
      xAxis: {
        type: 'category',
        name:'时间',
        data: (function () {
          var now = new Date();
          var res = [];
          for (var i = 0; i < 9; i++) {
            res.unshift(now.Format("HH:mm:ss"));
            now = new Date(now - interval);
          }
          return res;
        })(),
        boundaryGap: false,
        splitArea: {
          show: false,
          areaStyle: {
            color: ['rgba(36, 63, 86,0.9)']
          }
        },
        splitLine: {
          show: false,
          interval: 'auto',
          lineStyle: {
            color: ['rgba(34,43,58,1)']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        type: 'value',
        name:'车辆数量',
        max: 3000,
        min: 0,
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#D4DFF5']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      series: [{
        name: '需求空缺',
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'rect',
        symbolSize: 15,
        data: data1,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(230, 189, 0,1)'
            }, {
              offset: 1,
              color: 'rgba(230, 189, 0,0.2)'
            }], false)
          }
        },
        itemStyle: {
          normal: {
            color: '#f7b851'
          }
        },
        lineStyle: {
          normal: {
            width: 3
          }
        }
      }, {
        name: '可调度车辆',
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 15,
        data: data2,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(3, 204, 109,.8)'
            }, {
              offset: 1,
              color: 'rgba(3, 204, 109,.5)'
            }], false)
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(3, 204, 109,1)'
          }
        },
        lineStyle: {
          normal: {
            width: 3
          }
        }
      }]
    };

    lineChart.setOption(option);
    window.addEventListener("resize",function(){
      lineChart.resize();
    });
    intervalfunc = setInterval(function () {
      data1 = option.series[0].data;
      data2 = option.series[1].data;
      data1.shift();
      data1.push(Math.round(Math.random() * 500 + 1500));
      data2.shift();
      data2.push(Math.round(Math.random() * 500 + 1500));
      option.xAxis.data.shift();
      option.xAxis.data.push((new Date()).Format("HH:mm:ss"));
      lineChart.setOption(option);
    }, interval);
  }

  // 格式化时间
  Date.prototype.Format = function (fmt) {
    var obj = {
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds() //秒
    };
    for (var k in obj) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
      }
    }
    return fmt;
  };

    // 离开页面后停止轮询
  $scope.$on('$destroy', function () {
      clearInterval(intervalfunc);
  });

  // 车辆区域调度
  function bikeMapDispatcher() {
    var blue = "#00FFFF";
    var symbolSize = 25;
    var mapChart = echarts.init(document.getElementById('mapChart'));
    var allData = {
      "redPlaces": [{
        "name": "中国科学技术大学车辆停放点", // 中国科学技术大学东区黄金广场31.8372583692,117.2521287762   117.273641,31.847251
        "value": [117.2738518410, 31.8465412082, 20],
        "symbolSize": 60,
        "label": {
          "normal": {
            "formatter": "需求\n10辆"
          }
        }
      },
        {
          "name": "合肥科技馆车辆停放点",
          "value": [117.2556673903, 31.8472287438, 20],
          "symbolSize": 60,
          "label": {
            "normal": {
              "formatter": "需求\n12辆"
            }
          }
        }],
      "greenPlaces": [
        {
          "name": "兴都大厦",
          "value": [117.2792806320, 31.8485098902, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "3辆"
            }
          }
        },
        {
          "name": "合肥学院",
          "value": [117.2697481142, 31.8457855544, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "2辆"
            }
          }
        },
        {
          "name": "金水花园",
          "value": [117.2819458309, 31.8435135715, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "3辆"
            }
          }
        },
        {
          "name": "美第阳光大厦",
          "value": [117.2712286936, 31.8420120926, 20],
          "symbolSize": 10,
          "label": {
            "normal": {
              "formatter": "1辆"
            }
          }
        },
        {
          "name": "中国科学技术大学学生宿舍",
          "value": [117.2766413383, 31.8423667344, 20],
          "symbolSize": 10,
          "label": {
            "normal": {
              "formatter": "1辆"
            }
          }
        },
        {
          "name": "摩尔广场",
          "value": [117.2523249441, 31.8517400335, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "4辆"
            }
          }
        },
        {
          "name": "安徽大学",
          "value": [117.2614869105, 31.8511264708, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "3辆"
            }
          }
        },
        {
          "name": "中国科技大学西校区",
          "value": [117.2616156565, 31.8446553550, 20],
          "symbolSize": symbolSize,
          "label": {
            "normal": {
              "formatter": "3辆"
            }
          }
        },
        {
          "name": "绿城百合公寓",
          "value": [117.2524916548, 31.8441662806, 20],
          "symbolSize": 10,
          "label": {
            "normal": {
              "formatter": "1辆"
            }
          }
        },
        {
          "name": "黄山路",
          "value": [117.2498550189, 31.8480749040, 20],
          "symbolSize": 10,
          "label": {
            "normal": {
              "formatter": "1辆"
            }
          }
        }],
      "line1": [
        {
          "coords": [
            [117.2792806320, 31.8485098902],  // 起点 兴都大厦
            [117.2779931717, 31.8475802401]
          ]
        }, {
          "coords": [
            [117.2697481142, 31.8457855544], // 起点 合肥学院
            [117.2718777351, 31.8461766329]
          ]
        }, {
          "coords": [
            [117.2819458309, 31.8435135715], // 起点 金水花园
            [117.2791733437, 31.8439344629]
          ]
        }, {
          "coords": [
            [117.2712286936, 31.8420120926], // 起点 美第阳光大厦
            [117.2719421082, 31.8436792531]
          ]
        }, {
          "coords": [
            [117.2766413383, 31.8423667344], // 起点 中国科学技术大学学生宿舍
            [117.2756542854, 31.8437703995]
          ]
        }],
      "line2": [
        {
          "coords": [
            [117.2523249441, 31.8517400335], // 起点 摩尔广场
            [117.2536074538, 31.8501635089]
          ]
        }, {
          "coords": [
            [117.2614869105, 31.8511264708], // 起点 安徽大学
            [117.2598301787, 31.8499083156]
          ]
        }, {
          "coords": [
            [117.2616156565, 31.8446553550], // 起点 中国科技大学西校区
            [117.2589933295, 31.8458068985]
          ]
        }, {
          "coords": [
            [117.2524916548, 31.8441662806], // 起点 绿城百合公寓
            [117.2541868109, 31.8456792959]
          ]
        }, {
          "coords": [
            [117.2498550189, 31.8480749040], // 起点 黄山路
            [117.2521912474, 31.8477938300]
          ]
        }
      ]
    };

    var option = {
      backgroundColor: '#00040C',
      legend: {
        show: true,
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['需求地点', '调度地点'],
        textStyle: {
          color: '#ffffff'
        }
      },
      bmap: {
        center: [117.2653230000, 31.8465830000],
        zoom: 16,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              "featureType": "land",
              "elementType": "geometry",
              "stylers": {
                "color": "#212121"
              }
            },
            {
              "featureType": "building",
              "elementType": "geometry",
              "stylers": {
                "color": "#2b2b2b"
              }
            },
            {
              "featureType": "highway",
              "elementType": "all",
              "stylers": {
                "lightness": -42,
                "saturation": -91
              }
            },
            {
              "featureType": "arterial",
              "elementType": "geometry",
              "stylers": {
                "lightness": -77,
                "saturation": -94
              }
            },
            {
              "featureType": "green",
              "elementType": "geometry",
              "stylers": {
                "color": "#1b1b1b"
              }
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": {
                "color": "#181818"
              }
            },
            {
              "featureType": "subway",
              "elementType": "geometry.stroke",
              "stylers": {
                "color": "#181818"
              }
            },
            {
              "featureType": "railway",
              "elementType": "geometry",
              "stylers": {
                "lightness": -52
              }
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": {
                "color": "#313131",
              }
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": {
                "color": "#8b8787",
              }
            },
            {
              "featureType": "manmade",
              "elementType": "geometry",
              "stylers": {
                "color": "#1b1b1b",
              }
            },
            {
              "featureType": "local",
              "elementType": "geometry",
              "stylers": {
                "lightness": -75,
                "saturation": -91,

              }
            },
            {
              "featureType": "subway",
              "elementType": "geometry",
              "stylers": {
                "lightness": -65
              }
            },
            {
              "featureType": "railway",
              "elementType": "all",
              "stylers": {
                "lightness": -40
              }
            },
            {
              "featureType": "boundary",
              "elementType": "geometry",
              "stylers": {
                "color": "#8b8787",
                "weight": "1",
                "lightness": -29
              }
            }
          ]
        }
      },
      series: [{
        name: '需求地点',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        zlevel: 2,
        rippleEffect: {
          scale: 1.5,
          brushType: 'fill'
        },
        itemStyle: {
          normal: {
            color:"#ED1D09"
          }
        },
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        symbol: "image://img/bikeDispatcher4.png",
        showEffectOn: 'render',
        data: allData.redPlaces
      }, {
        name: '调度地点',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        zlevel: 2,
        rippleEffect: {
          scale: 2,
          brushType: 'fill'
        },
        itemStyle: {
          normal: {
            color:blue
          }
        },
        label: {
          normal: {
            show: true,
            position: 'right'
          }
        },
        showEffectOn: 'render',
        data: allData.greenPlaces
      }, {
        type: 'lines',
        coordinateSystem: 'bmap',
        zlevel: 1,
        effect: {
          show: true,
          period: 3,
          trailLength: 0.5,
          constantSpeed: 50,
          color: '#ED1B10',
          symbolSize: 10,
          symbol: 'triangle'
        },
        lineStyle: {
          normal: {
            color: "transparent",
            width: 0,
            curveness: 0.1
          }
        },
        data: allData.line1
      }, {
        type: 'lines',
        coordinateSystem: 'bmap',
        zlevel: 1,
        effect: {
          show: true,
          period: 3,
          trailLength: 0.5,
          constantSpeed: 30,
          color: '#ED1B10',
          symbolSize: 10,
          symbol: 'triangle'
        },
        lineStyle: {
          normal: {
            color: "transparent",
            width: 0,
            curveness: 0.1
          }
        },
        data: allData.line2
      }]
    };
    mapChart.setOption(option);
  }

  // 初始化数据
  function init() {
    bikeDispatch();
    bikeMapDispatcher();
    randomData();
    tableScrollFun();
  }

  init();

}]);

