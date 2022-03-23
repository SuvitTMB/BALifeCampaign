var cleararray = "";
var dbTNIStock = "";
var EidStockID = "";
var EidRedeem = "";
var EidRedeemPoint = "";
var sStockName = "";
var sStockRedeem = "";
var sStockImg = "";
var sStockDetail = "";
var OpenMenu = 0;
var PointForRedeem = 0;
var sTotalPointRedeem = 0;
var sTotalItemRedeem = 0;
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

$(document).ready(function () {
    if(sessionStorage.getItem("EmpLevel")==null) { location.href = "index.html"; }
    $("#DisplayLastPoint").html('<div class="btn-orange" style="margin-top:-4px;font-size: 14px;">คุณมี '+ addCommas(sessionStorage.getItem("ActivePoint")) +' Point</div>');
    document.getElementById("DisplayShowRewards").style.display = "block";
  	Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbTNIStock = firebase.firestore().collection("TNIStock");
  dbTNIStocklog = firebase.firestore().collection("TNIStocklog");
  dbTNIRedeemPoint = firebase.firestore().collection("TNIRedeemPoint");
  CheckRedeemPoint();
  LoadRewardStock();
  LoadNotOpen();
}


function CheckRedeemPoint() {
  dbTNIRedeemPoint.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidRedeemPoint = doc.id;
      sTotalPointRedeem = doc.data().TotalPointRedeem;
      sTotalItemRedeem = doc.data().TotalItemRedeem;
      sessionStorage.setItem("TotalPointRedeem", doc.data().TotalPointRedeem);
      sessionStorage.setItem("TotalItemRedeem", doc.data().TotalItemRedeem);
    });
    //alert(EidRedeemPoint+"==="+sTotalPointRedeem);
  });
}



function LoadRewardStock() {
  var i = 0;
  var str = "";
  var RatioPoint = sessionStorage.getItem("ActivePoint");
  //alert(sessionStorage.getItem("ActivePoint"));
  dbTNIStock.where('StockStatus','==',1)
  .orderBy('PointRedeem','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      var RatioPoint = 0;
      RatioPoint = ((parseFloat(sessionStorage.getItem("ActivePoint"))/parseFloat(doc.data().PointRedeem))*100);
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left">';
      str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().StockImg+'" class="img-fluid" style="border-radius: 10px;">';
      if(RatioPoint<100) {
        str += '<div class="progress"><div class="bar1" style="width:'+RatioPoint.toFixed(2)+'%">';
        str += '<p class="percent">'+RatioPoint.toFixed(2)+'%</p></div></div></div>';
        str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().StockName+'</div>';
        str += '<div class="boxvdo-line1">'+doc.data().StockDetail+'</div>';
        str += '<div class="boxvdo-line2"><div class="btn-t0" style="font-size:11px;">ใช้ '+addCommas(doc.data().PointRedeem)+' Point แลก</div>';
      } else {
        if(RatioPoint>100) { RatioPoint = 100; }
        str += '<div class="progress"><div class="bar" style="width:'+RatioPoint.toFixed(2)+'%">';
        str += '<p class="percent">'+RatioPoint.toFixed(2)+'%</p></div></div></div>';
        str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().StockName+'</div>';
        str += '<div class="boxvdo-line1">'+doc.data().StockDetail+'</div>';
        str += '<div class="boxvdo-line2"><div class="btn-t2" style="font-size:11px;" onclick="OpenRewards(\''+ doc.id +'\','+i+')">ใช้ '+addCommas(doc.data().PointRedeem)+' Point แลก</div>';
      }
      str += '</div></div></div></div>';
    });
    $("#DisplayShowRewards").html(str);
    document.getElementById("DisplayNotOpen").style.display = "block";
  });
}




