app.controller('bikeLiveController', ['$scope', '$http', 'toaster', '$timeout', '$state', '$interval', 'Fullscreen', '$filter', function ($scope, $http, toaster, $timeout, $state, $interval, Fullscreen, $filter) {
    var map;

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    $scope.mapStyles = [
        { value: 'normal', title: '默认地图样式', desc: '百度地图官网采用的地图样式。' },
        { value: 'light', title: '清新蓝风格', desc: '地图背景及道路均呈蓝色，给人以清新的感觉。' },
        { value: 'dark', title: '黑夜风格', desc: '地图背景及道路均呈黑灰色，给人以寂静的感觉。' },
        { value: 'redalert', title: '红色警戒风格', desc: '地图呈大红色，红色警戒,给人高度惊醒的感觉。' },
        { value: 'googlelite', title: '精简风格', desc: '地图用色与google类似，不过过滤了一部分地图元素。' },
        { value: 'grassgreen', title: '自然绿风格', desc: '陆地呈草绿色，海洋呈蓝色，道路为白色，整幅地图自然气息十足。' },
        { value: 'midnight', title: '午夜蓝风格', desc: '地图背景呈深蓝色，水系为黑色，整体呈暗色风格。' },
        { value: 'pink', title: '浪漫粉风格', desc: '地图为粉色、道路灰色，整体颜色柔和。' },
        { value: 'darkgreen', title: '青春绿风格', desc: '地图背景为绿色、水系为黑色，标注为白色，地图用色浓重，时尚大气。' },
        { value: 'bluish', title: '清新蓝绿风格', desc: '地图背景以蓝色为主色调，水系为白色，清新典雅。' },
        { value: 'grayscale', title: '高端灰风格', desc: '地图整体成灰白色，使用该类地图便于突出其上叠加的个人信息。' },
        { value: 'hardedge', title: '强边界风格', desc: '地图整体成白色，使用强烈的黑色边框,给人以强烈的轮廓感。' }
    ];

    function init() {
        $http.get('maps/region').success(function(result){
            $scope.region = result;
            // 获取"市"数据
            $http.get('json/city.json').success(function(data){
                $scope.totalCitys = data;
                $scope.cityId = $scope.region[1];
                angular.forEach($scope.totalCitys, function (item) {
                    if (item.CityID == $scope.cityId) {
                        $scope.cityName = item.name;
                    }
                });
                map = new BMap.Map('allmap');
                initMap();
            });
        });
    }

    init();

    //加载地图
    function initMap() {
        map.enableScrollWheelZoom();
        map.centerAndZoom($scope.cityName, 15); // 用城市名设置地图中心点

        $timeout(function () { // 获取地图中心经纬度，必须要加延迟处理
            var mapCenter = map.getCenter();
            map.centerAndZoom(new BMap.Point(mapCenter.lng, mapCenter.lat), 15); // 编辑时候是否要缩小范围

            addRunningBikes();  // 加载运行单车
        }, 1000);
    }

    // 加载运动单车
    function addRunningBikes() {
        $http.get('bike-positions/active-bikes').success(function(result){
            if (result.status == 'SUCCESS'){
                if (null != result.data && "" != result.data) {
                    $scope.res = result.data;
                    for (var i = 0; i < $scope.res.length; i ++) {
                        if (null != $scope.res[i]){
                            var startP = new BMap.Point($scope.res[i].startLon, $scope.res[i].startLat);
                            var endP = new BMap.Point($scope.res[i].endLon, $scope.res[i].endLat);
                            var driving = new BMap.DrivingRoute($scope.cityName, { onSearchComplete: startLushu });
                            driving.search(startP, endP);
                        }
                    }
                }
            }
        }).error(function () {
            $scope.pop('error', '', "服务器异常");
        });
    }

    function startLushu(res) {
        var plan = res.getPlan(0);
        var arrPois = [];
        for (var j = 0; j < plan.getNumRoutes(); j++) {
            var route = plan.getRoute(j);
            arrPois = arrPois.concat(route.getPath());
        }

        var iconNum = GetRandomNum(1, 3);
        var icon;
        switch (iconNum) {
            case 1:
                icon = 'img/ofo.png';
                break;
            case 2:
                icon = 'img/mobike.png';
                break;
            case 3:
                icon = 'img/kuqi.png';
                break;
        }
        var speed = GetRandomNum(10, 15);

        var lushu = new BMapLib.LuShu(map, arrPois, {
            defaultContent: "",
            autoView: false, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
            icon: new BMap.Icon(icon, new BMap.Size(22, 16), {anchor: new BMap.Size(11, 8)}),
            speed: speed,
            enableRotation: true, // 是否设置marker随着道路的走向进行旋转
            landmarkPois: []
        });
        lushu.start();
    }

    // 获取随机数
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }

    $scope.onChangeMapStyle = function (){
        map.setMapStyle({style:$scope.mapStyle.value});
    };

    $scope.fullscreen = function(){
        $scope.isFullscreen = true;
    };

}]);