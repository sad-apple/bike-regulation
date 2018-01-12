<!-- 共享汽车首页 -->

'use strict';

app.controller('carhomePageCtrl', ["$scope", "$http", "$moment", "$interval", function ($scope, $http, $moment, $interval) {
    var myChart;
    var map;
    var markerClusterer;
    var markers = [];
    var heatmapOverlay;
    $scope.flag = false;
    $scope.flag1 = false;
    
    // 初始化数据
    function init() {
        $http.get('json/bikeLinesPoints.json').success(function (datas) {
            $scope.data = datas;
            initBikeLines(); // 单车沿路线运动图
        }).error(function (err) {
            alert(err.error);
        });

        // 获取地图样式的json数据
        $http.get('json/mapStyle.json').success(function (datas) {
            $scope.mapStyles = datas;
            $scope.mapStyle = $scope.mapStyles[7];
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    
    // 单车沿路线运动图
    function initBikeLines() {
        var hStep = 300 / ($scope.data.length);
        var bikeLines = [].concat.apply([], $scope.data.map(function (bikeLine, idx) {
            var points = [];
            for (var i = 0; i < bikeLine.length; i++) {
                var pt = [
                    bikeLine[i][0],
                    bikeLine[i][1]
                ];
                points.push(pt);
            }

            return {
                coords: points,
                lineStyle: {
                    normal: {
                        color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                    }
                }
            };
        }));

        myChart = echarts.init(document.getElementById("lineChart"), 'default');

        var lineOption = {
            bmap: {
                center: [117.282827, 31.859858],
                zoom: 14,
                roam: true,
                // cursorStyle: 'pointer',
                mapStyle : {
                    styleJson: $scope.mapStyle.style
                }
            },
            series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: bikeLines,
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
                data: bikeLines,
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
                },
                zlevel: 1
            }]
        };
        myChart.setOption(lineOption);

        map = myChart.getModel().getComponent('bmap').getBMap();
        heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
        map.addOverlay(heatmapOverlay);
    }

    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    // 加载静态单车热力图
    function loadInactiveBikeHeatMap() {
        if (!isSupportCanvas()) {
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~');
            return;
        }
        $http.get('bike-positions/inactive-bikes').success(function (data) {
            $scope.result = data.data;
            var points = new Array($scope.result.length);
            for (var i = 0; i < $scope.result.length; i++) {
                points[i] = {"lng": $scope.result[i].lon, "lat": $scope.result[i].lat, "count": 90};
            }
            heatmapOverlay.setDataSet({data: points, max: 100});
            heatmapOverlay.show();
            $scope.flag = true;
        }).error(function (err) {
            alert("carhomePageCtrl: " + err.error);
        });
    }

    // 加载静态单车聚合点
    function loadInactiveBikeCongruent() {
        markers = [];
        $http.get('bike-positions/inactive-bikes').success(function (result) {
            if (result.status == 'SUCCESS') {
                if (null != result.data && "" != result.data) {
                    $scope.result = result.data;
                    for (var i = 0; i < $scope.result.length; i++) {
                        var pt = new BMap.Point($scope.result[i].lon, $scope.result[i].lat);
                        markers.push(new BMap.Marker(pt));
                    }
                    markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
                }
            }
            $scope.flag1 = true;
        }).error(function (err) {
            alert("carhomePageCtrl: " + err.error);
        });
    }

    //隐藏热力图
    $scope.hideHeatMap = function(){
        if ($scope.flag){
            heatmapOverlay.hide();
        }
        $scope.flag = false;
    };

    //隐藏点聚合
    $scope.hideCongruent = function(){
        if ($scope.flag1){
            markerClusterer.removeMarkers(markers);
        }
        $scope.flag1 = false;
    };

    //地图样式切换
    $scope.onChangeMapStyle = function () {
        var option = myChart.getOption();
        option.bmap[0].mapStyle.styleJson = $scope.mapStyle.style;
        myChart.setOption(option);
    };

    $scope.change = function (num) {
        if (num == 1){
            $scope.hideHeatMap();
            $scope.hideCongruent();
        }else if (num == 2){
            $scope.hideHeatMap();
            $scope.hideCongruent();
            loadInactiveBikeCongruent()
        }else if (num == 3){
            $scope.hideHeatMap();
            $scope.hideCongruent();
            loadInactiveBikeHeatMap();
        }
    }

}]);
