function loadPanorama(){
    var scope = angular.element(document.getElementById("allmap")).scope();
    scope.$apply(function () {
        scope.loadPanorama();
    });
}

function refreshPosition(){
    var scope = angular.element(document.getElementById("allmap")).scope();
    scope.$apply(function () {
        scope.getLastPosition();
    });
}

app.controller('carMonitorController', ['$scope', '$http', 'toaster', '$state', '$interval', 'Fullscreen', 'toaster', '$filter', function ($scope, $http, toaster, $state, $interval, Fullscreen, toaster, $filter) {
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };
    $scope.lastPosition = {};
    $scope.showPanorama = false;
    var map;
    var navigationControl;
    var ctrl;
    function initBaiduMap(){
        map = new BMap.Map("allmap", {
            enableMapClick: false
        });
        navigationControl = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        ctrl = new BMapLib.TrafficControl({
            showPanel: false
        });
        map.addControl(ctrl);
        ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
    }
    initBaiduMap();

    $scope.getLastPosition = function(type){
        var simCardNum = type != 'init' ? $scope.lastPosition.simCardNum : $scope.simCardNum;
        $http.get('gpsDatas/newPosition/'+simCardNum).success(function(result){
            if(result.status == 'SUCCESS'){
                if(result.data == null || result.data == ''){
                    $scope.pop('error', '', '未查询到单车信息');
                    return;
                }
                $scope.lastPosition = result.data;
            }else{
                $scope.pop('error', '', result.error);
            }
        });
    };

    function init(){
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);
        //$scope.getLastPosition();
    }

    function getWindowContent(){
        return "<div>sim卡号:"+$scope.lastPosition.simCardNum+"</div>" +
            "<div>经度:"+$scope.lastPosition.lon+"</div>" +
            "<div>纬度:"+$scope.lastPosition.lat+"</div>" +
            "<div>速度:" + $scope.lastPosition.speed+"</div>" +
            "<div>方向:"+$scope.lastPosition.direction+"</div>" +
            "<div>里程:"+$scope.lastPosition.distance+"</div>" +
            "<div>服务器时间:"+$filter('date')($scope.lastPosition.receiveTime, 'yyyy-MM-dd HH:mm:ss')+"</div>" +
            "<div onclick='test()'>gps时间:"+$filter('date')($scope.lastPosition.time, 'yyyy-MM-dd HH:mm:ss')+"</div>" +
            "<div><a class='text-info-dker' onclick='loadPanorama()'>街景</a>&nbsp;|&nbsp;<a class='text-info-dker' href='#/access/positionReview?simCardNum="+$scope.lastPosition.simCardNum+"' target='_blank'>跟踪</a>&nbsp;|&nbsp; <a class='text-info-dker' href='#/access/carTrack?simCardNum="+$scope.lastPosition.simCardNum+"' target='_blank'>回放</a>&nbsp;|&nbsp;<a class='text-info-dker' onclick='refreshPosition()'>刷新位置</a></div>";
    }

    init();

    var carIcon = new BMap.Icon("img/bike.jpg", new BMap.Size(30,20));
    var car;
    function addCar(){
        if(car != null){
            map.removeOverlay(car);
        }
        var position = new BMap.Point($scope.lastPosition.lon, $scope.lastPosition.lat);
        car = new BMap.Marker(position, {icon:carIcon, rotation:$scope.lastPosition.direction});  // 创建标注
        map.addOverlay(car);
        var opts = {
            width : 0,     // 信息窗口宽度
            height: 0,     // 信息窗口高度
            title : "" , // 信息窗口标题
            enableMessage:true,//设置允许信息窗发送短息
            message:""
        };
        var infoWindow = new BMap.InfoWindow(getWindowContent(), opts);
        car.openInfoWindow(infoWindow);
        car.addEventListener("click", function(){
            car.openInfoWindow(infoWindow);
        });
        map.centerAndZoom(car.getPosition(), 15);
    }

    var interval;
    $scope.$watch('lastPosition', function(newValue, oldValue){
        if(newValue != null && newValue !== oldValue){
            addCar();
            if($scope.lastPosition != null && interval == null){
                interval = $interval($scope.getLastPosition, 20000);
            }
        }
    }, true);

    $scope.$on('$destroy', function() {
        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
        }
    });

    $scope.loadPanorama = function(){
        $scope.showPanorama = true;
        var panorama = new BMap.Panorama('allmap');
        panorama.setPov({heading: -40, pitch: 6});
        panorama.setPosition(car.getPosition());
        $scope.showPanorama = true;
    };

    $scope.fullscreen = function(){
        $scope.isFullscreen = true;
    };

    $scope.exitPanorama = function(){
        $scope.showPanorama = false;
        panorama = null;
        initBaiduMap();
        init();
        addCar();
    };
}]);