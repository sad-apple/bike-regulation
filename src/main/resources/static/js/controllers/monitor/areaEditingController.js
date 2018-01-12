/**
 * Created by shuzhengxing on 2017/8/8.
 */
app.controller('areaEditingController', ['$scope', '$http', '$timeout', 'toaster', '$state', '$interval', '$filter', function ($scope, $http, $timeout, toaster) {
    var map;

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    // 初始化
    init();

    function init() {
        $http.get('maps/region').success(function(result){
            $scope.region = result;
            //获取"市"数据
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

    //加载地图
    function initMap() {
        map.enableScrollWheelZoom();
        map.centerAndZoom($scope.cityName, 15); // 用城市名设置地图中心点
    }

    $scope.overlays = [];

    var drawingManager;

    function getStyleOptions(color) {
        return styleOptions = {
            strokeColor: color,
            fillColor: color,
            strokeWeight: 3,
            strokeOpacity: 0.8,
            fillOpacity: 0.6,
            strokeStyle: 'solid'
        };
    }

    $scope.createDrawingManager = function (color) {
        var styleOptions = getStyleOptions(color);

        // 设置地图工具样式并添加监听事件
        drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false,
            enableDrawingTool: true,
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(5, 5),
                drawingModes: [
                    BMAP_DRAWING_CIRCLE,
                    BMAP_DRAWING_POLYGON,
                    BMAP_DRAWING_RECTANGLE
                ]
            },
            circleOptions: styleOptions,
            polygonOptions: styleOptions,
            rectangleOptions: styleOptions
        });

        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    };

    var overlaycomplete = function (e) {
        $scope.overlays.push(e.overlay);
    };

    var type;
    var radius;
    var point_string;

    //设置区域保存的数据
    $scope.setArea = function (overlay) {
        if (overlay.toString() == '[object Circle]') {
            type = 0;
            radius = overlay.getRadius();
            point_string = JSON.stringify(overlay.getCenter());
        } else if (overlay.toString() == '[object Polygon]'){   // 避免除圆形，多边形其他情况
            type = 1;
            radius = null;
            point_string = JSON.stringify(overlay.getPath());
        }
    };

    $scope.save = function () {
        clearBoundary();
        var isAllowed;

        for (var i = 0; i < $scope.overlays.length; i++) {
            $scope.setArea($scope.overlays[i]);

            isAllowed = ($scope.overlays[i].getFillColor() == "Green") ? 1 : 0;

            var Overlay = {
                radius: radius,
                point_string: point_string,
                type: type,
                isAllowed: isAllowed
            };

            var once = true;
            $http.post('parking-area', Overlay).success(function (data) {
                if (data.status == "ERROR") {
                    $scope.pop('error', '', data.error);
                }else {
                    if(once){   //保证只运行一次，避免颜色加深
                        $scope.showOverlays();
                        $scope.pop('success', '', '添加成功！');
                        once = false;
                    }
                }
            }).error(function (err) {
                alert(err.error);
            });
        }
        $scope.overlays.length = 0;
    };

    // 添加禁停(红色)区域
    $scope.setRed = function () {
        getRegion();
        getBoundary();
        $scope.createDrawingManager("Red");
        // $scope.showOverlays();   //点击添加显示其他区域
    };

    // 添加停车(绿色)区域
    $scope.setGreen = function () {
        getRegion();
        getBoundary();
        $scope.createDrawingManager("Green");
        // $scope.showOverlays();
    };

    // 设置操作开始为隐藏状态
    $scope.visible = false;

    // 显示所有区域
    $scope.showOverlays = function () {
        getRegion();
        getBoundary();

        $scope.hideOverlays();        //防止颜色重复显示加深

        $scope.visible = true;      //设置操作为显示状态

        $http.get('parking-area').success(function (data) {
            if (data.status == "ERROR") {
                $scope.pop('error', '', data.error);
            } else {
                var overlays = data.data;
                var shape;
                for (var i = 0; i < overlays.length; i++) {
                    var color = (overlays[i].isAllowed == 1) ? "Green" : "Red";
                    var styleOptions = getStyleOptions(color);
                    if (overlays[i].type == 0) { // 圆
                        shape = new BMap.Circle(JSON.parse(overlays[i].point_string), overlays[i].radius, styleOptions);
                    } else {
                        shape = new BMap.Polygon(JSON.parse(overlays[i].point_string), styleOptions);
                    }
                    shape.id = overlays[i].id;
                    $scope.addEvent(shape);
                    map.addOverlay(shape);
                }
            }
        }).error(function (err) {
            alert(err.error);
        });
    };

    //绑定单击删除事件
    $scope.addEvent = function (shape) {
        getRegion();
        getBoundary();
        shape.removeEventListener('click', deleteArea); // 防止绑定多次事件
        shape.addEventListener('click', deleteArea);
    };

    var deleteArea = function () {
        var deleteOverlay = this;
        Showbo.Msg.confirm("是否删除？",function (btn) {
            if(btn == "yes"){
                $http.delete('parking-area/' + deleteOverlay.id).success(function (data) {
                    if (data.status == "ERROR") {
                        $scope.pop('error', '', data.error);
                    } else {
                        map.removeOverlay(deleteOverlay);
                        $scope.pop('success', '', '删除成功！');
                    }
                }).error(function (err) {
                    alert(err.error);
                });
            }
        });
    };

    //取消
    $scope.clean = function () {
        map.removeOverlay($scope.overlays[$scope.overlays.length - 1]);
        $scope.overlays.pop();
    };

    //隐藏
    $scope.hideOverlays = function () {
        $scope.visible = false;

        var overlays = map.getOverlays();
        for(var i = 0; i < overlays.length; i++){
            if(overlays[i].toString() == '[object Circle]' || overlays[i].toString() == '[object Polygon]')
                map.removeOverlay(overlays[i]);
        }
    };

    //编辑区域
    $scope.editArea = function () {
        getRegion();
        getBoundary();
        var overlays = map.getOverlays();
        for(var i = 0; i < overlays.length; i++){
            if(overlays[i].toString() == '[object Circle]' || overlays[i].toString() == '[object Polygon]')
                overlays[i].enableEditing();
        }
    };

    //结束编辑
    $scope.endEdit = function () {
        clearBoundary();

        var overlays = map.getOverlays();

        var id;
        var isAllowed;
        var lastId;

        for (var i = 0; i < overlays.length; i++) {
            $scope.setArea(overlays[i]);
            if(overlays[i].toString() == '[object Circle]' || overlays[i].toString() == '[object Polygon]'){    // 避免除了圆形和多边形其他情况
                id = overlays[i].id;
                isAllowed = (overlays[i].getFillColor() == "Red") ? 0 : 1;
                overlays[i].disableEditing();
            }

            var Overlay = {
                id: id,
                radius: radius,
                point_string: point_string,
                type: type,
                isAllowed: isAllowed
            };

            $http.put('parking-area/' + Overlay.id, Overlay).success(function (data) {
                if (data.status == "ERROR") {
                    $scope.pop('error', '', data.error);
                }
            })
        }
        $scope.pop('success', '', '修改成功！');
    };

    // 区域限制
    function getRegion() {
        $http.get('maps/region').success(function (result) {
            $scope.region = result;
            //获取所有城市对象
            $http.get('json/city.json').success(function (data) {
                $scope.totalCitys = data;
                $scope.cityId = $scope.region[1];
                for (var i = 0; i < $scope.totalCitys.length; i++) {
                    if ($scope.totalCitys[i].CityID == $scope.cityId) {
                        $scope.cityName = $scope.totalCitys[i].name;
                        map.enableScrollWheelZoom();
                        map.centerAndZoom($scope.cityName, 15); // 用城市名设置地图中心点
                        break;
                    }
                }
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

            map.centerAndZoom(new BMap.Point(mapCenter.lng, mapCenter.lat), 15); // 编辑时候是否要缩小范围

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

    //结束编辑释放区域限制
    function clearBoundary() {
        try {
            BMapLib.AreaRestriction.clearBounds();
        } catch (e) {
            alert(e);
        }
    }

    // 切换地图样式
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

    $scope.onChangeMapStyle = function (){
        map.setMapStyle({style:$scope.mapStyle.value});
    };

    $scope.fullscreen = function(){
        $scope.isFullscreen = true;
    };

}]);