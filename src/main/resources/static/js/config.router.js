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
        }).state("app.bikeLive", { // 单车实况
          url: "/bikeLive",
          templateUrl: "tpl/monitor/bike_live.html",
          resolve: load(["toaster", "js/controllers/monitor/bikeLiveController.js"])
        }).state("app.bikeLocation", { // 车辆分布
          url: "/bikeLocation",
          templateUrl: "tpl/monitor/bike_location.html",
          resolve: load(["toaster", "js/controllers/monitor/bikeLocationController.js"])
        }).state("app.areaEditing", { // 区域编辑
          url: "/areaEditing",
          templateUrl: "tpl/monitor/area_editing.html",
          resolve: load(["toaster", "js/controllers/monitor/areaEditingController.js"])
        }).state("access.positionReview", {
          url: "/positionReview",
          templateUrl: "tpl/monitor/bike_positionReview.html",
          resolve: load(["toaster", "js/controllers/monitor/positionReviewController.js"])
        }).state("app.customer", {// 顾客
          url: "/customer",
          templateUrl: "tpl/customer/customer_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/customer/customerList.js", "js/controllers/customer/createCustomer.js", "js/controllers/customer/updateCustomer.js", "js/controllers/customer/seeCustomer.js"])
        }).state("app.rider", {// 骑行用户
          url: "/rider_list",
          templateUrl: "tpl/rider/rider_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/rider/createRider.js", "js/controllers/rider/riderList.js", "js/controllers/rider/seeRider.js", "js/controllers/rider/updateRider.js", "js/controllers/rider/updateRiderPassword.js"])
        }).state("app.bikeOwner", {// 单车车主
          url: "/bikeOwner_list",
          templateUrl: "tpl/bikeowner/bikeowner_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/bikeowner/createBikeowner.js", "js/controllers/bikeowner/bikeownerList.js", "js/controllers/bikeowner/seeBikeowner.js", "js/controllers/bikeowner/updateBikeowner.js", "js/controllers/bikeowner/updateBikeownerPassword.js"])
        }).state("app.operationOrg", {// 运营组织
          url: "/operationOrg",
          templateUrl: "tpl/operationorg/operation_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/operationorg/operationOrgList.js", "js/directives/ui-province-city-picker.js", "js/controllers/operationorg/createOperationOrg.js", "js/controllers/operationorg/updateOperationOrg.js", "js/controllers/operationorg/seeOperationOrg.js"])
        }).state("app.regulator", {//监管机构
          url: "/regulator",
          templateUrl: "tpl/regulator/regulator_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/regulator/regulatorList.js", "js/directives/ui-province-city-picker.js", "js/controllers/regulator/createRegulator.js", "js/controllers/regulator/updateRegulator.js", "js/controllers/regulator/seeRegulator.js"])
        }).state("app.bikeType", {//单车类型管理
          url: "/bikeType",
          templateUrl: "tpl/biketype/biketype_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/biketype/bikeTypeList.js", "js/controllers/biketype/createBikeType.js", "js/controllers/biketype/updateBikeType.js", "js/controllers/biketype/seeBikeType.js"])
        }).state("app.bikeTypeCmd", {//单车类型命令管理
          url: "/bikeTypeCmd",
          templateUrl: "tpl/biketypecmd/biketypecmd_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/biketypecmd/bikeTypeCmdList.js", "js/controllers/biketypecmd/createBikeTypeCmd.js", "js/controllers/biketypecmd/updateBikeTypeCmd.js", "js/controllers/biketypecmd/seeBikeTypeCmd.js"])
        }).state("app.bikeGroup", {//单车分组管理
          url: "/bikeGroup",
          templateUrl: "tpl/bikegroup/bikegroup_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/bikegroup/bikeGroupList.js", "js/controllers/bikegroup/createBikeGroup.js", "js/controllers/bikegroup/updateBikeGroup.js", "js/controllers/bikegroup/seeBikeGroup.js"])
        }).state("app.file", {//文件管理
          url: "/file",
          templateUrl: "tpl/file/file_list.html",
          resolve: load(["toaster", "ngGrid", "angularFileUpload", "js/controllers/file/fileList.js", "js/controllers/file/createFile.js", "js/controllers/file/updateFile.js", "js/controllers/file/seeFile.js"])
        }).state("app.bike", {//单车管理
          url: "/bike",
          templateUrl: "tpl/bike/bike_list.html",
          resolve: load(["toaster", "ngGrid", "angularFileUpload", "js/controllers/bike/bikeList.js", "js/controllers/bike/createBike.js", "js/controllers/bike/updateBike.js", "js/controllers/bike/seeBike.js", "js/controllers/bike/importBike.js"])
        }).state("app.riderStats", {//骑行用户统计
          url: "/rider_stats",
          templateUrl: "tpl/report/rider_stats.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/report/riderStats.js"])
        }).state("app.bikeStats", {//单车统计
          url: "/bike_stats",
          templateUrl: "tpl/report/bike_stats.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/report/bikeStats.js"])
        }).state("app.aliveStats", {//活跃用户统计
          url: "/alive_stats",
          templateUrl: "tpl/report/alive_stats.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/report/aliveStats.js"])
        }).state("app.sysResource", {//菜单管理
          url: "/sysResource",
          templateUrl: "tpl/sysresource/sysresource_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/sysresource/sysResourceList.js", "js/controllers/sysresource/createSysResource.js", "js/controllers/sysresource/updateSysResource.js", "js/controllers/sysresource/seeSysResource.js"])
        }).state("app.newsList", {//活动列表
          url: "/news_list",
          templateUrl: "tpl/news/news_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/news/newsList.js"])
        }).state("app.newsPublish", {//活动发布
          url: "/news_publish",
          templateUrl: "tpl/news/news_publish.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/news/newsPublishController.js"])
        }).state("app.newsModify", {//活动内容修改
          url: "/news_modify",
          templateUrl: "tpl/news/news_modify.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/news/newsModifyController.js"])
        }).state("app.deposit", {//押金管理
          url: "/deposit",
          templateUrl: "tpl/deposit/deposit_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/deposit/depositList.js"])
        }).state("app.fineRule", {//罚款规则
          url: "/fine_rule",
          templateUrl: "tpl/finerule/fine_rule_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/finerule/fineRuleList.js", "js/controllers/finerule/createFineRule.js", "js/controllers/finerule/updateFineRule.js", "js/controllers/finerule/seeFineRule.js"])
        }).state("app.fare", {//车费管理
          url: "/fare",
          templateUrl: "tpl/fare/fare_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/fare/fareList.js"])
        }).state("app.operationRule", {//运营规则
          url: "/operation_rule",
          templateUrl: "tpl/operationrule/operation_rule_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/operationrule/operationRuleList.js", "js/controllers/operationrule/createOperationRule.js", "js/controllers/operationrule/seeOperationRule.js", "js/controllers/operationrule/updateOperationRule.js"])
        }).state("app.depositRule", { // 押金规则
          url: "/deposit_rule",
          templateUrl: "tpl/depositrule/deposit_rule_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/depositrule/depositRuleList.js", "js/controllers/depositrule/createDepositRule.js", "js/controllers/depositrule/seeDepositRule.js", "js/controllers/depositrule/updateDepositRule.js"])
        }).state("app.illegalAuditing", { //违停审核
          url: "/illegalAuditing",
          templateUrl: "tpl/illegalAuditing/illegal_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/illegalAuditing/illegalList.js", "js/controllers/illegalAuditing/seeIllegal.js"])
        }).state("app.faultAuditing", { //故障审核
          url: "/faultAuditing",
          templateUrl: "tpl/faultAuditing/fault_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/faultAuditing/faultList.js", "js/controllers/faultAuditing/seeFault.js"])
        }).state("app.contentManage", { // 内容管理
          url: "/contentManage",
          templateUrl: "tpl/contentManage/problem_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/contentManage/problemList.js", "js/controllers/contentManage/createProblem.js", "js/controllers/contentManage/seeProblem.js", "js/controllers/contentManage/updateProblem.js", "js/controllers/contentManage/updateUserProtocol.js", "js/controllers/contentManage/updateRechargeProtocol.js", "js/controllers/contentManage/updateUserServiceProtocol.js", "js/controllers/contentManage/updateDepositStatement.js"])
        }).state("app.operationBill", {//运营账单管理
          url: "/operationbill",
          templateUrl: "tpl/financialmanage/operationBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/operationBillList.js", "js/controllers/financialmanage/seeOperationBill.js"])
        }).state("app.regulatorBill", {//政府账单管理
          url: "/regulatorBill",
          templateUrl: "tpl/financialmanage/regulatorBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/regulatorBillList.js", "js/controllers/financialmanage/seeRegulatorBill.js"])
        }).state("app.subscribeBill", {//认购账单管理
          url: "/subscribeBill",
          templateUrl: "tpl/financialmanage/subscribeBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/subscribeBillList.js"])
        }).state("app.depositBill", {//押金账单管理
          url: "/depositBill",
          templateUrl: "tpl/financialmanage/depositBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/depositBillList.js"])
        }).state("app.fineBill", {//罚款账单管理
          url: "/fineBill",
          templateUrl: "tpl/financialmanage/fineBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/fineBillList.js"])
        }).state("app.riderBill", {//骑行账单管理
          url: "/riderBill",
          templateUrl: "tpl/financialmanage/riderBill_list.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/financialmanage/riderBillList.js"])

          // 共享单车
        }).state("app.dashboard", { // 单车首页
          url: "/dashboard",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboard.html",
          // resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboard.js"])
        }).state("app.dashboard2", { //Dashboard2
          url: "/dashboard2",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboardsecond.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardsecond.js"])
        }).state("app.dashboard3", { //Dashboard3
          url: "/dashboard3",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboardthird.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardthird.js"])
        }).state("app.bikePrice", { // 单车物价及收费监管报表
          url: "/bikePrice",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_price.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikePrice.js"])
        }).state("app.bikeQuality", { // 单车车辆质量监管报表
          url: "/bikeQuality",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_quality.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikeQuality.js"])
        }).state("app.bikeQuantity", { // 单车车辆数量监管报表
          url: "/bikeQuantity",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_quantity.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikeQuantity.js"])
        }).state("app.bikeDispatcher", { // 单车车辆调度监管报表
          url: "/bikeDispatcher",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_dispatcher.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikeDispatcher.js"])
        }).state("app.depositSuperviseReport", { // 单车押金监管报表
          url: "/depositSuperviseReport",
          charset:"GBK",
          templateUrl: "tpl/dashboard/deposit_supervise_report.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/depositSuperviseReport.js"])
        }).state("app.dashboardRecharge", { // 单车充值监管报表
          url: "/dashboardRecharge",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboard_recharge.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardRecharge.js"])
        }).state("app.bikeIllegalPark", { // 单车车辆红色违停监管报表
          url: "/bikeIllegalPark",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_illegal_park.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikesIllegalPark.js"])
        }).state("app.bikeViolation", { // 单车违行监管报表
          url: "/bikeViolation",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_violation.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikeViolation.js"])
        }).state("app.dashboardInsured", { // 单车投保监管报表
          url: "/dashboardInsured",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboard_insured.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardInsured.js"])
        }).state("app.dashboardArea", { // 单车电子围栏与禁停区域
          url: "/dashboardArea",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboard_area.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardArea.js"])
        }).state("app.dashboardIllegalMoving", { // 单车车辆安全监管报表
          url: "/dashboardIllegalMoving",
          charset:"GBK",
          templateUrl: "tpl/dashboard/dashboard_illegal_moving.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/dashboardIllegalMoving.js"])
        }).state("app.adSupervision", { // 单车车身广告监督
          url: "/adSupervision",
          charset:"GBK",
          templateUrl: "tpl/dashboard/bike_ad_supervision.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/bikeAdSupervision.js"])
        }).state("app.slowTrafficSystem", { // 单车慢性交通系统规划
          url: "/slowTrafficSystem",
          charset:"GBK",
          templateUrl: "tpl/dashboard/slow_traffic_system.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/slowTrafficSystem.js"])
        }).state("app.regionReform", { // 单车重点区域改造
          url: "/regionReform",
          charset:"GBK",
          templateUrl: "tpl/dashboard/region_park_transform.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/regionParkTransform.js"])
        }).state("app.taxSuperviseReport", { // 单车税务监管报表
          url: "/taxSuperviseReport",
          charset:"GBK",
          templateUrl: "tpl/dashboard/tax_supervise_report.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/taxSuperviseReport.js"])
          // 滴滴顺风车
        }).state("app.freeHomePage", { // 顺风车首页
          url: "/freeHomePage",
          charset:"GBK",
          templateUrl: "tpl/dashboard/free_homepage.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/freeHomePage.js"])
        }).state("app.priceSupervise", { // 顺风车物价及收费监管报表
          url: "/priceSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/price_charge_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/priceChargeSupervise.js"])
        }).state("app.numberSupervise", { // 顺风车车辆数量监管报表
          url: "/numberSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_number_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carNumberSupervise.js"])
        }).state("app.carComplaintStatistics", { // 顺风车投诉及纠纷处理机制
          url: "/carComplaintStatistics",
          charset:"GBK",
          templateUrl: "tpl/cardashboard/car_complaint_statistics.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/cardashboard/carComplaintStatistics.js"])
        }).state("app.carAccidentInsured", { // 顺风车交通事故投保情况监管报表
          url: "/carAccidentInsured",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_accident_insured.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carAccidentInsured.js"])
        }).state("app.freeRiderTax", { // 顺风车税务监管
          url: "/freeRiderTax",
          charset:"GBK",
          templateUrl: "tpl/dashboard/free_rider_tax.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/freeRiderTax.js"])
          // 共享汽车
        }).state("app.carHomePage", { // 共享汽车首页
          url: "/carHomePage",
          charset:"GBK",
          templateUrl: "tpl/cardashboard/car_homepage.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/cardashboard/carHomePage.js"])
        }).state("app.shareCarPriceSupervise", { // 汽车物价及收费监管报表
          url: "/shareCarPriceSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/share_car_price_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/shareCarPriceSupervise.js"])
        }).state("app.carQuality", { // 汽车车辆质量监管报表
          url: "/carQuality",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_quality.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carQuality.js"])
        }).state("app.quantitySupervise", { // 汽车车辆数量监管报表
          url: "/quantitySupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_quantity_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carQuantitySupervise.js"])
        }).state("app.carDispatcher", { // 汽车车辆调度监管报表
          url: "/carDispatcher",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_dispatcher.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carDispatcher.js"])
        }).state("app.carRechargeSupervise", { // 汽车充值监管报表
          url: "/carRechargeSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_recharge_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carRechargeSupervise.js"])
        }).state("app.carDepositSupervise", { // 汽车押金监管报表
          url: "/carDepositSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_deposit_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carDepositSupervise.js"])
        }).state("app.carInsure", { // 汽车交通事故投保情况监管报表
          url: "/carInsure",
          charset:"GBK",
          templateUrl: "tpl/cardashboard/car_insure.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/cardashboard/carInsure.js"])
        }).state("app.carIllegalMoving", { // 汽车车辆安全监管报表
          url: "/carIllegalMoving",
          charset:"GBK",
          templateUrl: "tpl/cardashboard/car_illegal_moving.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/cardashboard/carIllegalMoving.js"])
        }).state("app.carTaxSupervise", { // 汽车税务监管报表
          url: "/carTaxSupervise",
          charset:"GBK",
          templateUrl: "tpl/dashboard/car_tax_supervise.html",
          resolve: load(["toaster", "ngGrid", "js/controllers/dashboard/carTaxSupervise.js"])
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
