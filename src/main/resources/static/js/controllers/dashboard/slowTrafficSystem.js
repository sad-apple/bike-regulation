/**
 * Created by lihao on 2017/8/16.
 */

'use strict';

app.controller('slowTrafficSystem', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    var map;
    var heatmapOverlay;
    var interval = 2000;
    var firstInterval;

    $scope.allPosition;

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    function initBaiduMap() {
        map = new BMap.Map("allmap", {
            enableMapClick: false
        });
        map.setMapStyle({style: 'dark'});
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
        map.enableScrollWheelZoom();
        map.centerAndZoom(new BMap.Point(117.282827, 31.859858), 13);

        loadInactiveBikeHeatMap();
    }

    initBaiduMap();

    //ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.pagingOptions = {
        pageSizes: [20, 30, 40],
        pageSize: '20',
        currentPage: 1
    };

    // 时间戳转化日期过滤器
    app.filter('formatTime1', function () {
        return function (createTime) {
            var date = new Date(createTime);
            return formatDate('YYYY-MM-DD  hh:mm', date);
        }
    });

    // 日期格式化方法
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

    $scope.getPagedDataAsync = function (pageSize, page) {
        // var url = 'slow-traffic-system?page=' + page + '&size=' + pageSize;
        $http.get('json/slowTrafficSystem.json').success(function (pagedata) {
            $scope.codes = pagedata;

            for (var i = 0; i < $scope.codes.length; i++) {
                $scope.codes[i].bikeAmount = Math.round(Math.random() * 100 + 200);
                $scope.codes[i].createTime = new Date();
                $scope.codes[i].order = i + 1;
            }
        }).error(function (err) {
            alert("slowTrafficSystem: " + err.error);
        });
    };

    // 排序方法
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    var pointIcon = new BMap.Icon("img/crossing.png", new BMap.Size(40, 50));
    pointIcon.setImageSize(new BMap.Size(26, 26));
    var backMarker;

    //添加鼠标悬停事件
    function addMouseOverHandle(marker, point) {
        marker.addEventListener("mouseover", function (e) {
            if (backMarker != null){
                map.removeOverlay(backMarker);
            }
            addOverlays(point);
        });
    }

    var intervalFunc;
    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        $interval.cancel(intervalFunc);
    });

    intervalFunc = $interval(function () {
        var point = {};
        if (backMarker != null){
            angular.forEach($scope.allPosition, function (data) {
                if (backMarker.point.lng == data.lon && backMarker.point.lat == data.lat) {
                    point = data;
                }
            });
            map.removeOverlay(backMarker);
            addOverlays(point);
        }
    },interval);

    // 添加提示框覆盖物
    function addOverlays(positionI) {
        var point = new BMap.Point(positionI.lon, positionI.lat);
        // 添加背景框
        var myIcon = new BMap.Icon('img/ifwindow2.png', new BMap.Size(340, 130));
        var opts = {
            offset: new BMap.Size(27, -90), // 设置偏移量
            icon: myIcon
        };
        backMarker = new BMap.Marker(point, opts);
        map.addOverlay(backMarker);

        // 添加单个点信息
        var styles = {
            color: "white",
            fontSize: "16px",
            height: "25px",
            lineHeight: "25px",
            fontFamily: "微软雅黑",
            backgroundColor: '#9E3329',
            borderColor: '#9E3329'
        };

        var label1 = new BMap.Label('地点:' + positionI.place, {offset: new BMap.Size(0, 5)}); // 创建文本标注对象
        label1.setStyle(styles);
        backMarker.setLabel(label1);

        var label2 = new BMap.Label('路口过车量:' + positionI.bikeAmount, {offset: new BMap.Size(0, 32)});
        label2.setStyle(styles);
        backMarker.setLabel(label2);

        var label3 = new BMap.Label('慢性通道:' + positionI.slowChannel, {offset: new BMap.Size(0, 59)});
        label3.setStyle(styles);
        backMarker.setLabel(label3);

        var label4 = new BMap.Label('过车设施:' + positionI.slowFacility, {offset: new BMap.Size(0, 86)});
        label4.setStyle(styles);
        backMarker.setLabel(label4);
    }

    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    // 加载热力图
    function loadInactiveBikeHeatMap() {
        if (!isSupportCanvas()) {
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
            return;
        }

        $http.get('json/heatMap.json').success(function (data) {
            $scope.result = data;
            var points = new Array($scope.result.length);
            for (var i = 0; i < $scope.result.length; i++) {
                points[i] = {"lng": $scope.result[i].lon, "lat": $scope.result[i].lat, "count": 90};
            }

            heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
            map.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({data: points, max: 100});
        }).error(function (err) {
            alert("slowTrafficSystem: " + err.error);
        });
    }
    tableScrollFun();
}]);