function LoadNotOpen() {
  var i = 0;
  var str = "";
  var RatioPoint = sessionStorage.getItem("ActivePoint");
  //alert(sessionStorage.getItem("ActivePoint"));
  str += '<div class="clr"></div><center><div class="NameLine" style="margin:20px auto;"><u>รายการที่ยังไม่ได้เปิดให้แลก</u></div></center>';
  dbTNIStock.where('StockStatus','==',9)
  .orderBy('PointRedeem','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      var RatioPoint = 0;
      RatioPoint = ((parseFloat(sessionStorage.getItem("ActivePoint"))/parseFloat(doc.data().PointRedeem))*100);
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo imgblack" data-aos="fade-left">';
      str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().StockImg+'" class="img-fluid" style="border-radius: 10px;">';
      str += '<div class="progress"><div class="bar1" style="width:'+RatioPoint.toFixed(2)+'%">';
      str += '<p class="percent">'+RatioPoint.toFixed(2)+'%</p></div></div></div>';
      str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().StockName+'</div>';
      str += '<div class="boxvdo-line1">'+doc.data().StockDetail+'<br><font color="#ff0000">'+doc.data().memo+'</font></div>';
      str += '<div class="boxvdo-line2"><div class="btn-t0" style="font-size:11px;cursor: default;">ใช้ '+addCommas(doc.data().PointRedeem)+' Point แลก</div>';
      str += '</div></div></div></div>';
    });
    $("#DisplayNotOpen").html(str);
  });
}




function LoadRedeem() {
  var str = "";
  //str += '<center><div class="NameLine" style="color:#002d63;margin-bottom:10px;"><u>รายการที่รอการอนุมัติ</u></div></center>';
  dbTNIStocklog.where('EmpID','==',sessionStorage.getItem("EmpID"))
  .where('StatusRedeem','==',0)
  .orderBy('RedeemTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" style="min-height: 100px;">';
      str += '<div class="boxvdo-border member" style="min-height: 100px;"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().StockImg+'" class="img-fluid" style="border-radius: 10px;"></div>';
      str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().StockName+'</div>';
      str += '<div class="boxvdo-line1">'+doc.data().StockDetail+'</div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;">แลกรางวัลเมื่อ : '+doc.data().DateRedeem+'</div>';
      str += '</div></div></div>';
    });
    $("#DisplayRedeemRewards").html(str);
  });
}



function DoneRedeem() {
  var str = "";
  //str += '<center><div class="NameLine" style="color:#002d63;margin-bottom:10px;"><u>รายการแลกรางวัลของคุณ</u></div></center>';
  dbTNIStocklog.where('EmpID','==',sessionStorage.getItem("EmpID"))
  .where('StatusRedeem','==',1)
  .orderBy('RedeemTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" style="min-height: 100px;">';
      str += '<div class="boxvdo-border member" style="min-height: 100px;"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().StockImg+'" class="img-fluid" style="border-radius: 10px;"></div>';
      str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().StockName+'</div>';
      //str += '<div class="boxvdo-line1">'+doc.data().StockDetail+'</div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;margin-top:2px;">คะแนนก่อนแลก : <b>'+addCommas(doc.data().ActivePoint)+' Point</b></div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;">คะแนนที่ใช้แลก : <b>'+addCommas(doc.data().PointRedeem)+' Point</b></div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;">คะแนนคงเหลือ : <b>'+addCommas(doc.data().LastPoint)+' Point</b></div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;">แลกรางวัลเมื่อ : <b>'+doc.data().DateRedeem+'</b></div>';
      str += '<div class="boxvdo-line2" style="color:#f68b1f;height:16px;">รายการสำเร็จ : <b>'+doc.data().DateConfirm+'</b></div>';
      str += '</div></div></div>';
    });
    $("#DisplayDoneRewards").html(str);
  });
}



