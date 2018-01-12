function loadPanorama() {
    var scope = angular.element(document.getElementById("allmap")).scope();
    scope.$apply(function () {
        scope.loadPanorama();
    });
}

function refreshPosition() {
    var scope = angular.element(document.getElementById("allmap")).scope();
    scope.$apply(function () {
        scope.getLastPosition();
    });
}

app.controller('carMonitorController', ['$scope', '$http', '$timeout', 'toaster', '$state', '$interval', 'Fullscreen', 'toaster', '$filter', function ($scope, $http, $timeout, toaster, $state, $interval, Fullscreen, toaster, $filter) {

    $scope.lastPosition = {};
    $scope.showPanorama = false;
    $scope.isCollapsed = false;
    $scope.simCardNum = 1064892131102;

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

    var map;

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
        initTrack('init'); // 初始化单车轨迹
    }

    initBaiduMap();

    // 初始化单车轨迹
    function initTrack(type) {
        var simCardNum = (type == 'init') ? $scope.simCardNum : $scope.lastPosition.simCardNum;

        $http.get('gps-datas/new-position/' + simCardNum).success(function (result) {
            if (result.status == 'SUCCESS') {
                if (result.data == null || result.data == '') {
                    $scope.pop('error', '', '未查询到单车信息');
                    return;
                }
                $scope.lastPosition = result.data;
            } else {
                $scope.pop('error', '', result.error);
            }
        }).error(function () {
            $scope.pop('error', '', "服务器异常");
        });
    }

    $scope.getLastPosition = function (type) {
        initTrack(type);
    };

    function getWindowContent() {
        return "<div>sim卡号:" + $scope.lastPosition.simCardNum + "</div>" +
            "<div>经度:" + $scope.lastPosition.lon + "</div>" +
            "<div>纬度:" + $scope.lastPosition.lat + "</div>" +
            "<div>速度:" + $scope.lastPosition.speed + "</div>" +
            "<div>方向:" + $scope.lastPosition.direction + "</div>" +
            // "<div>里程:" + $scope.lastPosition.distance + "</div>" +
            "<div>服务器时间:" + $filter('date')($scope.lastPosition.receiveTime, 'yyyy-MM-dd HH:mm:ss') + "</div>" +
            "<div onclick='test()'>gps时间:" + $filter('date')($scope.lastPosition.time, 'yyyy-MM-dd HH:mm:ss') + "</div>" +
            "<div><a class='text-info-dker' onclick='loadPanorama()'>街景</a>&nbsp;|&nbsp;<a class='text-info-dker' href='#/access/positionReview?simCardNum=" + $scope.lastPosition.simCardNum + "' target='_blank'>跟踪</a>&nbsp;|&nbsp; <a class='text-info-dker' href='#/access/carTrack?simCardNum=" + $scope.lastPosition.simCardNum + "' target='_blank'>回放</a>&nbsp;|&nbsp;<a class='text-info-dker' onclick='refreshPosition()'>刷新位置</a></div>";
    }

    var carIcon = new BMap.Icon("img/bike.jpg", new BMap.Size(30, 20));
    var car;

    function addCar() {
        if (car != null) {
            map.removeOverlay(car);
        }
        var position = new BMap.Point($scope.lastPosition.lon, $scope.lastPosition.lat);
        car = new BMap.Marker(position, {icon: carIcon, rotation: $scope.lastPosition.direction});  // 创建标注
        map.addOverlay(car);
        var opts = {
            width: 0,     // 信息窗口宽度
            height: 0,     // 信息窗口高度
            title: "", // 信息窗口标题
            enableMessage: true,//设置允许信息窗发送短息
            message: ""
        };
        var infoWindow = new BMap.InfoWindow(getWindowContent(), opts);
        car.openInfoWindow(infoWindow);
        car.addEventListener("click", function () {
            car.openInfoWindow(infoWindow);
        });
        map.centerAndZoom(car.getPosition(), 15);
    }

    var interval;

    $scope.$watch('lastPosition', function (newValue, oldValue) {
        if (newValue != null && newValue !== oldValue) {
            addCar();
            if ($scope.lastPosition != null && interval == null) {
                interval = $interval($scope.getLastPosition, 2000000000);
            }
        }
    }, true);

    $scope.$on('$destroy', function () {
        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
        }
    });

    $scope.loadPanorama = function () {
        $scope.showPanorama = true;
        var panorama = new BMap.Panorama('allmap');
        panorama.setPov({heading: -40, pitch: 6});
        panorama.setPosition(car.getPosition());
        $scope.showPanorama = true;
    };

    $scope.fullscreen = function () {
        $scope.isFullscreen = true;
    };

    $scope.exitPanorama = function () {
        $scope.showPanorama = false;
        panorama = null;
        
        initBaiduMap();
        initRegion();
        addCar();
    };

    $scope.displayFrame = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
        var mapDiv = document.getElementById("allmap");
        if ($scope.isCollapsed) {
            mapDiv.style.height = '69vh'; //展开
        } else {
            mapDiv.style.height = '58vh';  //收起
        }
    };

    // 区域限制
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
}]);