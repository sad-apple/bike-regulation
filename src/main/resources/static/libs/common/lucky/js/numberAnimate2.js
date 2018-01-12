var x1 = 9999999; //总目标
var y1 = 999999; //总人目标
var z1 = 999999; //总车模标
var zong = 1245862; //总
var zongmen = 338462; //日人
var zongcar = 271572; //日车
var oZong = zong.toString();
var oZongmen = zongmen.toString();
var oZongcar = zongcar.toString();
var oX = x1.toString();
var oY = y1.toString();
var oZ = z1.toString();
var oNum = [oX, oY, oZ];

for (var i = -1; i < oNum.length; i++) {
  var text = '';
  if (i == 0) {
    for (var index = 0; index < oNum[i].length; index++) {
      text += '<i>' + oZong[index] + '</i>'
    }
    // text += '<span>' + oText[i] + '</span>';
    // $('.Inumber').eq(i).html(text);
    $("#numberS1").html(text);
  }
  if (i == 1) {
    for (var index = 0; index < oNum[i].length; index++) {
      text += '<i>' + oZongmen[index] + '</i>'
    }
    // text += '<span>' + oText[i] + '</span>';
    // $('.Inumber').eq(i).html(text);
    $("#numberS2").html(text);
  }
  if (i == 2) {
    for (var index = 0; index < oNum[i].length; index++) {
      text += '<i>' + oZongcar[index] + '</i>'
    }
    // text += '<span>' + oText[i] + '</span>';
    // $('.Inumber').eq(i).html(text);
    $("#numberS3").html(text);
  }
  // $('ul li').eq(i).html(text);
}
setNum('#numberS1 i', x1);
setNum('#numberS2 i', y1);
setNum('#numberS3 i', z1);
