app.directive('provinceCityPicker', ['$http', function ($http) {
    return {
        restrict: 'EA',
        replace: true,
        required: 'region',
        scope: {
            region: "="
        },
        templateUrl: 'js/template/provinceCityPicker-directive.html',
        link: function (scope, elm, attrs) {

            //获取"省"数据
            $http.get('json/province.json').success(function (data) {
                scope.totalProvinces = data;
                checkJsonLoaded();
            });

            //获取"市"数据
            $http.get('json/city.json').success(function (data) {
                scope.totalCitys = data;
                checkJsonLoaded();
            });

            function checkJsonLoaded() {
                if (scope.totalProvinces && scope.totalCitys) {
                    scope.province = 1;
                    if (angular.isArray(scope.region) && scope.region.length == 2) {
                        scope.province = scope.region[0];
                        scope.city = scope.region[1];
                    }
                    scope.addressChange();
                }
            }

            scope.$watch("region", function (newVal, oldVal) {
                if (newVal != oldVal) {
                    checkJsonLoaded();
                }
            }, true);

            scope.citys = [];

            scope.addressChange = function () {
                var prov = scope.totalProvinces[scope.province - 1];
                var pid = prov.ProID;
                var tempArray = [];
                var city;
                for (var i = 0; i < scope.totalCitys.length; i++) {
                    var obj = scope.totalCitys[i];
                    if (obj.ProID == pid) {
                        if (obj.CityID == scope.city)
                            city = obj;
                        tempArray.push(obj);
                    }
                }
                scope.citys = tempArray;
                if (!city)
                    city = tempArray[0];
                scope.city = city.CityID;
                scope.region = [scope.province, scope.city];
            }
        }
    };
}]);