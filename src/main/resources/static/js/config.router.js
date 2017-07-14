'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
                $urlRouterProvider.otherwise("/access/signin");
                $stateProvider.state("app", {
                    "abstract": !0,
                    url: "/app",
                    templateUrl: "tpl/app.html",
                    resolve: load(["js/controllers/blocks/nav.js"])
                }).state("access", {
                    url: "/access",
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                }).state("access.signin", {
                    url: "/signin",
                    templateUrl: "tpl/page_signin.html",
                    resolve: load(["toaster", "js/controllers/personalInfo/signin.js"])
                }).state("app.sysuser", { //用户管理
                    url: "/sysuser",
                    templateUrl: "tpl/sysuser/sysuser_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/sysuser/sysUserList.js", "js/controllers/sysuser/createSysUser.js", "js/controllers/sysuser/updateSysUser.js", "js/controllers/sysuser/updateSysUserPassword.js", "js/controllers/sysuser/seeSysUser.js"])
                }).state("app.sysrole", {//角色管理
                    url: "/sysrole",
                    templateUrl: "tpl/sysrole/sysRole_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/sysrole/sysRoleList.js", "js/controllers/sysrole/createSysRole.js", "js/controllers/sysrole/updateSysRole.js", "js/controllers/sysrole/seeSysRole.js"])
                }).state("app.changePassword", {//修改密码
                    url: "/changePassword",
                    templateUrl: "tpl/change_password.html",
                    resolve: load(["toaster", "js/controllers/personalInfo/changePassword.js"])
                }).state("app.monitor", { // 单车监控
                    url: "/monitor",
                    templateUrl: "tpl/monitor/bike_monitor.html",
                    resolve: load(["toaster", "js/controllers/monitor/bikeMonitorController.js"])
                }).state("access.carTrack", {// 单车跟踪
                    url: "/carTrack",
                    templateUrl: "tpl/monitor/bike_track.html",
                    resolve: load(["toaster", "vr.directives.slider", "js/controllers/monitor/bikeTrackController.js"])
                }).state("access.positionReview", {
                    url: "/positionReview",
                    templateUrl: "tpl/monitor/bike_positionReview.html",
                    resolve: load(["toaster", "js/controllers/monitor/positionReviewController.js"])
                }).state("app.rider", {// 骑行者
                    url: "/rider_list",
                    templateUrl: "tpl/rider/rider_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/rider/createRider.js", "js/controllers/rider/riderList.js", "js/controllers/rider/seeRider.js","js/controllers/rider/updateRider.js","js/controllers/rider/updateRiderPassword.js"])
                }).state("app.customer", {//运用企业管理
                    url: "/customer",
                    templateUrl: "tpl/customer/customer_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/customer/customerList.js", "js/controllers/customer/createCustomer.js", "js/controllers/customer/updateCustomer.js", "js/controllers/customer/seeCustomer.js"])
                }).state("app.regulator", {//监管机构管理
                    url: "/regulator",
                    templateUrl: "tpl/regulator/regulator_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/regulator/regulatorList.js", "js/controllers/regulator/createRegulator.js", "js/controllers/regulator/updateRegulator.js", "js/controllers/regulator/seeRegulator.js"])
                }).state("app.vehicleType", {//单车类型管理
                    url: "/vehicleType",
                    templateUrl: "tpl/vehicletype/vehicletype_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/vehicletype/vehicleTypeList.js", "js/controllers/vehicletype/createVehicleType.js", "js/controllers/vehicletype/updateVehicleType.js", "js/controllers/vehicletype/seeVehicleType.js"])
                }).state("app.vehicleTypeCmd", {//单车类型命令管理
                    url: "/vehicleTypeCmd",
                    templateUrl: "tpl/vehicletypecmd/vehicletypecmd_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/vehicletypecmd/vehicleTypeCmdList.js", "js/controllers/vehicletypecmd/createVehicleTypeCmd.js", "js/controllers/vehicletypecmd/updateVehicleTypeCmd.js", "js/controllers/vehicletypecmd/seeVehicleTypeCmd.js"])
                }).state("app.vehicleGroup", {//单车分组管理
                    url: "/vehicleGroup",
                    templateUrl: "tpl/vehiclegroup/vehiclegroup_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/vehiclegroup/vehicleGroupList.js", "js/controllers/vehiclegroup/createVehicleGroup.js", "js/controllers/vehiclegroup/updateVehicleGroup.js", "js/controllers/vehiclegroup/seeVehicleGroup.js"])
                }).state("app.bike", {//单车管理
                    url: "/bike",
                    templateUrl: "tpl/bike/bike_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/bike/bikeList.js", "js/controllers/bike/createBike.js", "js/controllers/bike/updateBike.js", "js/controllers/bike/seeBike.js"])
                }).state("app.riderStats", {//骑行用户统计
                    url: "/rider_stats",
                    templateUrl: "tpl/report/rider_stats.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/report/riderStats.js"])
                }).state("app.sysResource", {//菜单管理
                    url: "/sysResource",
                    templateUrl: "tpl/sysresource/sysresource_list.html",
                    resolve: load(["toaster", "ngGrid", "js/controllers/sysresource/sysResourceList.js", "js/controllers/sysresource/createSysResource.js", "js/controllers/sysresource/updateSysResource.js", "js/controllers/sysresource/seeSysResource.js"])
                });

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        if (JQ_CONFIG[src]) {
                                            return $ocLazyLoad.load(JQ_CONFIG[src]);
                                        }
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                name = module.name;
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }
            }
        ]
    )
    .config(['$httpProvider', function ($httpProvider) {
        //Handle 401 Error
        $httpProvider.interceptors.push(function ($q, $injector) {
            return {
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        var state = $injector.get('$state');
                        var location = $injector.get('$location');
                        var rootScope = $injector.get('$rootScope');
                        rootScope.currentUrl = location.url().substring(1).replace("/", ".");
                        state.go("access.signin");
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }]);
;
