/**
 * Created by wangbiao on 2017/8/16.
 * 红色违停
 */
app.controller('bikesIllegalParkController', ['$rootScope', '$scope', 'toaster', '$interval', function ($rootScope, $scope, toaster, $interval) {

  $scope.toaster = {
    type: 'success',
    title: 'Title',
    text: 'Message'
  };

  $scope.pop = function (type, title, text) {
    toaster.pop(type, '', text);
  };

  // 图表数据源
  $scope.bikeParkDatas = [
    // {"id": id, "bikeId": "单车id",     "operator": "运营方", "userName": "违停人", 　"idCardNum": "违停人身份证号",             "userPhoneNum": "违停人手机号",    "time": "违停时间",          　　"userRespond": "违停人响应情况", "userFine": "违停人罚款", "opName": "运营方摆渡人", "opPhoneNum": "运营方手机号", "opRespond": "运营方响应情况", "opFine": "运营方罚款", "policeRespond": "警力处理响应情况", "dealResult": "处理结果",  "lat": 违停地点纬度, "lon": 违停地点纬度, "position": "违停地点"},
    {
      "id": 1,
      "bikeId": "0551115364",
      "operator": "A公司",
      "userName": "俞慧英",
      "idCardNum": "3400001995****8004",
      "userPhoneNum": "189****5462",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.88692,
      "lon": 117.284855,
      "position": "三义广场"
    },
    {
      "id": 2,
      "bikeId": "0551156438",
      "operator": "A公司",
      "userName": "蒋欣欣",
      "idCardNum": "3400001990****3334",
      "userPhoneNum": "187****5550",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.870848,
      "lon": 117.285821,
      "position": "城隍庙商城"
    },
    {
      "id": 3,
      "bikeId": "0551163548",
      "operator": "A公司",
      "userName": "卜安娜",
      "idCardNum": "3400001992****9884",
      "userPhoneNum": "153****7842",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.858625,
      "lon": 117.272398,
      "position": "梅山饭店"
    },
    {
      "id": 4,
      "bikeId": "0551156324",
      "operator": "A公司",
      "userName": "苏寒香",
      "idCardNum": "3400001988****5166",
      "userPhoneNum": "188****8877",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.896175,
      "lon": 117.239728,
      "position": "万科森林公园"
    },
    {
      "id": 5,
      "bikeId": "0551195613",
      "operator": "A公司",
      "userName": "曹芳荃",
      "idCardNum": "3400001990****4443",
      "userPhoneNum": "189****3259",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.825561,
      "lon": 117.325022,
      "position": "蔡岗小学"
    },
    {
      "id": 6,
      "bikeId": "0551236549",
      "operator": "B公司",
      "userName": "云雅量",
      "idCardNum": "3400001993****9234",
      "userPhoneNum": "139****0605",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.812258,
      "lon": 117.262922,
      "position": "合肥市锦城小学"
    },
    {
      "id": 7,
      "bikeId": "0551263987",
      "operator": "B公司",
      "userName": "孟伟祺",
      "idCardNum": "3400001996****8551",
      "userPhoneNum": "139****0155",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.820218,
      "lon": 117.28184,
      "position": "江汽四村"
    },
    {
      "id": 8,
      "bikeId": "0551235478",
      "operator": "B公司",
      "userName": "王泽雨",
      "idCardNum": "3400001995****3552",
      "userPhoneNum": "152****9922",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.882142,
      "lon": 117.25817,
      "position": "合肥市四河小学"
    },
    {
      "id": 9,
      "bikeId": "0551296547",
      "operator": "B公司",
      "userName": "方虹雨",
      "idCardNum": "3400001993****2709",
      "userPhoneNum": "139****0353",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.830674,
      "lon": 117.230019,
      "position": "合肥市规划局"
    },
    {
      "id": 10,
      "bikeId": "0551286534",
      "operator": "B公司",
      "userName": "雷和雅",
      "idCardNum": "3400001992****422X",
      "userPhoneNum": "139****0539",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.834077,
      "lon": 117.300545,
      "position": "卫岗小学"
    },
    {
      "id": 11,
      "bikeId": "0551378964",
      "operator": "C公司",
      "userName": "沈安",
      "idCardNum": "3400001990****1947",
      "userPhoneNum": "187****8956",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.893794,
      "lon": 117.252494,
      "position": "安徽省农业科学院"
    },
    {
      "id": 12,
      "bikeId": "0551336548",
      "operator": "C公司",
      "userName": "吕康裕",
      "idCardNum": "3400001989****2012",
      "userPhoneNum": "159****9900",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.872272,
      "lon": 117.269461,
      "position": "琥珀南村"
    },
    {
      "id": 13,
      "bikeId": "0551365489",
      "operator": "C公司",
      "userName": "姜鸿涛",
      "idCardNum": "3400001988****4751",
      "userPhoneNum": "139****0173",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.849594,
      "lon": 117.237647,
      "position": "新华优阁"
    },
    {
      "id": 14,
      "bikeId": "0551336548",
      "operator": "C公司",
      "userName": "常英杰",
      "idCardNum": "3400001988****1718",
      "userPhoneNum": "139****0641",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.896257,
      "lon": 117.270923,
      "position": "瑞地公馆"
    },
    {
      "id": 15,
      "bikeId": "0551345961",
      "operator": "C公司",
      "userName": "秦芳洲",
      "idCardNum": "3400001994****816X",
      "userPhoneNum": "182****9925",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "苏寒香",
      "opPhoneNum": "18856938877",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.858937,
      "lon": 117.293635,
      "position": "安徽大剧院"
    },
    {
      "id": 16,
      "bikeId": "0551415634",
      "operator": "D公司",
      "userName": "时红英",
      "idCardNum": "3400001989****7568",
      "userPhoneNum": "182****3256",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "吕德厚",
      "opPhoneNum": "13902070593",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.838798,
      "lon": 117.238152,
      "position": "港汇广场"
    },
    {
      "id": 17,
      "bikeId": "0551426498",
      "operator": "D公司",
      "userName": "柏新曦",
      "idCardNum": "3400001987****5492",
      "userPhoneNum": "139****0083",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "秦碧玉",
      "opPhoneNum": "13902070485",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.851893,
      "lon": 117.292497,
      "position": "合肥市青年路小学"
    },
    {
      "id": 18,
      "bikeId": "0551435478",
      "operator": "D公司",
      "userName": "柳煜祺",
      "idCardNum": "3400001995****7691",
      "userPhoneNum": "136****7171",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "未响应",
      "opFine": "10元",
      "policeRespond": "未响应",
      "dealResult": "未处理",
      "lat": 31.867011,
      "lon": 117.278859,
      "position": "金城大厦"
    },
    {
      "id": 19,
      "bikeId": "0551115364",
      "operator": "A公司",
      "userName": "俞慧英",
      "idCardNum": "3400001995****8004",
      "userPhoneNum": "189****5462",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.88692,
      "lon": 117.284855,
      "position": "三义广场"
    },
    {
      "id": 20,
      "bikeId": "0551156438",
      "operator": "A公司",
      "userName": "蒋欣欣",
      "idCardNum": "3400001990****3334",
      "userPhoneNum": "187****5550",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.870848,
      "lon": 117.285821,
      "position": "城隍庙商城"
    },
    {
      "id": 21,
      "bikeId": "0551163548",
      "operator": "A公司",
      "userName": "卜安娜",
      "idCardNum": "3400001992****9884",
      "userPhoneNum": "153****7842",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.858625,
      "lon": 117.272398,
      "position": "梅山饭店"
    },
    {
      "id": 4,
      "bikeId": "0551156324",
      "operator": "A公司",
      "userName": "苏寒香",
      "idCardNum": "3400001988****5166",
      "userPhoneNum": "188****8877",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.896175,
      "lon": 117.239728,
      "position": "万科森林公园"
    },
    {
      "id": 5,
      "bikeId": "0551195613",
      "operator": "A公司",
      "userName": "曹芳荃",
      "idCardNum": "3400001990****4443",
      "userPhoneNum": "189****3259",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.825561,
      "lon": 117.325022,
      "position": "蔡岗小学"
    },
    {
      "id": 6,
      "bikeId": "0551236549",
      "operator": "B公司",
      "userName": "云雅量",
      "idCardNum": "3400001993****9234",
      "userPhoneNum": "139****0605",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.812258,
      "lon": 117.262922,
      "position": "合肥市锦城小学"
    },
    {
      "id": 7,
      "bikeId": "0551263987",
      "operator": "B公司",
      "userName": "孟伟祺",
      "idCardNum": "3400001996****8551",
      "userPhoneNum": "139****0155",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.820218,
      "lon": 117.28184,
      "position": "江汽四村"
    },
    {
      "id": 8,
      "bikeId": "0551235478",
      "operator": "B公司",
      "userName": "王泽雨",
      "idCardNum": "3400001995****3552",
      "userPhoneNum": "152****9922",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.882142,
      "lon": 117.25817,
      "position": "合肥市四河小学"
    },
    {
      "id": 9,
      "bikeId": "0551296547",
      "operator": "B公司",
      "userName": "方虹雨",
      "idCardNum": "3400001993****2709",
      "userPhoneNum": "139****0353",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.830674,
      "lon": 117.230019,
      "position": "合肥市规划局"
    },
    {
      "id": 10,
      "bikeId": "0551286534",
      "operator": "B公司",
      "userName": "雷和雅",
      "idCardNum": "3400001992****422X",
      "userPhoneNum": "139****0539",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.834077,
      "lon": 117.300545,
      "position": "卫岗小学"
    },
    {
      "id": 11,
      "bikeId": "0551378964",
      "operator": "C公司",
      "userName": "沈安",
      "idCardNum": "3400001990****1947",
      "userPhoneNum": "187****8956",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.893794,
      "lon": 117.252494,
      "position": "安徽省农业科学院"
    },
    {
      "id": 12,
      "bikeId": "0551336548",
      "operator": "C公司",
      "userName": "吕康裕",
      "idCardNum": "3400001989****2012",
      "userPhoneNum": "159****9900",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.872272,
      "lon": 117.269461,
      "position": "琥珀南村"
    },
    {
      "id": 13,
      "bikeId": "0551365489",
      "operator": "C公司",
      "userName": "姜鸿涛",
      "idCardNum": "3400001988****4751",
      "userPhoneNum": "139****0173",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.849594,
      "lon": 117.237647,
      "position": "新华优阁"
    },
    {
      "id": 14,
      "bikeId": "0551336548",
      "operator": "C公司",
      "userName": "常英杰",
      "idCardNum": "3400001988****1718",
      "userPhoneNum": "139****0641",
      "time": new Date(),
      "userRespond": "已响应",
      "userFine": "--",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "--",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.896257,
      "lon": 117.270923,
      "position": "瑞地公馆"
    },
    {
      "id": 15,
      "bikeId": "0551345961",
      "operator": "C公司",
      "userName": "秦芳洲",
      "idCardNum": "3400001994****816X",
      "userPhoneNum": "182****9925",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "苏寒香",
      "opPhoneNum": "18856938877",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.858937,
      "lon": 117.293635,
      "position": "安徽大剧院"
    },
    {
      "id": 16,
      "bikeId": "0551415634",
      "operator": "D公司",
      "userName": "时红英",
      "idCardNum": "3400001989****7568",
      "userPhoneNum": "182****3256",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "吕德厚",
      "opPhoneNum": "13902070593",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.838798,
      "lon": 117.238152,
      "position": "港汇广场"
    },
    {
      "id": 17,
      "bikeId": "0551426498",
      "operator": "D公司",
      "userName": "柏新曦",
      "idCardNum": "3400001987****5492",
      "userPhoneNum": "139****0083",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "秦碧玉",
      "opPhoneNum": "13902070485",
      "opRespond": "已响应",
      "opFine": "--",
      "policeRespond": "--",
      "dealResult": "--",
      "lat": 31.851893,
      "lon": 117.292497,
      "position": "合肥市青年路小学"
    },
    {
      "id": 18,
      "bikeId": "0551435478",
      "operator": "D公司",
      "userName": "柳煜祺",
      "idCardNum": "3400001995****7691",
      "userPhoneNum": "136****7171",
      "time": new Date(),
      "userRespond": "未响应",
      "userFine": "5元",
      "opName": "--",
      "opPhoneNum": "--",
      "opRespond": "未响应",
      "opFine": "10元",
      "policeRespond": "未响应",
      "dealResult": "未处理",
      "lat": 31.867011,
      "lon": 117.278859,
      "position": "金城大厦"
    }
  ];
  tableScrollFun();

  var sourceScatterDatas = []; // "聚合单车"数据源
  var scatterDatas = []; // "聚合单车" --无闪动效果
  var effectScatterDatas = []; // "单个单车" --有闪动效果
  var myChart; // echarts图
  var inIndex = 1;
  var intervalFirst; // 第一次进入该页面执行的时间片函数--解决第一次进入页面弹框信息只显示最后一行数据bug
  var interval;

  // 第一次进入该页面执行的时间片函数
  function intervalFirstFunc() {
    intervalFirst = $interval(function () {
      scatterDatas.splice(0, scatterDatas.length); // 清空数组
      effectScatterDatas.splice(0, effectScatterDatas.length); // 清空数组
      showStaticParkBikes();
      intervalNext();
    }, 1000);
  }

  // 第一次后的时间片函数
  function intervalNext() {
    $interval.cancel(intervalFirst);
    interval = $interval(function () {
      scatterDatas.splice(0, scatterDatas.length); // 清空数组
      effectScatterDatas.splice(0, effectScatterDatas.length); // 清空数组
      showStaticParkBikes();
    }, 1000000);
  }

    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        $interval.cancel(interval);
    });

  //------------------------- bmap start ------------------------------//
  function init() {
    makeScaterData();
    showStaticParkBikes();
  }

  init();

  // 前台制造聚合点数据源
  function makeScaterData() {
    var scatterData1 = { // 合肥市第五中学
      "lon": 117.328828,
      "lat": 31.873713
    };
    var scatterData2 = { // 合肥火车站
      "lon": 117.324592,
      "lat": 31.889789
    };
    var scatterData3 = { // 合肥科技馆
      "lon": 117.255926,
      "lat": 31.847861
    };
    sourceScatterDatas.push(scatterData1);
    sourceScatterDatas.push(scatterData2);
    sourceScatterDatas.push(scatterData3);
  }

  // 展示违停单车
  function showStaticParkBikes() {
    makeScaterDatas(sourceScatterDatas);
    makeEffectScatterDatas($scope.bikeParkDatas);
    showIllegalParkBikes(scatterDatas, effectScatterDatas);
  }

  // 构造"违停单车聚合"数据
  function makeScaterDatas(array) {
    for (var i = 0; i < array.length; i++) {
      var scatterData = {
        name: '聚合单车',
        value: [array[i].lon, array[i].lat, 60]
      };
      scatterDatas.push(scatterData);
    }
  }

  // 构造"违停单车单个点"数据
  function makeEffectScatterDatas(array) {
    $scope.singleNum = GetRandomNum(8, 10);
    var souceDatas = getRandomArrayElements(array, $scope.singleNum);
    for (var i = 0; i < souceDatas.length; i++) {
      var effectScatterData = {
        name: '单个单车',
        value: [souceDatas[i].lon, souceDatas[i].lat, 10]
      };
      effectScatterDatas.push(effectScatterData);
      $scope.singleBikes = souceDatas;
    }
  }

  // 从目标数组中随机获取n个元素
  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  // 显示违停单车
  function showIllegalParkBikes(scatterDatas, effectScatterDatas) {
    myChart = echarts.init(document.getElementById('bmap'));
    var myOption = {
      bmap: {
        center: [117.282827, 31.859858],
        zoom: 13,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              "featureType": "land",
              "elementType": "geometry",
              "stylers": {
                "color": "#212121"
              }
            },
            {
              "featureType": "building",
              "elementType": "geometry",
              "stylers": {
                "color": "#2b2b2b"
              }
            },
            {
              "featureType": "highway",
              "elementType": "all",
              "stylers": {
                "lightness": -42,
                "saturation": -91
              }
            },
            {
              "featureType": "arterial",
              "elementType": "geometry",
              "stylers": {
                "lightness": -77,
                "saturation": -94
              }
            },
            {
              "featureType": "green",
              "elementType": "geometry",
              "stylers": {
                "color": "#1b1b1b"
              }
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": {
                "color": "#181818"
              }
            },
            {
              "featureType": "subway",
              "elementType": "geometry.stroke",
              "stylers": {
                "color": "#181818"
              }
            },
            {
              "featureType": "railway",
              "elementType": "geometry",
              "stylers": {
                "lightness": -52
              }
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": {
                "color": "#313131"
              }
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": {
                "color": "#8b8787"
              }
            },
            {
              "featureType": "manmade",
              "elementType": "geometry",
              "stylers": {
                "color": "#1b1b1b"
              }
            },
            {
              "featureType": "local",
              "elementType": "geometry",
              "stylers": {
                "lightness": -75,
                "saturation": -91
              }
            },
            {
              "featureType": "subway",
              "elementType": "geometry",
              "stylers": {
                "lightness": -65
              }
            },
            {
              "featureType": "railway",
              "elementType": "all",
              "stylers": {
                "lightness": -40
              }
            },
            {
              "featureType": "boundary",
              "elementType": "geometry",
              "stylers": {
                "color": "#8b8787",
                "weight": "1",
                "lightness": -29
              }
            }
          ]
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '聚合单车',
          type: 'scatter',
          tooltip: {
            formatter: function (params) {
              return '';
            }
          },
          coordinateSystem: 'bmap',
          data: scatterDatas,
          symbolSize: 60,
          label: {
            normal: {
              formatter: function (params) {
                for (var i = 0; i < params.data.value.length; i++) {
                  $scope.everyPloyNum = GetRandomNum(10, 12);
                  return '违停车辆' + '\n' + '  ' + $scope.everyPloyNum + '辆';
                }
              },
              position: 'inside',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: ['rgba(209, 39, 13, 0.8)']
            }
          }
        },
        {
          name: '单个单车',
          type: 'effectScatter',
          tooltip: {
            formatter: function (params) {
              return addOverlays(params);
            }
          },
          coordinateSystem: 'bmap',
          data: effectScatterDatas,
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: ['rgba(209, 39, 13, 0.9)']
            }
          },
          zlevel: 1
        }
      ]
    };

    myChart.setOption(myOption);
    window.addEventListener("resize",function(){
      myChart.resize();
    });
    addOverlays(0);
    showPiechart();
    showGrid();
  }

  // 获取随机数
  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }

  // 添加单个违停车辆上信息
  function addOverlays(params) {
    var singleBike;
    if (params == 0) { // 页面中随机加载
      singleBike = $scope.singleBikes[$scope.singleBikes.length - 1]; // 从数组中获取最后一个元素
    } else { // 鼠标移入
      for (var i = 0; i < $scope.singleBikes.length; i++) {
        if (params.value[0] == $scope.singleBikes[i].lon && params.value[1] == $scope.singleBikes[i].lat) {
          singleBike = $scope.singleBikes[i];
        }
      }
    }

    if (undefined != $rootScope.backMarker) {
      $rootScope.backMarker.remove(); // 移除页面已有弹框
    }
    var baiduMap = myChart.getModel().getComponent('bmap').getBMap(); // 百度地图实例
    var point = new BMap.Point(singleBike.lon, singleBike.lat);

    // 添加背景框
    var myIcon = new BMap.Icon('img/infowindow4.png', new BMap.Size(272, 100));
    var opts = {
      offset: new BMap.Size(0, -51), // 设置偏移量
      icon: myIcon
    };
    $rootScope.backMarker = new BMap.Marker(point, opts); // 新的弹框
    baiduMap.addOverlay($rootScope.backMarker);

    // 添加单车信息
    var styles = {
      color: "white",
      fontSize: "16px",
      height: "25px",
      lineHeight: "25px",
      fontFamily: "微软雅黑",
      backgroundColor: '#9E3329',
      borderColor: '#9E3329'
    };

    var label1 = new BMap.Label('单车编号: ' + singleBike.bikeId, {offset: new BMap.Size(0, 5)}); // 创建文本标注对象
    label1.setStyle(styles);
    $rootScope.backMarker.setLabel(label1);

    var label2 = new BMap.Label('违停人: ' + singleBike.userPhoneNum, {offset: new BMap.Size(0, 32)});
    label2.setStyle(styles);
    $rootScope.backMarker.setLabel(label2);

    var label3 = new BMap.Label('违停地点: ' + singleBike.position, {offset: new BMap.Size(0, 59)});
    label3.setStyle(styles);
    $rootScope.backMarker.setLabel(label3);

    if (inIndex == 1) {
      inIndex = 2;
      intervalFirstFunc();
    }
  }
  //------------------------- bmap end ------------------------------//

  //------------------------- pieChart start ------------------------------//
  function showPiechart() {
    var totalNum = 40000; // 设置单车总数为1000辆
    var illegalNum = 3950 + (3 * $scope.everyPloyNum + $scope.singleNum);
    var noIllegalNum = totalNum - illegalNum;
    var illegalRatio = Math.round(illegalNum / totalNum * 100);
    var noIllegalRatio = Math.round(noIllegalNum / totalNum * 100);

    //饼状图
    var pieChart = echarts.init(document.getElementById('pieChart'));

    var pieOption = {
      title: {
        text: '车辆违停数量统计',
        subtext: '——————————',
        itemGap: 0,
        padding: [0, 0, 30, 0],
        textStyle: {
          color: '#DCDCDC'
        },
        subtextStyle: {
          color: '#008C9E',
          verticalAlign: 'top',
          fontSize: 22
        },
        left:'center'
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        top: '10%',
        itemWidth: 14,
        itemHeight: 14,
        borderRadius: 0,
        data: ['不违停', '违停'],
        textStyle: {
          color: '#DCDCDC'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      series: [{
        type: "pie",
        radius: ['53%', '75%'],
        center: ['50%', '60%'],
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [{
          name: '不违停',
          value: noIllegalNum,
          tooltip: {
            show: true
          },
          itemStyle: {
            normal: {
              color: '#3199DE'
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name + '：' + params.value + '辆' + '\n';
              },
              textStyle: {
                fontSize: 16
              }
            }
          }
        }, {
          name: '违停',
          value: illegalNum,
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          itemStyle: {
            normal: {
              color: '#D7D500'
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                return params.name + '：' + params.value + '辆' + '\n';
              },
              textStyle: {
                fontSize: 16
              }
            }
          }
        }]
      }]
    };

    pieChart.setOption(pieOption);
    window.addEventListener("resize",function(){
      pieChart.resize();
    });
  }
  //------------------------- pieChart end ------------------------------//


  //------------------------- grid start ------------------------------//
  function showGrid() {
    $scope.gridOptions = {
      data: 'bikeParkDatas',
      enablePaging: true,
      rowHeight: 41,
      headerRowHeight: 36,
      multiSelect: false,
      // totalServerItems: 'totalServerItems',
      columnDefs: [
        {field: 'bikeId', displayName: '单车编号', width: '7%'},
        {field: 'operator', displayName: '运营方', width: '6%'},
        {field: 'userName', displayName: '违停人', width: '6%'},
        {field: 'idCardNum', displayName: '违停人身份证号', width: '9%'},
        {field: 'userPhoneNum', displayName: '违停人手机号', width: '7%'},
        {field: 'time', displayName: '违停时间', width: '9%', cellTemplate: '<div class="ngCellText ng-scope" >{{row.entity.time| date:"yyyy-MM-dd hh:mm:ss"}}</div>'},
        {field: 'userRespond', displayName: '违停人响应情况', width: '7%'},
        {field: 'userFine', displayName: '违停人罚款', width: '7%'},
        {field: 'opName', displayName: '运营方摆渡人', width: '7%'},
        {field: 'opPhoneNum', displayName: '摆渡人手机号', width: '7%'},
        {field: 'opRespond', displayName: '运营方响应情况', width: '7%'},
        {field: 'opFine', displayName: '运营方罚款', width: '7%'},
        {field: 'policeRespond', displayName: '警方响应情况', width: '7%'},
        {field: 'dealResult', displayName: '警方处理结果', width: '7%'}
      ]
    };
  }
  //------------------------- grid end ------------------------------//

}]);