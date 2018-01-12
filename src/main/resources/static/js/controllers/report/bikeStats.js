'use strict';

app.controller('bikeStatsCtrl', function ($scope, $http, $moment) {
    $scope.categories = [];
    $scope.totals = [];
    $scope.increments = [];
    $scope.selected = 0;
    $scope.selectChart = 0;

    $scope.formats = {day: 'yyyy-MM-dd', month: 'yyyy-MM', year: 'yyyy'};
    $scope.endDate = $moment(new Date()).format('YYYY-MM-DD');
    $scope.startDate = $moment(new Date()).add(-10, 'd').format('YYYY-MM-DD');

    var type = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];

    function init() {
        $http.get("bike-types/collection").success(function (data) {
            $scope.bikeType = data.data[0];
            $scope.bikeTypes = data.data;
            $scope.stats(0);
        });
    }

    init();

    $scope.selectType = function (index) {
        $scope.selected = index;
        $scope.stats($scope.selectChart);
    }

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

    $scope.stats = function (num) {
        $scope.categories = [];
        $scope.totals = [];
        $scope.increments = [];

        $scope.selectChart = num;

        var startDate = $moment($scope.startDate).format(type[$scope.selected]);
        var endDate = $moment($scope.endDate).format(type[$scope.selected]);

        $http.get('report-stats/bike?type=' + $scope.selected + '&startDate=' + startDate + '&endDate=' + endDate + '&bikeTypeId=' + $scope.bikeType.id).success(function (data) {
            var totalBike = data.data.totals;

            $scope.getRatioData(totalBike);

            if (num == 0) {
                $scope.columnChart(data);
            } else {
                $scope.lineChart(data);
            }
        }).error(function (err) {
            alert(err.error);
        });
    }

    $scope.lineChart = function (data) {
        var total = 0;
        var increment = data.data.increment;

        angular.forEach(increment, function (strs) {
            var str = strs.split(",");
            $scope.categories.push(str[0]);
            $scope.increments.push(parseInt(str[1]));
            total += parseInt(str[1]);
            $scope.totals.push(total);
        })

        Highcharts.chart('container', {
            series: [{
                name: $scope.bikeType.name + "总数",
                data: $scope.totals
            },
                {
                    name: $scope.bikeType.name + "新增数",
                    data: $scope.increments
                }],
            title: {
                text: $scope.bikeType.name + '增长趋势'
            },
            xAxis: {
                categories: $scope.categories
            },
            yAxis: {
                title: {
                    text: $scope.bikeType.name + "/(辆)"
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            chart: {
                type: 'line'
            },
            loading: false
        });
    }

    $scope.columnChart = function (data) {
        var total = 0;
        var increment = data.data.increment;
        angular.forEach(increment, function (strs) {
            var str = strs.split(",");
            $scope.categories.push(str[0]);
            $scope.increments.push(parseInt(str[1]));
            total += parseInt(str[1]);
            $scope.totals.push(total);
        })

        Highcharts.chart('container', {
            series: [{
                name: $scope.bikeType.name + "总数",
                data: $scope.totals
            },
                {
                    name: $scope.bikeType.name + "新增数",
                    data: $scope.increments
                }],
            title: {
                text: $scope.bikeType.name + '增长趋势'
            },
            xAxis: {
                categories: $scope.categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: $scope.bikeType.name + "/(辆)"
                }
            },
            chart: {
                type: 'column'
            },
            tooltip: {
                valueSuffix: '辆'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.25,
                    borderWidth: 0
                }
            }
        });
    }

    $scope.getRatioData = function (totalBike) {
        $('#pieChartConfig').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '各类型单车数量占比'
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '各类型单车数量比',
                data: totalBike
            }]
        })
    }

    $scope.$watch('bikeType', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.stats($scope.selectChart);
        }
    }, true);

});
