app.controller('positionReviewController', ['$scope', '$http', '$modal', 'toaster', '$state', '$localStorage', 'toaster', '$interval', '$location', function ($scope, $http, $modal, toaster, $state, $localStorage, toaster, $interval, $location) {
    var simCardNum = $location.search().simCardNum;

    var map = new BMap.Map("allmap", {
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

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.lastPosition = null;
    function getLastPosition(){
        $http.get('gps-datas/new-position/' + simCardNum).success(function(result){
            if(result.status == 'SUCCESS'){
                $scope.lastPosition = result.data;
            }else{
                $scope.pop('error', '', result.error);
            }
        });
    }

    function init(){
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);
        getLastPosition();
    }

    init();

    var bikeIcon = new BMap.Icon("img/bike.jpg", new BMap.Size(30,20));
    var bike;
    function addCar(){
        if(bike != null){
            map.removeOverlay(bike);
        }
        var position = new BMap.Point($scope.lastPosition.lon, $scope.lastPosition.lat);
        bike = new BMap.Marker(position, {icon:bikeIcon, rotation:$scope.lastPosition.direction});  // 创建标注
        var opts = {
            width : 0,     // 信息窗口宽度
            height: 0,     // 信息窗口高度
            title : "" , // 信息窗口标题
            enableMessage:true,//设置允许信息窗发送短息
            message:""
        };
        var infoWindow = new BMap.InfoWindow(
            "<div>sim卡号:"+$scope.lastPosition.simCardNum+"</div>" +
            "<div>经度:"+$scope.lastPosition.lon+"</div>" +
            "<div>纬度:"+$scope.lastPosition.lat+"</div>" +
            "<div>速度:" + $scope.lastPosition.speed+"</div>" +
            "<div>方向:"+$scope.lastPosition.direction+"</div>" +
            // "<div>里程:"+$scope.lastPosition.distance+"</div>" +
            "<div>服务器时间:"+$scope.lastPosition.receiveTime+"</div>" +
            "<div onclick='test()'>gps时间:"+$scope.lastPosition.time+"</div>", opts);
        map.openInfoWindow(infoWindow, bike.getPosition());
        bike.addEventListener("click", function(){
            map.openInfoWindow(infoWindow, bike.getPosition());
        });
        map.addOverlay(bike);
        map.centerAndZoom(bike.getPosition(), 11);
    }

    $scope.$watch('lastPosition', function(newValue, oldValue){
        if(newValue != null && newValue !== oldValue)
            addCar();
    }, true);

    var interval = $interval(getLastPosition, 20000);

    $scope.$on('$destroy', function() {
        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
        }
    });
}]);