function OpenRewards(x) {
  dbTNIStock.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      //EidRedeem = doc.id;
      EidStockID = doc.id;
      PointForRedeem = doc.data().PointRedeem;
      sStockName = doc.data().StockName;
      sStockRedeem = doc.data().StockRedeem;
      sStockImg = doc.data().StockImg;
      sStockDetail = doc.data().StockDetail;

      $("#DisplayImg").html('<img src="'+doc.data().StockImg+'" width="100%">');
      $("#DisplayStockName").html('<div class="boxvdo-header" style="text-align:left;">'+doc.data().StockName+'</div>');
      $("#DisplayStockDetail").html('<div class="boxvdo-line1" style="text-align:left;height:auto;">'+doc.data().StockDetail+'</div>');
      $("#DisplayTotalRedeem").html(addCommas(doc.data().StockRedeem)+" item");
      $("#DisplayScorePoint").html(addCommas(sessionStorage.getItem("ActivePoint"))+" Point");
      $("#DisplayRedeemPoint").html(addCommas(doc.data().PointRedeem)+" Point");
      $("#DisplayTotalPoint").html(addCommas((sessionStorage.getItem("ActivePoint")-doc.data().PointRedeem))+" Point");
    });
  });
  document.getElementById("id01").style.display = "block";
}


function OpenStock(x,r) {
  location.href = "vdo-mondee.html?gid="+x+"";
}


function ClickMenu(x) {
  if(x==1) {
    $('#mm1').addClass('btnCheck');
    $('#mm2').removeClass('btnCheck');
    $('#mm3').removeClass('btnCheck');
    document.getElementById("DisplayShowRewards").style.display = "block";
    document.getElementById("DisplayNotOpen").style.display = "block";
    document.getElementById("DisplayRedeemRewards").style.display = "none";
    document.getElementById("DisplayDoneRewards").style.display = "none";
  } else if(x==2) { 
    $('#mm1').removeClass('btnCheck');
    $('#mm2').addClass('btnCheck');
    $('#mm3').removeClass('btnCheck');
    document.getElementById("DisplayShowRewards").style.display = "none";
    document.getElementById("DisplayNotOpen").style.display = "none";
    document.getElementById("DisplayRedeemRewards").style.display = "block";
    document.getElementById("DisplayDoneRewards").style.display = "none";
    LoadRedeem();
  } else if(x==3) { 
    $('#mm1').removeClass('btnCheck');
    $('#mm2').removeClass('btnCheck');
    $('#mm3').addClass('btnCheck');
    document.getElementById("DisplayShowRewards").style.display = "none";
    document.getElementById("DisplayNotOpen").style.display = "none";
    document.getElementById("DisplayRedeemRewards").style.display = "none";
    document.getElementById("DisplayDoneRewards").style.display = "block";
    DoneRedeem();
  }
}


function ConfirmRedeem() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbTNIStocklog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    StockName : sStockName,
    StockImg : sStockImg,
    StockDetail : sStockDetail,
    ActivePoint : parseFloat(sessionStorage.getItem("ActivePoint")),
    PointRedeem : parseFloat(PointForRedeem),
    LastPoint : parseFloat(sessionStorage.getItem("ActivePoint"))-parseFloat(PointForRedeem),
    DateRedeem : dateString,
    StatusRedeem : 0,
    DateConfirm : "",
    MemoConfirm : "",
    RedeemTimeStamp : TimeStampDate
  });
  dbTNIStock.doc(EidStockID).update({
    StockRedeem : parseFloat(sStockRedeem)+1
  });
  if(parseFloat(sessionStorage.getItem("ActivePoint"))>=parseFloat(PointForRedeem)) {
    dbTNIRedeemPoint.doc(EidRedeemPoint).update({
      TotalPointRedeem : parseFloat(sTotalPointRedeem)+parseFloat(PointForRedeem),
      TotalItemRedeem : parseFloat(sTotalItemRedeem)+1,
      DateRedeem : dateString
    });    
    CheckRedeemPoint();
    sessionStorage.setItem("ActivePoint", parseFloat(sessionStorage.getItem("ActivePoint"))-parseFloat(PointForRedeem) );
    $("#DisplayLastPoint").html('<div class="btn-orange" style="margin-top:-4px;font-size: 14px;">คุณมี '+ addCommas(sessionStorage.getItem("ActivePoint")) +' Point</div>');
    document.getElementById("DisplayShowRewards").style.display = "block";
    LoadRewardStock();
    document.getElementById('id01').style.display='none';
    document.getElementById('id02').style.display='block';
  }
  //alert("Save Done");
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
