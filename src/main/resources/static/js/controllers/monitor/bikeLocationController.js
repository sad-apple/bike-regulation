
app.controller('bikeLocationController', ['$scope', '$http', '$timeout', 'toaster', '$state', '$interval', 'Fullscreen', 'toaster', '$filter', function ($scope, $http, $timeout, toaster, $state, $interval, Fullscreen, toaster, $filter) {
  
    var map;
    var heatmapOverlay;
    var markerClusterer;
    var markers = [];

    $scope.flag = false;
    $scope.flag1 = false;
    
    // 切换地图样式
    $scope.mapStyles = [
        {value: 'normal', title: '默认地图样式', desc: '百度地图官网采用的地图样式。'},
        {value: 'light', title: '清新蓝风格', desc: '地图背景及道路均呈蓝色，给人以清新的感觉。'},
        {value: 'dark', title: '黑夜风格', desc: '地图背景及道路均呈黑灰色，给人以寂静的感觉。'},
        {value: 'redalert', title: '红色警戒风格', desc: '地图呈大红色，红色警戒,给人高度惊醒的感觉。'},
        {value: 'googlelite', title: '精简风格', desc: '地图用色与google类似，不过过滤了一部分地图元素。'},
        {value: 'grassgreen', title: '自然绿风格', desc: '陆地呈草绿色，海洋呈蓝色，道路为白色，整幅地图自然气息十足。'},
        {value: 'midnight', title: '午夜蓝风格', desc: '地图背景呈深蓝色，水系为黑色，整体呈暗色风格。'},
        {value: 'pink', title: '浪漫粉风格', desc: '地图为粉色、道路灰色，整体颜色柔和。'},
        {value: 'darkgreen', title: '青春绿风格', desc: '地图背景为绿色、水系为黑色，标注为白色，地图用色浓重，时尚大气。'},
        {value: 'bluish', title: '清新蓝绿风格', desc: '地图背景以蓝色为主色调，水系为白色，清新典雅。'},
        {value: 'grayscale', title: '高端灰风格', desc: '地图整体成灰白色，使用该类地图便于突出其上叠加的个人信息。'},
        {value: 'hardedge', title: '强边界风格', desc: '地图整体成白色，使用强烈的黑色边框,给人以强烈的轮廓感。'}
    ];

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.onChangeMapStyle = function () {
        map.setMapStyle({style: $scope.mapStyle.value});
    };

    $scope.fullscreen = function () {
        $scope.isFullscreen = true;
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    function initBaiduMap() {
        map = new BMap.Map("allmap", {
            enableMapClick: false
        });
        var navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        var ctrl = new BMapLib.TrafficControl({
            showPanel: false
        });
        map.addControl(ctrl);
        ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
        initRegion();
        getBoundary();
    }
    
    initBaiduMap();
    
    // 初始化区域限制
    function initRegion() {
        $http.get('maps/region').success(function (result) {
            $scope.region = result;
            //获取所有城市对象
            $http.get('json/city.json').success(function (data) {
                $scope.totalCitys = data;
                $scope.cityId = $scope.region[1];
                for (var i = 0; i < $scope.totalCitys.length; i++) {
                    if ($scope.totalCitys[i].CityID == $scope.cityId) {
                        $scope.cityName = $scope.totalCitys[i].name;
                        break;
                    }
                }
                map.enableScrollWheelZoom();
                map.centerAndZoom($scope.cityName, 15); // 用城市名设置地图中心点
            }).error(function (err) {
                alert(err.error);
            });
        }).error(function (err) {
            alert(err.error);
        });
    }

    // 编辑操作的区域限制
    function getBoundary() {
        $timeout(function () { // 获取地图中心经纬度，必须要加延迟处理
            var mapCenter = map.getCenter();

            map.centerAndZoom(new BMap.Point(mapCenter.lng, mapCenter.lat), 15);

            var cityBoundary = new BMap.Boundary();
            cityBoundary.get($scope.cityName, function (rs) {
                var str = rs.boundaries[0];
                var strs = str.split(";");
                var minLng = mapCenter.lng;
                var maxLng = mapCenter.lng;
                var minLat = mapCenter.lat;
                var maxLat = mapCenter.lat;

                for (var i = 0; i < strs.length; i++) {
                    var arr = strs[i].split(", ");

                    minLng = Math.min(minLng, arr[0]);
                    maxLng = Math.max(maxLng, arr[0]);
                    minLat = Math.min(minLat, arr[1]);
                    maxLat = Math.max(maxLat, arr[1]);
                }
                var bounds = new BMap.Bounds(new BMap.Point(minLng, minLat), new BMap.Point(maxLng, maxLat)); //设置地图可显示范围
                try {
                    BMapLib.AreaRestriction.setBounds(map, bounds);
                } catch (e) {
                    alert(e);
                }
            });
        }, 1000);
    }

    // 加载静态单车聚合点
    function loadInactiveBikeCongruent() {
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
        }).error(function () {
            $scope.pop('error', '', "服务器异常");
        });
    }

    // 加载静态单车热力图
    function loadInactiveBikeHeatMap() {
        if (!isSupportCanvas()) {
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
            return;
        }

        $http.get('bike-positions/inactive-bikes').success(function (data) {
            $scope.result = data.data;
            var points = new Array($scope.result.length);
            for (var i = 0; i < $scope.result.length; i++) {
                points[i] = {"lng": $scope.result[i].lon, "lat": $scope.result[i].lat, "count": 90};
            }

            heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
            map.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({data: points, max: 100});
            $scope.flag = true;
        }).error(function () {
            $scope.pop('error', '', "服务器异常");
        });
    };

    //显示热力图按钮
    $scope.showHeadMap = function(){
        if ($scope.flag == false) {
            loadInactiveBikeHeatMap();
        }
    };

    //隐藏热力图
    $scope.hideHeatMap = function(){
        heatmapOverlay.hide();
        $scope.flag = false;
    };

    //显示点聚合
    $scope.showCongruent = function(){
        if ($scope.flag1 == false) {
            loadInactiveBikeCongruent();
        }
    };

    //隐藏点聚合
    $scope.hideCongruent = function(){
        markerClusterer.removeMarkers(markers);
        $scope.flag1 = false;
    };

    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
    
}]);
