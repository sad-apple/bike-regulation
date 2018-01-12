'use strict';

app.controller('dashboard3Ctrl', ['$scope', '$http', 'toaster', '$timeout', '$state', 'Fullscreen', '$filter', function ($scope, $http, toaster, $timeout, $state, Fullscreen, $filter) {

    var myRiderChart;
    var myBikeChart;
    var myBikeTypeChart;
    var myAliveChart;
    var myBikeLocationChart;

    $scope.flag = false;
    $scope.theme = 'default';
    $scope.themes = ['default', 'dark', 'vintage', 'macarons', 'infographic', 'shine', 'roma'];

    $scope.stats = function () {
        $http.get('report-stats/dashboard').success(function (data) {
            var bikeTotals = data.data.bikeTotals;
            $scope.bikeTypeChart(bikeTotals);
            $scope.bikeChart(data);
            $scope.riderChart(data);
            $scope.aliveTypeChart();
            $scope.testChartConfig();
            $scope.tes1ChartConfig();
            $scope.getRunResult();
            $scope.bikeLocationChart();
        }).error(function (err) {
            alert("dashboard3Ctrl: " + err.error);
        });
    };

    function init() {
        $http.get("bike-types/collection").success(function (data) {
            $scope.bikeType = data.data[0];
            $scope.bikeTypes = data.data;
            $scope.stats();
        }).error(function (err) {
            alert("dashboard3Ctrl: " + err.error);
        });

        $http.get("bike-positions/inactive-bikes").success(function (data) {
            $scope.bikePositions = data.data;
        }).error(function (err) {
            alert("dashboard3Ctrl: " + err.error);
        });
    }

    init();

    //主题样式切换
    $scope.themeChange = function () {
        myRiderChart.dispose();
        myBikeChart.dispose();
        myBikeTypeChart.dispose();
        myAliveChart.dispose();
        myBikeLocationChart.dispose();
        $scope.stats();
    };

    // 骑行用户图表
    $scope.riderChart = function (data) {
        var riderResult = data.data.riderResult;
        var total = data.data.riderTotal;
        var categories = [];
        var totals = [];
        var increments = [];

        if (riderResult.length == 0) {
            totals = [total];
            var nowDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            categories.push(nowDate);
        }

        angular.forEach(riderResult, function (data) {
            categories.push(data[0]);
            increments.push(parseInt(data[1]));
            total += parseInt(data[1]);
            totals.push(total);
        });

        var ech = document.getElementById('riderChartConfig');
        myRiderChart = echarts.init(ech, $scope.theme);

        var riderChartConfig = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            },
            legend: {
                left: 'left',
                data: ['骑行用户总数', '骑行用户新增数']
            },
            xAxis: {
                type: 'category',
                name: '日期',
                splitLine: {show: false},
                data: categories
            },
            yAxis: {
                type: 'value',
                name: '骑行用户数量/(人)'
            },
            series: [
                {
                    name: '骑行用户总数',
                    type: 'line',
                    data: totals
                },
                {
                    name: '骑行用户新增数',
                    type: 'line',
                    data: increments
                }
            ]
        };

        myRiderChart.setOption(riderChartConfig);
    };

    // 单车投放量
    $scope.bikeChart = function (data) {
        var categories = [];
        var bikeData = [];

        var bikeTotals = data.data.bikeTotals;

        angular.forEach(bikeTotals, function (data) {
            categories.push(data[0]);
            bikeData.push(data[1]);
        });

        var ech = document.getElementById('bikeChartConfig');
        myBikeChart = echarts.init(ech, $scope.theme);

        var bikeChartConfig = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                left: 'left',
                data: ['单车总数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            xAxis: {
                type: 'category',
                data: categories
            },
            series: [
                {
                    name: '单车总数',
                    type: 'bar',
                    data: bikeData
                }
            ]
        };
        myBikeChart.setOption(bikeChartConfig);
    };

    // 单车占比
    $scope.bikeTypeChart = function (totalBike) {
        var categories = [];
        var bikeData = [];
        angular.forEach(totalBike, function (data) {
            categories.push(data[0]);
            bikeData.push({value: data[1], name: data[0]});
        });
        var ech = document.getElementById('bikeTypeChartConfig');
        myBikeTypeChart = echarts.init(ech, $scope.theme);

        var bikeTypeChart = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: categories
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: bikeData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myBikeTypeChart.setOption(bikeTypeChart);
    };

    // 活跃用户
    $scope.aliveTypeChart = function () {

        function randomData() {
            now = new Date(+now + oneDay);
            return {
                name: now.toString(),
                value: [
                    now,
                    null
                ]
            }
        }

        var data = [];
        var now = new Date();
        var oneDay = 2000;
        for (var i = 0; i < 19; i++) {
            data.push(randomData());
        }

        var em = document.getElementById('aliveChartConfig');
        myAliveChart = echarts.init(em, $scope.theme);

        var aliveChartConfig = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'left',
                data: ['小黄车', '摩拜单车', '酷奇单车']
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '小黄车',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }, {
                name: '摩拜单车',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }, {
                name: '酷奇单车',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        };

        myAliveChart.setOption(aliveChartConfig);

        setInterval(function () {
            $http.get('report-stats/alivebike').success(function (datasource) {
                var x = new Date(), // current time
                    y = datasource.data.total,
                    series = myAliveChart.getOption().series;
                for (var i = 0; i < y.length; i++) {
                    series[i].data.shift();
                    series[i].data.push({name: x.toString(), value: [x, y[i][0]]});
                }
                myAliveChart.setOption({
                    series: series
                });
            })
        }, 2000);

    };

    // 单车分布亮点图
    $scope.bikeLocationChart = function () {
        $http.get("json/test.json").success(function (weiboData) {
            weiboData = weiboData.map(function (serieData, idx) {
                var px = serieData[0] / 1000;
                var py = serieData[1] / 1000;
                var res = [
                    [px, py]
                ];

                for (var i = 2; i < serieData.length; i += 2) {
                    var dx = serieData[i] / 1000;
                    var dy = serieData[i + 1] / 1000;
                    var x = px + dx;
                    var y = py + dy;
                    res.push([x.toFixed(2), y.toFixed(2), 1]);

                    px = x;
                    py = y;
                }
                return res;
            });

            $http.get("json/hefei.json").success(function (data) {
                var ech = document.getElementById('bikeLocationChartConfig');
                echarts.registerMap('hefei', data);
                myBikeLocationChart = echarts.init(ech, $scope.theme);

                var bikeLocationChartConfig = {
                    tooltip: {},
                    legend: {
                        left: 'left',
                        data: ['强', '中', '弱'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    geo: {
                        map: 'hefei',
                        roam: true,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: [{
                        name: '弱',
                        type: 'scatterGL',
                        coordinateSystem: 'geo',
                        symbolSize: 1,
                        itemStyle: {
                            shadowBlur: 2,
                            shadowColor: 'rgba(37, 140, 249, 0.8)',
                            color: 'rgba(37, 140, 249, 0.8)'
                        },
                        data: weiboData[0]

                    }, {
                        name: '中',
                        type: 'scatterGL',
                        coordinateSystem: 'geo',
                        symbolSize: 1,
                        itemStyle: {
                            shadowBlur: 2,
                            shadowColor: 'rgba(14, 241, 242, 0.8)',
                            color: 'rgba(14, 241, 242, 0.8)'
                        },
                        data: weiboData[1]
                    }, {
                        name: '强',
                        type: 'scatterGL',
                        coordinateSystem: 'geo',
                        symbolSize: 1,
                        itemStyle: {
                            shadowBlur: 2,
                            shadowColor: 'rgba(255, 255, 255, 0.8)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        },
                        data: weiboData[2]
                    }]
                };

                myBikeLocationChart.setOption(bikeLocationChartConfig);
            }).error(function (err) {
                alert(err.error);
            });

        }).error(function (err) {
            alert(err.error);
        });
    }

}]);
