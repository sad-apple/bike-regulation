'use strict';

app.controller('dashBoardSecond', ['$scope', '$http', function ($scope, $http) {
    var lineOption;
    var myChart;

    // 初始化数据
    function init() {
        $http.get('json/bikeLinesPoints.json').success(function (datas) {
            $scope.data = datas;
            initBikeLines(); // 单车沿路线运动图
            init2();
        }).error(function (err) {
            alert("dashBoardSecond: " + err.error);
        });

        //获取地图样式的json数据
        $http.get('json/mapStyle.json').success(function (datas) {
            $scope.mapStyles = datas;
            $scope.mapStyle = $scope.mapStyles[0];
        }).error(function (err) {
            alert("dashBoardSecond: " + err.error);
        });
    }

    init();

    //地图样式切换
    $scope.onChangeMapStyle = function () {
        var option = myChart.getOption();
        option.bmap[0].mapStyle.styleJson = $scope.mapStyle.style;
        myChart.setOption(option);
    };

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

        var em = document.getElementById("lineChart");
        myChart = echarts.init(em, 'default');

        lineOption = {
            bmap: {
                center: [117.282827, 31.859858],
                zoom: 14,
                roam: true,
                // cursorStyle: 'pointer',
                mapStyle: {
                    styleJson: $scope.mapStyle
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
    }

    // 系统活跃度
    var systemChart = echarts.init(document.getElementById('systemChart'));
    var option = {
        backgroundColor: '#666',
        title: {
            x: 'center',
            y: 0,
            text: '系统活跃度',
            textStyle: {
                fontSize: 20,
                color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            y: '30',
            textStyle: {
                color: '#fff'
            },
            data: ['用户活跃度', '车辆活跃度']
        },

        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            name: '时间',
            splitNumber: 1,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255, 255, 255,1)' //横列样式
                }
            },
            axisTick: {
                show: false
            },
            boundaryGap: true,
            data: (function () {
                var now = new Date();
                var res = [];
                var len = 7;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }

        ],
        yAxis: [{
            type: 'value',
            scale: true,
            name: '数量/万',
            max: 6000,
            min: 0,
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255, 255, 255,1)' //横列样式
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {//基准样式
                lineStyle: {
                    color: 'rgba(255, 255, 255, .1)' //基准样式
                }
            },
            boundaryGap: [0.2, 0.2]
        }],
        series: [{
            name: '用户活跃度',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
                normal: {
                    color: 'rgb(27,188,156)',
                    borderColor: 'rgba(247,206,142,0)',
                    borderWidth: 2,
                    opacity: '1'
                }
            },
            data: [5154, 4428, 3456, 3200, 5147, 2223, 5115]
        },
            {
                name: '车辆活跃度',
                type: 'bar',
                barWidth: '20',
                barGap: '30%',
                barCategoryGap: '100',
                itemStyle: {
                    normal: {
                        color: 'rgb(52,152,220)',
                        borderColor: 'rgba(102,218,93,0)',
                        borderWidth: 0,
                        opacity: '1',
                        backgroundColor: 'rgba(21, 177, 211, 1)'
                    }
                },
                data: [2900, 5000, 3047, 4112, 4165, 5188, 5900]
            }
        ]
    };

    systemChart.setOption(option);

    setInterval(function () {
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(2000 + Math.random() * 2000));
        data1.shift();
        data1.push(Math.round(2000 + Math.random() * 2000));
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);

        systemChart.setOption(option);
    }, 2000);

}]);