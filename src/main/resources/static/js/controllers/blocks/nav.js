'use strict';

app.controller('navController', ['$scope', '$localStorage', '$filter', '$state', '$window', '$http', function ($scope, $localStorage, $filter, $state, $window, $http) {
  var speechPoints;
  // 初始化导航栏
  function initNav() {
    if ($localStorage.userinfo == undefined || $localStorage.userinfo == null) {
      $state.go("access.signin");
    }

    loadSpeech(); // 加载语音功能
  }

  //---------------------------------------------speech：start------------------------------------------------------//

  // 每秒查询后台是否有新的语音指令，有的话立即执行
  function loadSpeech() {
    getSpeechPoints();

    setInterval(function () {
      $http.get('voice-command/lastdata').success(function (result) {
        if (result.status == 'SUCCESS') {
          if (null != result.data && "" != result.data) {
            executeCommand(result.data.word);
          }
        }
      }).error(function (err) {
        alert("navController: " + err.error);
      });
    }, 1000)
  }

  // 获取语音指令配置数据
  function getSpeechPoints() {
    $http.get('json/command.json').success(function (result) {
      speechPoints = result;
    }).error(function (err) {
      alert(err.error);
    });
  }

  var body_style = function () { // 获取当前所在车辆类型
    var m;
    var First = $('.listFst h2:eq(0)').attr('id');
    if (First == "Danche") {
      m = 1;
    } else if (First == "Shunfengche") {
      m = 2;
    } else if (First == "Qiche") {
      m = 3
    }
    return m;
  };

  // 执行语音指令所对应的函数
  function executeCommand(command) {
    if (command === "showSystemChart") { // 展示四个图表
      showSystemChart();
    } else if (command === "hideSystemChart") { // 隐藏四个图表
      hideSystemChart();
    } else if (command === "showLeftMenu") { // 展示左侧菜单
      showLeftMenu();
    } else if (command === "hideLeftMenu") { // 隐藏左侧菜单
      hideLeftMenu();
    } else if (command === "bike") { // 共享单车
      danChefunc();
    } else if (command === "ride") { // 顺风车
      shunFengChefunc();
    } else if (command === "car") { // 共享汽车
      qiChefunc();
    } else if (command === "management") { // 城管局
      new body_style();
      displayMenus(body_style(), "城管局");
    } else if (command === "transport") { // 交通局
      new body_style();
      displayMenus(body_style(), "交通局");
    } else if (command === "publicSecurity") { // 公安局
      new body_style();
      displayMenus(body_style(), "公安局");
    } else if (command === "financial") { // 金融办
      new body_style();
      displayMenus(body_style(), "金融办");
    } else if (command === "price") { // 物价局
      new body_style();
      displayMenus(body_style(), "物价局");
    } else if (command === "qualitySupervision") { // 质监局
      new body_style();
      displayMenus(body_style(), "质监局");
    } else if (command === "planningBoard") { // 规划局
      new body_style();
      displayMenus(body_style(), "规划局");
    } else if (command === "revenue") { // 税务局
      new body_style();
      displayMenus(body_style(), "税务局");
    } else { // 菜单指令
      for (var i = 0; i < speechPoints.length; i++) {
        if (command === speechPoints[i].command) {
          $state.go(speechPoints[i].point);
        }
      }
    }
  }



  // 展示系统图表函数
  function showSystemChart() {
    clearTimeout(t);
    ListHide();
    carListHide();
    escJudg = true;

    lJudg = false;
    IndexTan4();
    numberShow();
  }

  // 隐藏系统图表函数
  function hideSystemChart() {
    clearTimeout(t);
    ListHide();
    carListHide();
    escJudg = true;

    lJudg = true;
    IndexTan4Ba();
    numberHide();
  }

  // 展示左侧列表函数
  function showLeftMenu() {
    clearTimeout(t);
    IndexTan4Ba();
    numberHide();
    lJudg = true;

    escJudg = false;
    ListShow();
    carListShow();
  }

  // 隐藏左侧列表函数
  function hideLeftMenu() {
    clearTimeout(t);
    IndexTan4Ba();
    numberHide();
    lJudg = true;

    escJudg = true;
    ListHide();
    carListHide();
  }


  //---------------------------------------------speech：end--------------------------------------------------------//

  function init() {
    initNav();


  }

  init();

}]);