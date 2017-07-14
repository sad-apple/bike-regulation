'use strict';

app.controller('riderStatsCtrl', function ($scope, $http, $moment) {
    $scope.categories = [];
    $scope.totals = [];
    $scope.increments = [];
    $scope.selected = 0;
    var type = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];
    $scope.formats = {day:'yyyy-MM-dd',month:'yyyy-MM',year:'yyyy'};
    $scope.endDate  = $moment(new Date()).format('YYYY-MM-DD');
    $scope.startDate = $moment(new Date()).add(-10,'d').format('YYYY-MM-DD');

    $scope.startDateOptions = {
        day:{datepickerMode:"'day'",minMode:"'day'",showWeeks:"false"},
        month:{datepickerMode:"'month'",minMode:"'month'",showWeeks:"false"},
        year:{datepickerMode:"'year'",minMode:"'year'",showWeeks:"false"}
    }
    $scope.endDateOptions = {
        day:{datepickerMode:"'day'",minMode:"'day'",showWeeks:"false"},
        month:{datepickerMode:"'month'",minMode:"'month'",showWeeks:"false"},
        year:{datepickerMode:"'year'",minMode:"'year'",showWeeks:"false"}
    }

    $scope.selectType = function(index){
        $scope.selected = index;
        if(index == 0){
            $scope.endDate  = $moment(new Date()).format('YYYY-MM-DD');
            $scope.startDate = $moment(new Date()).add(-1,'d').format('YYYY-MM-DD');
        }else if(index == 1){
            $scope.endDate  = $moment(new Date()).format('YYYY-MM-DD');
            $scope.startDate = $moment(new Date()).startOf('month').add(-1,'d').format('YYYY-MM-DD');
        }else{
            $scope.endDate  = $moment(new Date()).format('YYYY-MM-DD');
            $scope.startDate = $moment(new Date()).add(-1,'y').format('YYYY-MM-DD');
        }
    }

    $scope.openStart = function($event) {
        $scope.startOpened = true;
    };

    $scope.openEnd = function($event) {
        $scope.endOpened = true;
    };

    $scope.stats = function() {
        $scope.categories = [];
        $scope.totals = [];
        $scope.increments = [];
        var startDate = $moment($scope.startDate).format(type[$scope.selected]);
        var endDate = $moment($scope.endDate).format(type[$scope.selected]);
        $http.get('file_access_log/fileVisitStats?type=' + $scope.selected + '&startDate=' + startDate + '&endDate=' + endDate).success(function (data) {
            var total = 0;
            var increment = data.data.increment;
            angular.forEach(increment, function(strs){
                var str = strs.split(",");
                $scope.categories.push(str[0]);
                $scope.increments.push(parseInt(str[1]));
                total += parseInt(str[1]);
                $scope.totals.push(total);
            })
            $scope.chartConfig = {
                options: {
                    xAxis: {
                        categories: $scope.categories
                    },
                    yAxis: {
                        title: {
                            text: '骑行用户'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    chart: {
                        type: 'line'
                    }
                },
                series: [{
                    name:"骑行用户总数",
                    data: $scope.totals
                },
                    {
                        name:"骑行用户新增数",
                        data: $scope.increments
                    }],
                title: {
                    text: '骑行用户增长趋势'
                },
                loading: false

            }
        })
    }

    $scope.stats();
});
