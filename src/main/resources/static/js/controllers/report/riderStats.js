'use strict';

app.controller('riderStatsCtrl', function ($scope, $http, $moment) {
    $scope.categories = [];
    $scope.totals = [];
    $scope.increments = [];
    $scope.selected = 0;

    $scope.formats = {day:'yyyy-MM-dd',month:'yyyy-MM',year:'yyyy'};
    $scope.endDate  = $moment(new Date()).format('YYYY-MM-DD');
    $scope.startDate = $moment(new Date()).add(-10,'d').format('YYYY-MM-DD');

    var type = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];

    function init(){
        $http.get('report-stats/roles').success(function (data){
            $scope.sysRole = data.data[0];
            $scope.sysRoles = data.data;
            $scope.stats();
        });
    }

    init();
    
    $scope.selectType = function(index){
        $scope.selected = index;
        $scope.stats();
    }

    $scope.openStart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = true;
    };

    $scope.openEnd = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = true;
    };
    
    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

    $scope.stats = function() {
        var startDate = $moment($scope.startDate).format(type[$scope.selected]);
        var endDate = $moment($scope.endDate).format(type[$scope.selected]);
        $http.get('report-stats/customer?type=' + $scope.selected + '&startDate=' + startDate + '&endDate=' + endDate + '&sysRoleId=' + $scope.sysRole.id).success(function (data) {
            var total = data.data.total;
            var increment = data.data.increment;
            $scope.categories = [];
            $scope.totals = [];
            $scope.increments = [];
            if (increment.length == 0){
                $scope.totals = [total];
            }
            angular.forEach(increment, function(strs){
                var str = strs.split(",");
                $scope.categories.push(str[0]);
                $scope.increments.push(parseInt(str[1]));
                total += parseInt(str[1]);
                $scope.totals.push(total);
            })
            $('#chartConfig').highcharts({
                xAxis: {
                    categories: $scope.categories
                },
                yAxis: {
                    title: {
                        text: $scope.sysRole.name
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
                series: [{
                    name:$scope.sysRole.name + "总数",
                    data: $scope.totals
                },
                    {
                        name:$scope.sysRole.name + "新增数",
                        data: $scope.increments
                    }],
                title: {
                    text: $scope.sysRole.name + '增长趋势'
                },
                loading: false
            })
        })
    }

    $scope.$watch('sysRole', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.stats();
        }
    }, true);

});
