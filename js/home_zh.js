


$(document).ready(function () {
  if(sessionStorage.getItem("EmpGroup_BAzh")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckData();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbBAlifeMember = firebase.firestore().collection("BAlifeMember_ZH");
}

var sActivePoint = 0;
var EidTNImember = "";
function CheckData() {
  var str = "";
  //console.log(sessionStorage.getItem("LineID"));
  dbBAlifeMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpBranch", doc.data().EmpBranch);
      sessionStorage.setItem("EmpZone", doc.data().EmpZone);
      sessionStorage.setItem("EmpRH", doc.data().EmpRH);
      sessionStorage.setItem("EmpGroup", doc.data().EmpGroup);

      var str1 = "";
      str1 += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:40px auto 20px auto;"></div>';
      str1 += '<div style="color:#002d63; font-size: 14px; font-weight: 600;"><center>'+ sessionStorage.getItem("EmpName")+'</div>';
      str1 += '<div style="color:#0056ff; font-size: 12px;padding:2px;font-weight: 600;line-height: 1.3;margin-bottom: 10px;">';
      str1 += 'Zone-'+ sessionStorage.getItem("EmpZone") +', '+ sessionStorage.getItem("EmpRH") +'</div>';
      str1 += '<div style="font-size: 12px; color:#f68b1f; margin:14px auto 0 auto;font-weight: 600;">อันดับล่าสุดของคุณ</div>';
      str1 += '<div style="color:#002d63; font-weight: 600;font-size: 11px;">'+ sessionStorage.getItem("BALifeDate") +'</div>';
      str1 += '<div class="btn-orange">อันดับใน ZONE<br>'+ addCommas(doc.data().RankingZH) +'</div>';
      str1 += '<div class="btn-blue">Achievement<br>'+ doc.data().Achievement +'</div>';
      $("#MyProfileID").html(str1);  

      str += '';
      str += '<div class="form-container" style="margin-top:-20px;"><div class="field-container" style="display: none;">';
      str += '<label for="expirationdate"><b>APE Net</b> '+sessionStorage.getItem("ReportMonth")+'</label>';
      str += '<input type="text" value="12,000 บาท" readonly></div><div class="field-container" style="display: none;">';
      str += '<label for="expirationdate"><b>คะแนนสะสม</b> '+sessionStorage.getItem("ReportMonth")+'</label>';
      str += '<input type="text" value="12,000 บาท" readonly></div>';

      str += '<div class="field-container"><label for="expirationdate"><b>คะแนนที่แลกได้</b></label>';
      str += '<input type="text" value="'+addCommas(doc.data().PointForRedeem.toFixed(0))+' คะแนน" readonly></div>';
      str += '<div class="field-container"><label for="securitycode"><b>งบสนับสนุน</b> '+sessionStorage.getItem("ReportMonth")+'</label>';
      str += '<input type="text" value="'+addCommas(doc.data().Reward.toFixed(0))+' คะแนน" readonly></div>';

      str += '<div class="field-container"><label for="expirationdate"><b>คะแนนสะสมยกมา</b></label>';
      str += '<input type="text" value="'+addCommas(doc.data().CarryPoint.toFixed(0))+' คะแนน" readonly></div>';
      str += '<div class="field-container"><label for="securitycode"><b>APE NET</b> '+sessionStorage.getItem("ReportMonth")+'</label>';
      str += '<input type="text" value="'+addCommas(doc.data().APENET.toFixed(0))+' บาท" readonly></div>';

      str += '<div class="field-container"><label for="expirationdate"><b>คะแนนสะสม</b> '+sessionStorage.getItem("ReportMonth")+'</label>';
      str += '<input type="text" value="'+addCommas(doc.data().MonthPoint.toFixed(0))+' คะแนน" readonly></div>';
      str += '<div class="field-container"><label for="securitycode"><b>รวมคะแนนสะสมทั้งหมด</b></label>';
      str += '<input type="text" value="'+addCommas(doc.data().TotalPoint.toFixed(0))+' คะแนน" readonly></div>';

      str += '<div class="field-container"><label for="expirationdate"><b>คะแนนคงเหลือยกไป</b></label>';
      str += '<input type="text" value="'+addCommas(doc.data().CarryForMonth.toFixed(0))+' คะแนน" readonly></div>';
      str += '<div class="field-container"><label for="securitycode"><b>Target BA Trip</b></label>';
      str += '<input type="text" value="'+addCommas(doc.data().TargetBATrip.toFixed(0))+' บาท" readonly></div>';


      str += '<div class="field-container"><label for="expirationdate"><b>Total APE Net - BA Trip</b></label>';
      str += '<input id="expirationdate" type="text" value="'+addCommas(doc.data().TotalAPENet.toFixed(0))+' บาท" readonly></div>';
      str += '<div class="field-container"><label for="expirationdate"><b>Total Point - BA Trip</b></label>';
      str += '<input id="expirationdate" type="text" value="'+addCommas(doc.data().TotalPoint.toFixed(0))+' คะแนน" readonly></div>';

      str += '<div class="field-container"><label for="expirationdate"><b>% Achievement</b></label>';
      str += '<input id="expirationdate" type="text" value="'+doc.data().Achievement+'" readonly></div>';
      str += '<div class="field-container"><label for="expirationdate"><b>Seat For Seller</b></label>';
      str += '<input id="expirationdate" type="text" value="'+addCommas(doc.data().SeatForSeller.toFixed(0))+' ที่นั่ง" readonly></div>';

      str += '</div>';
      $("#MyData1").html(str);  

    });
  });
}

var sCheckLevel = 0;
function CheckTNIapprove() {
    var str = "";
    dbBAlifeMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
    .limit(1)
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        sCheckLevel = doc.data().EmpLevel;
        sessionStorage.setItem("EmpLevel", doc.data().EmpLevel);
        location.href = 'home.html';
      });
    if(sCheckLevel==0) {
       WaitingPage();
    }
    });
}

function OpenForm() {
  if(CheckFoundData==1) {
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
  } else {
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  }
}

function EditData() {
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
}

function WaitingPage() {
  var str = "";
  str +='<center><div><img src="./img/timer.gif" width="250px;"></div>';
  str +='<div style="margin-top:20px;"><div class="text-waiting">เรียน <font color="#0056ff"><b>คุณ'+sessionStorage.getItem("EmpName")+'</b></font><br>';
  str +='<br><b><font color="#ff0000">คุณไม่ได้รับสิทธิ์ในการเข้าใช้งานเว็บไซต์นี้</font></b></div>';
  //str +='<div class="btn-t1" onclick="EditData()">คลิกเพื่อตรวจสอบข้อมูล</div>';
  str +='</div></center>';
  $("#MyWating").html(str);  
}

function ClickSaveProfile() {
  var sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }

  if(sCheckBottom==4) {
    SaveData();
  }
}

function SaveData() {
  NewDate();
  if(EidCYCProfile=="") {
    dbProfile.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      CYCStatus : 0,
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      EmpPhone : document.getElementById("txtEmpPhone").value,
      EmpGroup : document.getElementById("txtEmpGroup").value,
      DateRegister : dateString
    });
  } else {
    dbProfile.doc(EidCYCProfile).update({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      EmpPhone : document.getElementById("txtEmpPhone").value,
      EmpGroup : document.getElementById("txtEmpGroup").value,
      DateRegister : dateString
    });
  }
  CheckData();
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
}


function GotoRewards() {
  location.href = "rewards.html";
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
