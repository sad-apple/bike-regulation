//lucky.js ====>2017年8月9日
'use strict';

function changeWindowfn() {
  var MAPW = $(window).width();
  var MAPH = $(window).height();
  var wWidthn1 = Math.round($(window).width() * 0.32 * 0.5);
  $("#numberScroll").css({
    marginLeft: -wWidthn1
  })
  if (MAPW < 992) {
    $(".slide-nav").css({
      top: '125px'
    })
  } else {
    $(".slide-nav").css({
      top: '90px'
    })
  }
}

// 数字显示样式（适用于串数字）
var formatNumber = function (n) {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) {
    return b;
  }
  var r = len % 3;
  return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
};

var formatNumberBack = function (n) {
  if (!isNaN(n)) {
    return n;
  } else {
    return parseInt(n.split(',').join(''));
  }
}

//每三位数字增加一个标签（可以自定义标签名div,仅适用于带标签分割的数字，不适用于串数字）
function threeDou(obj, div) {
  var a = $(obj).length;
  console.log(a);
  var x = '<' + div + '>' + ',' + '</' + div + '>';
  var m = 0;
  for (var n = a - 1; n > 0; n--) {
    m++;
    if (m % 3 == 0) {
      $(obj).eq(n).prepend(x);
    }
  }
}


function setNum(obj, num) {
  var n = new Array;
  var timer = new Object;
  var oString = num.toString();
  for (let i = 0; i < oString.length; i++) {
    n[i] = 0;
    timer[i] = setInterval(function () {
      n[i] = n[i] >= 9 ? 0 : n[i] + 1;
      $(obj).eq(i).html(n[i]);
      var text = '';
      for (let k = 0; k < oString.length; k++) {
        text += $(obj).eq(k).html();
      }
      if (text == num) {
        for (var each in timer) {
          clearInterval(timer[each]);
        }
      }
    }, 30 * Math.pow(10, oString.length - 1 - i));
  }
  // threeDou(obj,'i');
}

window.onresize = function () {
  changeWindowfn();
}

$(document).ready(function () {
  var wWidthn = Math.round($(window).width() * 0.32 * 0.5);
  $("#numberScroll").css({
    marginLeft: -wWidthn
  });
  numberHide();
  IndexTan4Ba();
  navOnHide();
  changeWindowfn();

});

function tableScrollFun() {
  var tableScrolleSpeed = 30;
  var demo = document.getElementById('tableScrollDemo');
  var demoA = document.getElementById("tableScrollDemoA");
  var demoB = document.getElementById("tableScrollDemoB");
  demoB.innerHTML = demoA.innerHTML;
  function Marquee() {
    if (demoB.offsetTop - demo.scrollTop <= 0) {
      demo.scrollTop -= demoA.offsetHeight;
    } else {
      demo.scrollTop++;
    }
  }

  var MyMar = setInterval(Marquee, tableScrolleSpeed);
  demo.onmouseover = function () {
    clearInterval(MyMar);
  }
  demo.onmouseout = function () {
    MyMar = setInterval(Marquee, tableScrolleSpeed);
  }
}

function numberShow() { //数字滚动模块显示
  $("#numberScroll").stop(true, true).animate({
    top: '130px',
    opacity: '1'
  }, 300);
}

function numberHide() { //数字滚动模块隐藏
  $("#numberScroll").stop(true, true).animate({
    top: '-320px',
    opacity: '0'
  }, 400);
}

function IndexTan4() { //四个首页图弹出
  var $TL = $("#indexTLid");
  var $TR = $("#indexTRid");
  var $BL = $("#indexBLid");
  var $BR = $("#indexBRid");
  $TL.animate({
    left: "2.5em",
    opacity: '1'
  }, 300);
  $TR.animate({
    right: "2.5em",
    opacity: '1'
  }, 300);
  $BL.animate({
    left: "2.5em",
    opacity: '1'
  }, 300);
  $BR.animate({
    right: "2.5em",
    opacity: '1'
  }, 300);
}

function IndexTan4Ba() { //四个首页图隐藏
  var $TL = $("#indexTLid");
  var $TR = $("#indexTRid");
  var $BL = $("#indexBLid");
  var $BR = $("#indexBRid");
  $TL.animate({
    left: "-36em",
    opacity: '0'
  }, 400);
  $TR.animate({
    right: "-36em",
    opacity: '0'
  }, 400);
  $BL.animate({
    left: "-36em",
    opacity: '0'
  }, 400);
  $BR.animate({
    right: "-36em",
    opacity: '0'
  }, 400);
}

function navOnHide() { // 顶部导航栏按钮选中状态消失fn
  $(".indexNavUl li").removeClass("on");
}

