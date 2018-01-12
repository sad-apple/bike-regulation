'use strict';

app.controller('aliveStatsCtrl', function ($scope, $http, $moment) {
    $scope.categories = [];
    $scope.totals = [];
    $scope.increments = [];
    $scope.selected = 0;

    $scope.formats = {day: 'yyyy-MM-dd', month: 'yyyy-MM', year: 'yyyy'};
    $scope.endDate = $moment(new Date()).format('YYYY-MM-DD');
    $scope.startDate = $moment(new Date()).add(-10, 'd').format('YYYY-MM-DD');

    function init() {
        $http.get("bike-types/collection").success(function (data) {
            $scope.bikeType = data.data[0];
            $scope.bikeTypes = data.data;
        });
    }

    init();

    $scope.openStart = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = true;
    };

    $scope.openEnd = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = true;
    };

    $scope.timeTool = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
    }

    $('#container').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        $http.get('report-stats/alivebike').success(function (data) {
                            var x = (new Date()).getTime(), // current time
                                y = data.data.total;
                            series.addPoint([x, y], true, true);
                            activeLastPointToolip(chart)
                        })

                    }, 3000);
                }
            }
        },
        title: {
            text: '活跃用户实时数据'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '值'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '随机数据',
            data: (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i, y;
                for (i = -29; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 3000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    }, function (c) {
        activeLastPointToolip(c)
    });

});
