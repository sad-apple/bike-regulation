app.controller('carTrackController', ['$scope', '$http', '$modal', 'toaster', '$state', '$localStorage', '$interval', '$location', '$filter', function ($scope, $http, $modal, toaster, $state, $localStorage, $interval, $location, $filter) {

    $scope.simCardNum = $location.search().simCardNum;
    $scope.maxValue = 0;
    $scope.today = new Date();
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.startDate = $scope.endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.startTime = $scope.endTime = new Date();
    var map = new BMap.Map("allmap", {
        enableMapClick: false
    });

    function init(){
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);
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
    }

    init();

    function stopInterval(){
        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
            $scope.playStatus = 'pause';
        }
    }

    function cleanOverLay(){
        map.clearOverlays();
        stopInterval();
        gpsDatas = [];
        points = undefined;
        points = [];
        index = 0;
        $scope.playStatus = 'unload';
    }

    var gpsDatas = [];
    $scope.initTrack = function(){
        if(!isDirtyData){
            return;
        }
        if($scope.startDate == null || $scope.endDate == null){
            $scope.pop('error', '', '开始日期和结束日期不可为空');
            return;
        }
        cleanOverLay();
        var beginTime = $filter('date')($scope.startDate, 'yyyy-MM-dd') + ' ' + $filter('date')($scope.startTime, 'HH:mm:ss');
        var endTime = $filter('date')($scope.endDate, 'yyyy-MM-dd') + ' ' + $filter('date')($scope.endTime, 'HH:mm:ss');
        $http.get('gpsDatas/' + $scope.simCardNum + '?beginTime=' + beginTime + '&endTime=' + endTime).success(function(result){
            isDirtyData = false;
            if(result.status == 'SUCCESS'){
                if(result.data.length != 0){
                    gpsDatas = result.data;
                    $scope.maxValue = gpsDatas.length;
                    for(var i in gpsDatas){
                        points.push(new BMap.Point(gpsDatas[i].lon, gpsDatas[i].lat));
                    }
                    addHistory();
                }else{
                    $scope.pop('error', '', '未查询到任何数据');
                }
            }else{
                $scope.pop('error', '', result.error);
            }
        });
    };

    function getWindowContent(){
        return "<div>sim卡号:"+gpsDatas[index].simCardNum+"</div>" +
            "<div>经度:"+gpsDatas[index].lon+"</div>" +
            "<div>纬度:"+gpsDatas[index].lat+"</div>" +
            "<div>速度:" +gpsDatas[index].speed+"</div>" +
            "<div>方向:"+gpsDatas[index].direction+"</div>" +
            "<div>里程:"+gpsDatas[index].distance+"</div>" +
            "<div>服务器时间:"+$filter('date')(gpsDatas[index].receiveTime, 'yyyy-MM-dd HH:mm:ss')+"</div>" +
            "<div>gps时间:"+$filter('date')(gpsDatas[index].time, 'yyyy-MM-dd HH:mm:ss')+"</div>";
    }
    var opts = {
        width : 0,     // 信息窗口宽度
        height: 0,     // 信息窗口高度
        title : "" , // 信息窗口标题
        enableMessage:true,//设置允许信息窗发送短息
        message:""
    };
    var index = 0;
    var infoWindow;
    var carIcon = new BMap.Icon("img/bike.jpg", new BMap.Size(30,20));
    var startIcon = new BMap.Icon("img/start.jpg", new BMap.Size(30,20));
    var endIcon = new BMap.Icon("img/end.jpg", new BMap.Size(30,20));
    var car;
    var points = [];
    function addHistory(){
        var start = new BMap.Marker(points[0], {icon:startIcon});
        var end = new BMap.Marker(points[points.length-1], {icon:endIcon});
        car = new BMap.Marker(points[0], {icon:carIcon, rotation:gpsDatas[0].direction});  // 创建标注
        infoWindow = new BMap.InfoWindow(getWindowContent(), opts);
        infoWindow.disableCloseOnClick();
        car.addEventListener("click", function(){
            car.openInfoWindow(infoWindow);
        });
        map.addOverlay(start);
        map.addOverlay(end);
        map.addOverlay(car);
        map.centerAndZoom(car.getPosition(), 11);
        car.openInfoWindow(infoWindow);
        var trail = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.4, strokeStyle:"solid"});    //创建折线
        map.addOverlay(trail);

        $scope.playStatus = 'stop';
    }

    $scope.playStatus = 'unload'; // unload play pause stop
    var interval;
    $scope.play = function(){
        if($scope.playStatus == 'play' || points.length == 0){
            return;
        }
        $scope.playStatus = 'play';
        interval = $interval(function() {
            index++;
            $scope.playSlider = parseInt((index / points.length) * 100);
            if (index >= points.length) {
                stopInterval();
                return;
            }
            car.setPosition(points[index]);
            car.setRotation(gpsDatas[index].direction);
            infoWindow.setContent(getWindowContent());
        },500);
    };

    $scope.stop = function(){
        if($scope.playStatus == 'stop'){
            return;
        }
        $scope.playStatus = 'stop';
        $interval.cancel(interval);
        index = 0;
        car.setPosition(points[index]);
        car.setRotation(gpsDatas[index].direction);
        infoWindow.setContent(getWindowContent());
    };

    $scope.pause = function(){
        if($scope.playStatus != 'play'){
            return;
        }
        $scope.playStatus = 'pause';
        $interval.cancel(interval);
    };

    var isDirtyData = false;
    $scope.$watch('startDate', function(newValue, oldValue){
        isDirtyData = true;
    }, true);

    $scope.$watch('endDate', function(newValue, oldValue){
        isDirtyData = true;
    }, true);
    $scope.$watch('startTime', function(newValue, oldValue){
        isDirtyData = true;
    }, true);

    $scope.$watch('endTime', function(newValue, oldValue){
        isDirtyData = true;
    }, true);

    $scope.$on('$destroy', function() {
        if (angular.isDefined(interval)) {
            $interval.cancel(interval);
            interval = undefined;
        }
    });

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

    $scope.startDateClick = function($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.showStartDate = true;
    };

    $scope.endDateClick = function($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.showEndDate = true;
    };

    $scope.sliderChanged = function () {
        if($scope.playStatus == 'unload'){
            return;
        }
        index = parseInt(gpsDatas.length * $scope.playSlider / 100);
    };
}]);