var menus = [
  { // 1单车2滴滴顺风车3快车，下同
    'id': 1001,
    'title': '车辆调度',
    'type': 1,
    'departMent': '城管局'
  },
  {
    'id': 1002,
    'title': '红色违停',
    'type': 1,
    'departMent': '公安局'
  },
  {
    'id': 1003,
    'title': '车身广告',
    'type': 1,
    'departMent': '城管局'
  },
  {
    'id': 1004,
    'title': '交通事故',
    'type': 1,
    'departMent': '公安局'
  },
  {
    'id': 1005,
    'title': '车辆数量',
    'type': 1,
    'departMent': '交通局'
  },
  {
    'id': 1006,
    'title': '车辆安全',
    'type': 1,
    'departMent': '公安局'
  },
  {
    'id': 1007,
    'title': '押金监管',
    'type': 1,
    'departMent': '金融办'
  },
  {
    'id': 1008,
    'title': '充值监管',
    'type': 1,
    'departMent': '金融办'
  },
  {
    'id': 1009,
    'title': '物价收费',
    'type': 1,
    'departMent': '物价局'
  },
  {
    'id': 1010,
    'title': '车辆质量',
    'type': 1,
    'departMent': '质监局'
  },
  {
    'id': 1011,
    'title': '电子围栏',
    'type': 1,
    'departMent': '规划局'
  },
  {
    'id': 1012,
    'title': '慢行交通',
    'type': 1,
    'departMent': '规划局'
  },
  {
    'id': 1013,
    'title': '区域停放',
    'type': 1,
    'departMent': '规划局'
  },
  {
    'id': 1014,
    'title': '税务监管',
    'type': 1,
    'departMent': '税务局'
  },
  {
    'id': 1015,
    'title': '车辆数量',
    'type': 2,
    'departMent': '交通局'
  },
  {
    'id': 1016,
    'title': '投诉纠纷',
    'type': 2,
    'departMent': '公安局'
  },
  {
    'id': 1017,
    'title': '交通事故',
    'type': 2,
    'departMent': '公安局'
  },
  {
    'id': 1018,
    'title': '物价收费',
    'type': 2,
    'departMent': '物价局'
  },
  {
    'id': 1019,
    'title': '税务监管',
    'type': 2,
    'departMent': '税务局'
  },
  {
    'id': 1020,
    'title': '车辆调度',
    'type': 3,
    'departMent': '城管局'
  },
  {
    'id': 1021,
    'title': '交通事故',
    'type': 3,
    'departMent': '公安局'
  },
  {
    'id': 1022,
    'title': '车辆数量',
    'type': 3,
    'departMent': '交通局'
  },
  {
    'id': 1023,
    'title': '车辆安全',
    'type': 3,
    'departMent': '公安局'
  },
  {
    'id': 1024,
    'title': '押金监管',
    'type': 3,
    'departMent': '金融办'
  },
  {
    'id': 1025,
    'title': '充值监管',
    'type': 3,
    'departMent': '金融办'
  },
  {
    'id': 1026,
    'title': '物价收费',
    'type': 3,
    'departMent': '物价局'
  },
  {
    'id': 1027,
    'title': '车辆质量',
    'type': 3,
    'departMent': '质监局'
  },
  {
    'id': 1028,
    'title': '车辆质量',
    'type': 3,
    'departMent': '质监局'
  },
  {
    'id': 1029,
    'title': '税务监管',
    'type': 3,
    'departMent': '税务局'
  }
];

function departMentFun(x) {// 筛选报表列表
  var h = $('.slide-danche-c').find('h2');// length == 28
  var a, b, c, i, n, p = 0;
  a = $('.slide-danche:eq(0)');
  b = $('.slide-danche:eq(1)');
  c = $('.slide-danche:eq(2)');
  for (var n = 0; n < h.length; n++) {
    h.eq(n).stop().hide();
  }
  if (x == '全部') {
    for (var n = 0; n < h.length; n++) {
      h.eq(n).stop().show();
    }
    return
  }
  for (var i = 0; i < menus.length; i++) {
    if (x == menus[i].departMent) {
      var m = 0;
      for (var n = 0; n < h.length; n++) {
        if (h.eq(n).attr('value') == menus[i].title + '1' || h.eq(n).attr('value') == menus[i].title + '2' || h.eq(n).attr('value') == menus[i].title + '3') {
          h.eq(n).show();
        }
      }
    }
  }
  slideDancheEq(a);
  slideDancheEq(b);
  slideDancheEq(c);
}

function slideDancheEq(x) {
  var i, p = 0;
  var xx = x.find('h2');
  for (var i = 0; i < xx.length; i++) {
    if (xx[i].style.display == "none") {
      p++;
    }
    if (p == i + 1) {
      x.addClass('hide');
    } else {
      x.removeClass('hide');
    }
  }
}

var lJudg = true;
var escJudg = false;
// document.onkeydown = function (event) {
//   //noinspection JSAnnotator
//   var e = event || window.event || arguments.callee.caller.arguments[0];
//   if (e && e.keyCode == 76) { // 按 L
//     escJudg = true;
//     if (lJudg) { //show
//       lJudg = false;
//       IndexTan4();
//       numberShow();
//     } else { //hide
//       lJudg = true;
//       IndexTan4Ba();
//       numberHide();
//     }
//   }
//   return
// };

$(".indexNavUl li").hover(
    function () {
      // IndexTan4Ba();
      // numberHide();
      var thisIndex = $(this).index();
      var dpm = this.textContent;
      $('.slide-nav').css({height: 'auto'}).removeClass('hide');
      $('#indexNavFirst').css({
        'display': 'block',
        "left": thisIndex * 11.1 + "%"
      })
      $(this).addClass('on').siblings().removeClass('on');
      $(".slide-nav").stop(true, true).slideDown();
      departMentFun(dpm);
    }
)

$('.indexTop-c').mouseleave(function () {
  $('#indexNavFirst').css({
    'display': 'none',
  })
  $(".indexNavUl li").removeClass('on');
  $(".slide-nav").stop().slideUp(500);
  $('.indexNav-b').addClass('hidden');
})

$('.hide-nav').click(function () {
  $('.indexNav-b').toggleClass('hidden');
  if ($('.indexNav-b').hasClass('hidden')) {
    $(".slide-nav").stop(true, true).slideUp();
  }
})

$('.slide-danche-c h2').click(function () {
  IndexTan4Ba();
  numberHide();
  $(".slide-nav").stop(true, true).slideUp();
})