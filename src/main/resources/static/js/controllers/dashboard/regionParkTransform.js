/**
 * Created by zhaochuanzhi on 2017/8/18.
 */

app.controller('regionReformController', ['$scope', function ($scope) {

  var mapRegionChart;

  function randomData() {
    var detailsList = [];
    var areaArr = ["蜀山区", "高新区", "庐阳区", "经开区", "瑶海区"];
    var majorRegionArr = [
      ["政务办公区", "中国科学技术大学", "安徽大学", "安徽新华学院"],
      ["前城大厦", "万达广场", "合肥市高新区管委会", "合家福超市"],
      ["庐阳中学", "畅园新村", "北环阳光花园", "安徽省化工研究院"],
      ["大润发", "合肥师范学院", "安徽建筑工业大学", "四方花苑"],
      ["普朗科技园", "市政大厦", "锦绣豪庭", "合肥市第十一中学"]
    ];
    var placeArr = [
      ["黄山路与西二环交岔口", "黄山路", "九龙路", "望江西路"],
      ["环湖东路与合欢路交口", "怀宁路与南二环路交口西北角", "天柱路", "长江西路"],
      ["蒙城路", "义界路口", "金灵路口", "利北路口"],
      ["固阳路口", "锦绣大道", "莲花路", "金寨南路"],
      ["淮南路口", "明宿路口", "明宿路口", "胜利路"]
    ];
    var isReformArr = ["是", "否"];
    for (var i = 0; i < 30; i++) {
      var areaIndex = Math.round(Math.random() * (areaArr.length - 1));
      var regionIndex = Math.round(Math.random() * 3);
      var bikeNumberData = Math.round(Math.random() * 100 + 358);
      var existParkFlagNum = Math.round(Math.random() * 5 + 5);
      var existParkRailNum = Math.round(Math.random() * 5 + 3);
      var newParkFlagNum = Math.round(Math.random() * 5 + 1);
      var newParkRailNum = Math.round(Math.random() * 5 + 1);
      var isReformData = isReformArr[Math.round(Math.random())];
      var regionReform = {
        region: areaArr[areaIndex],
        majorRegion: majorRegionArr[areaIndex][regionIndex],
        place: placeArr[areaIndex][regionIndex],
        date: new Date(),
        bikeNumber: bikeNumberData,
        existParkFlag: existParkFlagNum,
        existParkRail: existParkRailNum,
        newParkFlag: newParkFlagNum,
        newParkRail: newParkRailNum,
        isReform: isReformData
      };

      detailsList.push(regionReform);
    }
    $scope.tableSource = detailsList;
  }

  // 区域分布模块
  function makeRegionChart() {
    var regionChart = echarts.init(document.getElementById('regionChart'));
    var option = {
      title: {
        text: '区域分布',
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
        data: ['蜀山区', '庐阳区', '高新区', '政务区', '包河区', '新站区', '瑶海区', '滨湖区', '经开区']
      },
      grid: {
        x: 20,
        y: 80,
        x2: 65,
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
        data: ['蜀山区', '庐阳区', '高新区', '政务区', '包河区', '新站区', '瑶海区', '滨湖区', '经开区']
      }],
      yAxis: [{
        name: '区域数量',
        max: 50,
        min: 0,
        splitLine: {
          lineStyle: {
            color: '#3a424a',
            type: 'solid'  // 设置分割线为虚线
          }
        },
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
          }
        },
        axisTick: {
          show: false  // 隐藏y轴坐标出头
        }
      }],
      series: [{
        type: 'bar',
        barGap: '15%',
        barCategoryGap: '55%',
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = ['#ee1d1e', '#ff5d00', '#ffd600', '#9be800', '#0de730', '#0eee89', '#19d6dd', '#1383ee', '#df00c7'];
              return colorList[params.dataIndex];
            },
            borderColor: 'rgba(247,206,142,0)',
            borderWidth: 2,
            opacity: '1'
          }
        },
        label: {
          normal: {
            show: true,
            position: "top"
          }
        },
        data: [36, 30, 25, 40, 32, 27, 36, 35, 30]
      }]
    };

    regionChart.setOption(option);

    window.addEventListener("resize",function(){
      regionChart.resize();
    });
  }

  var unReformData = [
    {name: '天鹅湖万达广场', value: "已有停车标志：12<br/> 已有停车栏：7<br/> 区域停车辆：248"},
    {name: '上铁银欣花园', value: "已有停车标志：11<br/> 已有停车栏：3<br/> 区域停车辆：754"},
    {name: '前城大厦', value: "已有停车标志：3<br/> 已有停车栏：10<br/> 区域停车辆：425"},
    {name: '合肥植物园', value: "已有停车标志：8<br/> 已有停车栏：8<br/> 区域停车辆：500"},
    {name: '安徽新华学院', value: "已有停车标志：5<br/> 已有停车栏：4<br/> 区域停车辆：425"},
    {name: '合肥市宁溪路小学', value: "已有停车标志：4<br/> 已有停车栏：2<br/> 区域停车辆：200"}
  ];
  var reformData = [
    {name: '中国科学技术大学', value: "已有停车标志：9<br/> 已有停车栏：5<br/> 区域停车辆：159"},
    {name: '安徽医科大学', value: "已有停车标志：5<br/> 已有停车栏：7<br/> 区域停车辆：825"},
    {name: '安徽大学', value: "已有停车标志：7<br/> 已有停车栏：9<br/> 区域停车辆：458"},
    {name: '安徽省立医院', value: "已有停车标志：4<br/> 已有停车栏：4<br/> 区域停车辆：459"},
    {name: '合家福超市', value: "已有停车标志：11<br/> 已有停车栏：5<br/> 区域停车辆：256"},
    {name: '逍遥津公园', value: "已有停车标志：12<br/> 已有停车栏：6<br/> 区域停车辆：800"},
    {name: '合肥万达乐园', value: "已有停车标志：14<br/> 已有停车栏：5<br/> 区域停车辆：1245"},
    {name: '合肥市第二十九中学', value: "已有停车标志：5<br/> 已有停车栏：2<br/> 区域停车辆：321"}
  ];
  var geoCoordMap = {
    "中国科学技术大学": [117.2760735379, 31.8432697953],
    "安徽医科大学": [117.2691811756, 31.8556657639],
    "安徽大学": [117.2622808443, 31.8510353315],
    "安徽省立医院": [117.2566194637, 31.8204589544],
    "合家福超市": [117.2240, 31.8209],
    "天鹅湖万达广场": [117.2307, 31.8250],
    "上铁银欣花园": [117.2077, 31.8271],
    "前城大厦": [117.2189, 31.8303],
    "合肥植物园": [117.2093935301, 31.8786532895],
    "安徽新华学院": [117.1905653079, 31.8286926279],
    "逍遥津公园": [117.3031440301, 31.8727181778],
    "合肥万达乐园": [117.3131276705, 31.7008360342],
    "合肥市宁溪路小学": [117.2290478968, 31.8542395692],
    "合肥市第二十九中学": [117.3299335382, 31.8468878695]
  };

  // 格式化数据
  function convertData(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  }

  // 重点区域设施改造地图
  function mapRegionTransformChart() {
    mapRegionChart = echarts.init(document.getElementById("pointChart"));
    var pointOption = {
      legend: {
        show:false,
        data: ['需要改造', '不需要改造'],
        textStyle: {
          color: "#fff"
        },
        right: 'right'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return "区域名称：" + params.name + "<br/>" + params.value[2];
        }
      },
      bmap: {
        center: [117.2690182380, 31.8411538267],
        zoom: 14,
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
      series: [
        {
          name: '需要改造',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(reformData),
          symbolSize: 20,
          showEffectOn: 'render',
          rippleEffect: {
            period: 2,
            scale: 3.5,
            brushType: 'fill'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}区域',
              backgroundColor: "#fff",
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'red',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        },
        {
          name: '不需要改造',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: convertData(unReformData),
          symbolSize: 25,
          showEffectOn: 'render',
          rippleEffect: {
            period: 4,
            scale: 5,
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}区域',
              position: 'left',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: 'green',
              shadowBlur: 12,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }
      ]
    };
    mapRegionChart.setOption(pointOption);
    window.addEventListener("resize",function(){
      mapRegionChart.resize();
    });
    addOverlays();
  }

  // 添加背景框
  function addOverlays() {
    var backMarker = new BMap.Marker(new BMap.Point(116.417854, 39.921988)); // 添加信息窗口
    backMarker.hide();
    var baiduMap = mapRegionChart.getModel().getComponent('bmap').getBMap(); // 获取百度地图实例
    var point = new BMap.Point(117.2566194637, 31.8204589544);
    var myIcon = new BMap.Icon('img/ifwindow2.png', new BMap.Size(340, 130)); // 添加背景框
    var opts = {
      offset: new BMap.Size(35, -75), // 设置偏移量
      icon: myIcon
    };
    backMarker = new BMap.Marker(point, opts);
    baiduMap.addOverlay(backMarker);
    // 添加信息
    var styles = {
      color: "white",
      fontSize: "16px",
      height: "25px",
      lineHeight: "25px",
      fontFamily: "微软雅黑",
      backgroundColor: '#9E3329',
      borderColor: '#9E3329'
    };
    var label1 = new BMap.Label('区域名称:安徽省立医院区域', {offset: new BMap.Size(0, 5)}); // 创建文本标注对象
    label1.setStyle(styles);
    backMarker.setLabel(label1);
    var label2 = new BMap.Label('已有停车标志:6', {offset: new BMap.Size(0, 32)});
    label2.setStyle(styles);
    backMarker.setLabel(label2);
    var label3 = new BMap.Label('已有停车栏:4', {offset: new BMap.Size(0, 59)});
    label3.setStyle(styles);
    backMarker.setLabel(label3);
    var number = Math.round(Math.random() * 50 + 486);
    var label4 = new BMap.Label('区域车辆:' + number, {offset: new BMap.Size(0, 86)});
    label4.setStyle(styles);
    backMarker.setLabel(label4);
  }

  // 初始化数据
  function init() {
    mapRegionTransformChart();
    makeRegionChart();
    randomData();
    tableScrollFun();
  }

  init();

}]);
