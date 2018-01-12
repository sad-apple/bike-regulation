/**
 * Created by shuzhengxing on 2017/8/16.
 * 电子围栏与禁停区域设定报表
 * 对应数据库表格--fence_area
 */
'use strict';

app.controller('dashBoardArea', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

  var map;

  // 展示电子围栏与禁停区域地图分布
  function showMap() {
    var myOption = {
      bmap: {
        center: [117.273053, 31.866436],
        zoom: 18,
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
                "color": "#313131"
              }
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": {
                "color": "#8b8787"
              }
            },
            {
              "featureType": "manmade",
              "elementType": "geometry",
              "stylers": {
                "color": "#1b1b1b"
              }
            },
            {
              "featureType": "local",
              "elementType": "geometry",
              "stylers": {
                "lightness": -75,
                "saturation": -91
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
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        silent: true,
        lineStyle: {
          normal: {
            opacity: 0,
            width: 1
          }
        },
        progressiveThreshold: 500,
        progressive: 200
      }, {
        type: 'lines',
        coordinateSystem: 'bmap',
        polyline: true,
        lineStyle: {
          normal: {
            width: 0
          }
        },
        effect: {
          constantSpeed: 5,
          show: true,
          trailLength: 0.1,
          symbolSize: 1.5
        }
      }]
    };

    var myChart = echarts.init(document.getElementById("mapChart"));
    myChart.setOption(myOption);
    map = myChart.getModel().getComponent('bmap').getBMap();
  }

  showMap();

  var styleOptions;

  // 设置覆盖物样式
  function getStyleOptions(color) {
    return styleOptions = {
      strokeColor: color,
      fillColor: color,
      strokeWeight: 3,
      strokeOpacity: 0.8,
      fillOpacity: 0.6,
      strokeStyle: 'solid'
    };
  }

  // 初始化电子围栏与停车区域
  var allowedArea = {
    count: 0,
    area: 6840
  };
  var forbiddenArea = {
    count: 0,
    area: 0
  };

  // 计算电子围栏与禁停区域的数量
  function countNum(color) {
    if ('Green' == color) {
      allowedArea.count += 1;
    } else {
      forbiddenArea.count += 1;
    }
  }

  var centerPoint = [
    [117.273641, 31.865309],
    [117.275874, 31.868533],
    [117.273628, 31.868065],
    [117.273933, 31.864489],
    [117.282256, 31.868456],
    [117.277293, 31.863929],
    [117.26738, 31.865807],
    [117.28858, 31.862403],
    [117.292676, 31.869775],
    [117.281043, 31.854839],
    [117.308963, 31.879533],
    [117.282885, 31.864991]
  ];

  // 显示电子围栏与禁停区域
  function showOverlays() {
    $http.get('json/area.json').success(function (data) {
      var overlays = data;
      var shape;
      for (var i = 0; i < overlays.length; i++) {
        var color = (overlays[i].isAllowed == 1) ? "Green" : "Red";
        countNum(color);
        styleOptions = getStyleOptions(color);
        var myIcon = new BMap.Icon("img/p1.png", new BMap.Size(70, 70), {
          imageSize: new BMap.Size(30, 30),
          imageOffset: new BMap.Size(10, 10)
        });
        if (overlays[i].type == 0) { // 圆
          shape = new BMap.Marker(JSON.parse(overlays[i].point_string), {icon: myIcon});
        } else {
          shape = new BMap.Polygon(JSON.parse(overlays[i].point_string), styleOptions);
          setLabel(new BMap.Point(centerPoint[i][0], centerPoint[i][1]), getPolyArea(shape));
        }
        map.addOverlay(shape);
      }
    }).error(function (err) {
      alert("dashBoardArea: " + err.error);
    });
  }

  showOverlays();

  // 初始化电子围栏、禁停区域面积
  $scope.allowedArea = allowedArea;
  $scope.forbiddenArea = forbiddenArea;

  // 数字显示样式
  function formatNum(n) {
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) {
      return b;
    }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
  }

  // 添加显示类别与区域面积标签
  function setLabel(point, text) {
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-20, -10)
    };
    var label = new BMap.Label(text, opts);
    label.setStyle({
      color: "#FFF",
      backgroundColor: 'transparent',//文本背景色
      borderColor: 'transparent',//文本框边框色
      fontSize: "12px",
      height: "20px",
      lineHeight: "20px",
      fontFamily: "微软雅黑"
    });
    map.addOverlay(label);
  }

  // 计算多边形覆盖物的面积
  function getPolyArea(polygon) {
    var totalArea = Math.round(BMapLib.GeoUtils.getPolygonArea(polygon));
    // 判断类型，并返回该类型面积
    if (polygon.getFillColor() == "Red") {  // 禁停区域
      forbiddenArea.area += totalArea;
    } else {
      allowedArea.area += totalArea;
    }

    return formatNum(totalArea) + "m²";
  }

  $scope.date1 = $scope.date2 = formatDate("YYYY-MM-DD", new Date());
  $scope.maxDate = new Date();

  //初始化日历工具事件
  $scope.timeTool1 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.createTimeOpened1 = true;
  };

  // 时间戳转化日期过滤器
  app.filter('formatTime', function () {
    return function (time) {
      var date = new Date(time);
      return formatDate('YYYY-MM-DD', date);
    }
  });

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

  // 初始化数据
  var dateSource = {
    cate: ['蜀山区', '庐阳区', '高新区', '政务区', '包河区', '新站区', '瑶海区', '滨湖区', '经开区'],
    date: {
      '高峰': [80, 120, 140, 99, 120, 76, 135, 89, 100],
      '低峰': [51, 110, 100, 89, 90, 70, 115, 80, 75]
    }
  };

  var fbAreaNumber = {
    "蜀山区": 280,
    "庐阳区": 240,
    "高新区": 240,
    "政务区": 260,
    "包河区": 200,
    "新站区": 220,
    "瑶海区": 200,
    "滨湖区": 210,
    "经开区": 250
  };
  var fbArea = {
    "蜀山区": 3000,
    "庐阳区": 2800,
    "高新区": 2900,
    "政务区": 3000,
    "包河区": 2800,
    "新站区": 3000,
    "瑶海区": 2400,
    "滨湖区": 2600,
    "经开区": 2700
  };
  var parkingAreaNumber = {
    "蜀山区": 300,
    "庐阳区": 290,
    "高新区": 210,
    "政务区": 220,
    "包河区": 240,
    "新站区": 200,
    "瑶海区": 250,
    "滨湖区": 240,
    "经开区": 280
  };
  var parkingArea = {
    "蜀山区": 3500,
    "庐阳区": 3400,
    "高新区": 2800,
    "政务区": 2600,
    "包河区": 2700,
    "新站区": 2500,
    "瑶海区": 2800,
    "滨湖区": 2900,
    "经开区": 3200
  };

  var needs = ['是', '否'];

  function getDetails() {
    var details = {};
    var name = dateSource.cate[parseInt(Math.random() * dateSource.cate.length)];
    details.areaName = name;
    details.date = new Date();
    details.hotTimeBikeNum = parseInt(Math.random() * 2000 + 3000);
    details.lowTimeBikeNum = parseInt(Math.random() * 1000 + 2000);
    details.forbiddenAreaNum = fbAreaNumber[name];
    details.forbiddenArea = fbArea[name];
    details.parkedAreaNum = parkingAreaNumber[name];
    details.parkedArea = parkingArea[name];
    details.hotNumToAreaNum = parseInt(details.hotTimeBikeNum / details.parkedAreaNum * 100) + '%';
    details.hotNumToArea = parseInt(details.hotTimeBikeNum / details.parkedArea * 100) + '%';
    details.lowNumToAreaNum = parseInt(details.lowTimeBikeNum / details.parkedAreaNum * 100) + '%';
    details.lowNumToArea = parseInt(details.lowTimeBikeNum / details.parkedArea * 100) + '%';
    details.need = needs[parseInt(Math.random() * needs.length)];

    return details;
  }

  var source = [];
  // 初始化显示10条数据
  function getRechargeDetailsData() {
    for (var i = 0; i < 40; i++)
      source.push(getDetails());
    $scope.tableSource = source;
  }

  getRechargeDetailsData();
  tableScrollFun();
  // 车辆数与停车区数量比例报表
  function barNumDashboard() {
    var numOption = {
      title: {
        text: '车辆数和虚拟车桩数量比例',
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
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        top: '12%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        data: Object.keys(dateSource.date)
      },
      grid: {
        x: 50,
        y: 50,
        x2: 100,
        y2: 20,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: '行政区名',
        nameTextStyle: {
          color: '#ffffff'
        },
        axisLine: {
          lineStyle: {
            color: '#757779',
            type: 'solid'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ffffff'    // y坐标的文字颜色
          }
        },
        splitLine: {
          show: false
        },
        axisTick: false,
        data: dateSource.cate
      }],
      yAxis: [{
        name: '百分比',
        type: 'value',
        max: 160,
        min: 0,
        splitNumber: 10,
        nameTextStyle: {
          color: '#ffffff'
        },
        axisLine: {
          lineStyle: {
            color: '#757779',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#ffffff'    // y坐标的文字颜色
          },
          formatter: function (value) {
            return value + '%';
          }
        },
        axisTick: {
          show: false  // 隐藏y轴坐标出头
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        name: '高峰',
        type: 'bar',
        barGap: '15%',
        barCategoryGap: '55%',
        itemStyle: {
          normal: {
            color: '#ED00E6'
          }
        },
        markLine: {
          silent: true,
          symbolSize: [2, 4],
          itemStyle: {
            normal: {
              label: {
                show: true,
                textStyle: {
                  color: '#ffffff'
                },
                formatter: function () {
                  return '警戒线';
                }
              },
              lineStyle: {
                color: '#ffffff',
                width: 1
              }
            }
          },
          data: [{yAxis: 100}]
        },
        data: dateSource.date['高峰']
      }, {
        name: '低峰',
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#00C891'
          }
        },
        data: dateSource.date['低峰']
      }]
    };
    var myNumChart = echarts.init(document.getElementById('option1'));
    myNumChart.setOption(numOption);

    window.addEventListener("resize",function(){
      myNumChart.resize();
    });

    // 日期添加监听事件
    $scope.$watch('date1', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal != null) {
        change(myNumChart, numOption);
      }
    }, true);
  }

  barNumDashboard();

  $scope.timeTool2 = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.createTimeOpened2 = true;
  };

  // 车辆数与停车区域面积比例报表
  function barAreaDashboard() {
    var areaOption = {
      title: {
        text: '车辆数和虚拟车桩面积比例',
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        top: '12%',
        textStyle: {
          color: '#DCDCDC'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,
        data: Object.keys(dateSource.date)
      },
      grid: {
        x: 50,
        y: 50,
        x2: 100,
        y2: 20,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: '行政区名',
        nameTextStyle: {
          color: '#ffffff'
        },
        axisLine: {
          lineStyle: {
            color: '#757779',
            type: 'solid'
          }
        },
        axisLabel: {
          interval: 0,
          rotate: 30,               // 刻度标签旋转的角度
          textStyle: {
            color: '#ffffff'    // y坐标的文字颜色
          }
        },
        splitLine: {
          show: false
        },
        axisTick: false,
        data: dateSource.cate
      }],
      yAxis: [{
        name: '百分比',
        max: 140,
        min: 0,
        splitNumber: 9,
        type: 'value',
        nameTextStyle: {
          color: '#ffffff'
        },
        axisLine: {
          lineStyle: {
            color: '#757779',
            type: 'solid'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#ffffff'    // y坐标的文字颜色
          },
          formatter: function (value) {
            return value + '%';
          }
        },
        axisTick: {
          show: false  // 隐藏y轴坐标出头
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        name: '高峰',
        type: 'bar',
        barGap: '15%',
        barCategoryGap: '55%',
        itemStyle: {
          normal: {
            color: '#1EA8FF'
          }
        },
        data: [60, 100, 140, 75, 110, 70, 112, 100, 122],
        markLine: {
          silent: true,
          symbolSize: [2, 4],
          itemStyle: {
            normal: {
              label: {
                show: true,
                textStyle: {
                  color: '#ffffff'
                },
                formatter: function () {
                  return '警戒线';
                }
              },
              lineStyle: {
                color: '#ffffff',
                width: 1
              }
            }
          },
          data: [{yAxis: 100}]
        }
      }, {
        name: '低峰',
        type: 'bar',
        data: dateSource.date['低峰'],
        itemStyle: {
          normal: {
            color: '#FFF900'
          }
        }
      }]
    };

    var myAreaChart = echarts.init(document.getElementById('option2'));
    myAreaChart.setOption(areaOption);

    window.addEventListener("resize",function(){
      myAreaChart.resize();
    });

    // 日期添加监听事件
    $scope.$watch('date2', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal != null) {
        change(myAreaChart, areaOption);
      }
    }, true);
  }

  barAreaDashboard();

  // 当时间改变时报表数据改变
  function change(myChart, option) {
    var hotValue = [];
    var lowValue = [];
    for (var i = 0; i < dateSource.cate.length; i++) {
      hotValue.push(parseInt(Math.random() * 90 + 50, 10));
      lowValue.push(parseInt(Math.random() * 80 + 40, 10))
    }
    option.series[0].data = hotValue;
    option.series[1].data = lowValue;

    myChart.setOption(option);
  }

}]);