/**
 * Created by shuzhengxing on 2017/8/26.
 */
'use strict';

app.controller('dashboardIllegalMoving', ['$scope', function ($scope) {

  var plateNumArr = ["05511", "05512", "05513", "05514"];
  var orgName = ["A公司", "B公司", "C公司", "D公司"];

  var areaName = {
    '蜀山区': ['武警总队医院', '铜锣湾广场', '琥珀潭', '荷叶地', '肥西三河古镇', '琥珀山庄', '西园新村', '正在移动'],
    '瑶海区': ['生态公园', '中绿广场', '花冲公园', '长临古街', '瑶海公园', '包公园', '黄山虎林园', '合肥火车站', '正在移动'],
    '包河区': ['包公园', '赤阑桥', '清风阁', '合肥明珠广场', '斛兵塘', '徽园', '安徽省图书馆', '三国遗址公园', '正在移动'],
    '滨湖区': ['塘西河公园', '金斗公园', '滨湖世纪城', '合肥市滨湖医院', '天山大厦', '万达大鼓', '滨湖时代广场', '正在移动'],
    '政务区': ['万达广成', '华邦世贸城', '国际丽晶城', '翠庭园', '山水名城', '天鹅湖体育公园', '合肥广电中心','兴园小区', '正在移动'],
    '庐阳区': ['月潭庵', '官亭林海', '庐阳环城公园', '百花大厦', '百花井', '琥珀流光', '巢湖紫微洞', '庐阳杏花公园',  '正在移动']
  };

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

  // 设置随机号码
  function getRandomPhoneNum() {
    var numArr = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
    return numArr[getRandomIndex(numArr)] + '****' + getRandomNum(4);
  }

  var result = ['已处理', '已处理', '未处理'];

  function getDetails() {
    var index = getRandomIndex(orgName);
    var name = Object.keys(areaName)[getRandomIndex(Object.keys(areaName))];
    var details ={};
    details.plantNumber = plateNumArr[index] + getRandomNum(5);
    details.operationName = orgName[index];
    details.areaName = name;
    details.startPoint = areaName[name][Math.floor(Math.random() * (areaName[name].length - 1))];
    details.endPoint = areaName[name][getRandomIndex(areaName[name])];
    details.lastUser = getRandomPhoneNum();
    details.date = new Date();
    details.result = details.endPoint == "正在移动" ? "未处理" : result[getRandomIndex(result)];

    return details;
  }

  var detailsList = [];

  // 初始化非法移动报警明细数据
  function setDetailsList() {
    for (var j = 0; j < 30; j++)
      detailsList.push(getDetails());
    $scope.tableSource = detailsList;
  }

  setDetailsList();
  tableScrollFun();
  
  $scope.setColor = function (text) {
    if (text == "正在移动")
      return {"color": 'red'};
  };

  var map;

  // 展示地图
  function initMap() {
    map = new BMap.Map('mapChart');
    map.enableScrollWheelZoom();
    map.centerAndZoom(new BMap.Point(117.282827, 31.859858), 14); // 用城市名设置地图中心点
    map.setMapStyle({
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
    });
  }

  initMap();

  // 初始化移动结束路线数据
  var endLineRoute = [
    {startX: 117.262722, startY: 31.860933, endX: 117.282991, endY: 31.860067},
    {startX: 117.280783, startY: 31.876970, endX: 117.297487, endY: 31.871327}
  ];


  // 初始化正在移动路线数据
  var movingLineRoute = [
    {startX: 117.233735, startY: 31.847015, endX: 117.254225, endY: 31.846915},
    {startX: 117.24991, startY: 31.857286, endX: 117.258932, endY: 31.882818}
  ];

  var yellowStart = new BMap.Icon("img/yellowstart.png", new BMap.Size(15, 15), { // 黄色移动结束起点图标
    imageSize: new BMap.Size(15, 15),
    imageOffset: new BMap.Size(0, 0)
  });

  var yellowBike = new BMap.Icon("img/yellowbike.gif", new BMap.Size(70, 70), { // 黄色移动单车图标
    imageSize: new BMap.Size(50, 50),
    imageOffset: new BMap.Size(10, 10)
  });

  var redStart = new BMap.Icon("img/redstart.png", new BMap.Size(15, 15), { // 红色移动起点图标
    imageSize: new BMap.Size(15, 15),
    imageOffset: new BMap.Size(0, 0)
  });

  var redBike = new BMap.Icon("img/redbike.png", new BMap.Size(70, 70), { // 红色移动结束单车图标
    imageSize: new BMap.Size(50, 50),
    imageOffset: new BMap.Size(10, 10)
  });

  // 展现所有移动结束路线
  for (var i = 0; i < endLineRoute.length; i++)
    setDrivingRoute(new BMap.Point(endLineRoute[i].startX, endLineRoute[i].startY), new BMap.Point(endLineRoute[i].endX, endLineRoute[i].endY), getLine);

  var z = 0;
  setDrivingRoute(new BMap.Point(movingLineRoute[z].startX, movingLineRoute[z].startY), new BMap.Point(movingLineRoute[z].endX, movingLineRoute[z].endY), getMovingLine);
  function showMovingLine() {
    z = z + 1;
    if (z < movingLineRoute.length)
      setDrivingRoute(new BMap.Point(movingLineRoute[z].startX, movingLineRoute[z].startY), new BMap.Point(movingLineRoute[z].endX, movingLineRoute[z].endY), getMovingLine);
  }

  // 展现正在移动路线
  setInterval(function () {
    if (z < movingLineRoute.length)
      showMovingLine();
  }, 15000);


  // 添加线
  function addLine(pointList, color) {
    var line = new BMap.Polyline(pointList, {strokeColor: color, strokeWeight: 2});
    map.addOverlay(line);
    return line;
  }

  // 添加标签
  function addMarker(point, img) {
    var mk = new BMap.Marker(point, {icon: img});
    map.addOverlay(mk);
    return mk;
  }

  // 设置驾车实例
  function setDrivingRoute(start, end, fun) {
    var driving = new BMap.DrivingRoute(map, {onSearchComplete: fun});
    driving.search(start, end);
  }

  // 生成移动结束路线
  function getLine(results) {
    var pointList = results.getPlan(0).getRoute(0).getPath();
    addLine(pointList, 'red');
    addMarker(pointList[0], redStart);
    addMarker(pointList[pointList.length - 1], redBike);
  }

  // 生成正在移动路线
  function getMovingLine(results) {
    var pts = results.getPlan(0).getRoute(0).getPath();
    var startMarker = addMarker(pts[0], yellowStart); // 添加移动路线起点
    var bikeMk = addMarker(pts[0], yellowBike); // 添加移动单车图标

    var line = null;
    var pointList = [];

    // 移动的路线
    function resetMkPoint(i) {
      if (i < pts.length) {
        bikeMk.setPosition(pts[i]);
        map.removeOverlay(line);    // 清除之前的路线
        pointList.push(pts[i]);
        line = addLine(pointList, 'yellow');
        setTimeout(function () {
          i++;
          resetMkPoint(i);
        }, 1000);       // 1000为移动速度
      } else {
        line.setStrokeColor('red');
        startMarker.setIcon(redStart);
        bikeMk.setIcon(redBike);     // 修改图片为红色单车图标
      }
    }

    resetMkPoint(0);
  }

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

  // 初始化日历工具
  $scope.timeTool = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.createTimeOpened = true;
  };

  // 初始化数据
  var dateSource = {
    cate: ['蜀山区', '庐阳区', '高新区', '政务区', '包河区', '新站区', '瑶海区', '滨湖区', '经开区'],
    date: [32, 42, 34, 48, 32, 30, 32, 35, 40]
  };

  // 区域非法移动柱状图
  function illegalMovingNumDashboard() {
    var barOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        x: 50,
        y: 85,
        x2: 100,
        y2: 25,
        containLabel: true
      },
      xAxis: [
        {
          name: '行政区名',
          type: 'category',
          data: dateSource.cate,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#ffffff',
            align: 'center'
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          }
        }
      ],
      yAxis: [
        {
          name: '非法移动数',
          type: 'value',
          max: 60,
          min: 0,
          splitNumber: 4,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          nameTextStyle: {
            color: '#fff'
          },
          axisTick: {
            show: false  // 隐藏y轴坐标出头
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'    // y坐标的文字颜色
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [{
        name: '非法移动数',
        type: 'bar',
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = ['#ee1d1e', '#ff5d00', '#ffd600', '#9be800', '#0de730', '#0eee89', '#19d6dd', '#1383ee', '#df00c7'];
              return colorList[params.dataIndex];
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#ffffff'
            }
          }
        },
        barWidth: '32%',
        data: dateSource.date
      }]
    };

    var myBarChart = echarts.init(document.getElementById('option1'));
    myBarChart.setOption(barOption);

    window.addEventListener("resize",function(){
      myBarChart.resize();
    });

    // 当日期改变改变报表数据
    function change() {
      var value = [];
      for (var i = 0; i < dateSource.date.length; i++)
        value.push(parseInt(Math.random() * 40 + 10, 10));
      barOption.series[0].data = value;

      myBarChart.setOption(barOption);
    }

    // 日期添加监听事件
    $scope.$watch('date', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal != null) {
        change();
      }
    }, true);

  }

  illegalMovingNumDashboard();

  // 报警统计报表
  function alarmStatDashboard() {
    var interval = 10000;

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        x: 50,
        y: 60,
        x2: 100,
        y2: 30,
        containLabel: true
      },
      xAxis: [
        {
          name: "时间",
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(29, 53, 89,0.9)']
            }
          },
          splitLine: {
            show: true,
            color: 'rgba{255,255,255,0.1}'
          },
          axisTick: false,
          data: (function () {
            var now = new Date();
            var res = [];
            var len = 8;
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
          name: '次数',
          type: 'value',
          max: 5,
          min: 0,
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          axisTick: false,
          splitLine: {
            show: false
          }
        }
      ],
      series: [{
        name: '警报统计',
        type: 'line',
        smooth: true,
        stack: '总量',
        itemStyle: {
          normal: {
            color: 'rgb(44, 49, 59)',
            borderColor: 'rgb(65, 241, 152)',
            borderWidth: 1
          }

        },
        lineStyle: {
          normal: {
            color: 'rgb(65, 241, 152)'
          }
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(65, 241, 152)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgb(45, 216, 151)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
        data: [0, 1, 3, 2, 0, 1, 1, 2]
      }]
    };

    var myChart = echarts.init(document.getElementById('option2'));
    myChart.setOption(option);
    window.addEventListener("resize",function(){
      myChart.resize();
    });
    setInterval(function () {
      $scope.$apply(function () {
        option.series[0].data.shift();
        option.series[0].data.push(parseInt(Math.random() * 3));
      });

      // 设置x轴动态改变
      var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      myChart.setOption(option);

    }, interval);
  }

  alarmStatDashboard();

}]);
