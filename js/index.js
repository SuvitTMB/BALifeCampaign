var i = 0;
var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
var stxtEmpGroup = "";
var dbProfile = "";
var CheckFoundData = 0;
var EidProfile = "";
var dateString = "";
var sDateRegister = "";
var sCheckRedeemPoint = 0;
var sCheckTNIapprove = 0
var sCheckLevel = 0;
var sCodeName = "";
var sDisplayDate = "";
var sMemberlog = "";
const x = document.querySelectorAll(`div.com[min="${i}"]`);



$(document).ready(function () {
  //sessionStorage.clear();

/*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/  
  
  main();
});



async function main() {
  await liff.init({ liffId: "1655966947-jgGrdY14" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbTNIdate = firebase.firestore().collection("TNIdate");
  dbBAlifeMember = firebase.firestore().collection("BAlifeMember");
  dbBAlifeMember_SBO = firebase.firestore().collection("BALifeCampaign_SBO");
  dbBAlifeMember_SBOZM = firebase.firestore().collection("BALifeCampaign_SBOZM");
  dbBAlifeMember_BAzh = firebase.firestore().collection("BAlifeMember_ZH");
  dbBAlifeMember_BArh = firebase.firestore().collection("BAlifeMember_RH");
  dbBAlifeMember_AD = firebase.firestore().collection("BAlifeMember_AD");
  dbBAlifeMember_log = firebase.firestore().collection("BAlifeMember_log");
  CheckData();
}



var CheckFoundData = 0;
function CheckData() {
  //console.log(sessionStorage.getItem("LineID"));
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      sessionStorage.setItem("EmpName", doc.data().empName);
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        sDateRegister = doc.data().DateRegister;
        sessionStorage.setItem("EmpID", doc.data().empID);
        document.getElementById("txtEmpID").value = doc.data().empID;
        document.getElementById("txtEmpName").value = doc.data().empName;
        document.getElementById("txtEmpPhone").value = doc.data().empPhone;
        document.getElementById("txtEmpGroup").value = doc.data().empGroup;
        CheckTNIapprove();
      } else {
        CheckFoundData = doc.data().statusconfirm;
        WaitingPage();
      }
    });
    if(CheckFoundData==0) {
      document.getElementById('Loading').style.display='none';
      document.getElementById('myTimer').style.display='none';
      document.getElementById('WaitingPage').style.display='none';
      document.getElementById('myRegister').style.display='block';
    }
  });
}


/*
var CheckFoundData = 0;
function CheckData() {
  //console.log(sessionStorage.getItem("LineID"));
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      document.getElementById("txtEmpGroup").value = doc.data().empGroup;
      if(doc.data().statusconfirm==1) {
        CheckTNIapprove();
      } else {
        CheckFoundData = doc.data().statusconfirm;
        WaitingPage();
      }
    });
    if(CheckFoundData==0) {
      document.getElementById('Loading').style.display='none';
      document.getElementById('WaitingPage').style.display='none';
      document.getElementById('myRegister').style.display='block';
    }
  });
}
*/




/*

function NotUserSystem() {
  document.getElementById('Loading').style.display='none';
  document.getElementById('NotPass').style.display='block';
}
*/

function CheckTNIdate(x) {
  dbTNIdate.where('CodeName','==',x)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      $("#ReportMonth").html(doc.data().ReportMonth);  
      $("#ReportQMonth").html(doc.data().ReportQMonth);  
      $("#ReportQ").html(doc.data().ReportQ);  
      sessionStorage.setItem("BALifeDate", doc.data().DateUpload);
      sessionStorage.setItem("ReportMonth", doc.data().ReportMonth);
      sessionStorage.setItem("ReportQMonth", doc.data().ReportQMonth);
      sessionStorage.setItem("ReportQ", doc.data().ReportQ);
      sessionStorage.setItem("ReportYear", doc.data().ReportYear);
      $("#BALifeDate").html(sessionStorage.getItem("BALifeDate"));  
      sDisplayDate = sessionStorage.getItem("BALifeDate");
    });
  });
}


var sTNIapprove = 0;
function CheckTNIapprove() {
  //alert("pass"+sessionStorage.getItem("EmpID"));
  dbBAlifeMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 1 - "+doc.data().EmpGroup;
      SaveBA_Log();
      sCodeName = "BALifeCampaign_BBD";
      CheckTNIdate(sCodeName);
      sTNIapprove = 1
      sessionStorage.setItem("EmpGroup", doc.data().EmpGroup);
      sessionStorage.setItem("EmpLevel", 1);
      var str = "";
      str += '<div><div class="NameLine">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#ffffff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup") +' Group "</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">ทุกเดือนคะแนนจะถูกเปลี่ยนเป็นเงินรางวัลตามเกณฑ์ที่กำหนด<br>ส่วนต่างของคะแนนที่เหลือจะถูกยกไปสะสมต่อในเดือนถัดไป</div>';
      str += '<div><img src="./img/bbd.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage").html(str);  
      document.getElementById('id02').style.display='block';
    });
    if(sTNIapprove==0) {
       CheckTNIapprove_sbo();
    }
  });
}



var sTNIapprove_SBO = 0;
function CheckTNIapprove_sbo() {
      //alert("pass"+sessionStorage.getItem("EmpID"));
  dbBAlifeMember_SBO.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 2 - "+doc.data().EmpGroup;
      SaveBA_Log();
      sCodeName = "BALifeCampaign_SBO";
      CheckTNIdate(sCodeName);
      sTNIapprove_SBO = 1
      sessionStorage.setItem("EmpGroup_SBO", doc.data().EmpGroup);
      sessionStorage.setItem("EmpLevel_SBO", 1);
      //alert(sDisplayDate);
      var str = "";
      str += '<div><div class="NameLine" style="color:#ffffff;">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#0056ff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup_SBO") +' Group "</div>';
      //str += '<div style="font-weight:600;color:#002d63;">'+ sessionStorage.getItem("BALifeDate") +'</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">เมื่อสิ้นสุดไตรมาส คะแนนสะสมจะถูกคำนวณเป็นเงินรางวัล กรณีมีคะแนนส่วนต่างจะไม่นำมาคำนวณเป็นรางวัล</div>';
      str += '<div><img src="./img/sbo-gif.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink_SBO()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage_SBO").html(str);  
      document.getElementById('id03').style.display='block';
    });
    if(sTNIapprove_SBO==0) {
      CheckTNIapprove_BAzh();
      //WaitingPage();
    }
  });
}



var sTNIapprove_BAzh = 0;
function CheckTNIapprove_BAzh() {
  dbBAlifeMember_BAzh.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 3 - ZH "+doc.data().EmpGroup;
      SaveBA_Log();
      sCodeName = "BALifeCampaign_BBD";
      CheckTNIdate(sCodeName);
      sTNIapprove_BAzh = 1
      sessionStorage.setItem("EmpGroup_BA", doc.data().EmpGroup);
      sessionStorage.setItem("EmpGroup_BAzh", "Zone Head");
      sessionStorage.setItem("EmpLevel_BAzh", 1);
      var str = "";
      str += '<div><div class="NameLine" style="color:#f68b1f;">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#ffffff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup_BAzh") +' "</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">ทุกเดือนคะแนนจะถูกเปลี่ยนเป็นเงินรางวัลตามเกณฑ์ที่กำหนด<br>ส่วนต่างของคะแนนที่เหลือจะถูกยกไปสะสมต่อในเดือนถัดไป</div>';
      str += '<div><img src="./img/BAzh-gif.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink_BAzh()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage_BAzh").html(str);  
      document.getElementById('id04').style.display='block';
    });
    if(sTNIapprove_BAzh==0) {
      CheckTNIapprove_BArh();
      //WaitingPage()
    }
  });
}


var sTNIapprove_BArh = 0;
function CheckTNIapprove_BArh() {
      //alert("pass"+sessionStorage.getItem("EmpID"));
  dbBAlifeMember_BArh.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 4 - RH "+doc.data().EmpGroup;
      SaveBA_Log();
      sCodeName = "BALifeCampaign_BBD";
      CheckTNIdate(sCodeName);
      sTNIapprove_BArh = 1
      sessionStorage.setItem("EmpGroup_BA", doc.data().EmpGroup);
      sessionStorage.setItem("EmpGroup_BArh", "RH Group");
      sessionStorage.setItem("EmpLevel_BArh", 1);
      var str = "";
      str += '<div><div class="NameLine" style="color:#f68b1f;">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#0056ff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup_BArh") +' "</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">ทุกเดือนคะแนนจะถูกเปลี่ยนเป็นเงินรางวัลตามเกณฑ์ที่กำหนด<br>ส่วนต่างของคะแนนที่เหลือจะถูกยกไปสะสมต่อในเดือนถัดไป</div>';
      str += '<div><img src="./img/rh-gif.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink_BArh()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage_BArh").html(str);  
      document.getElementById('id05').style.display='block';
    });
    if(sTNIapprove_BArh==0) {
      CheckTNIapprove_sboZM();
    }
  });
}



var sTNIapprove_SBOZM = 0;
function CheckTNIapprove_sboZM() {
      //alert("pass"+sessionStorage.getItem("EmpID"));
  dbBAlifeMember_SBOZM.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 5 - ZM "+doc.data().EmpGroup;
      SaveBA_Log();
      sCodeName = "BALifeCampaign_SBO";
      CheckTNIdate(sCodeName);
      sTNIapprove_SBOZM = 1
      sessionStorage.setItem("EmpGroup_SBOzm", "ZM-SBO Group");
      sessionStorage.setItem("EmpGroup_SBO", doc.data().EmpGroup);
      sessionStorage.setItem("EmpSBO_RH", doc.data().EmpRH);
      sessionStorage.setItem("EmpLevel_SBOzm", 1);
      //alert(sDisplayDate);
      var str = "";
      str += '<div><div class="NameLine" style="color:#f68b1f;">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#fff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup_SBOzm") +'"</div>';
      //str += '<div style="font-weight:600;color:#002d63;">'+ sessionStorage.getItem("BALifeDate") +'</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">เมื่อสิ้นสุดไตรมาส คะแนนสะสมจะถูกคำนวณเป็นเงินรางวัล กรณีมีคะแนนส่วนต่างจะไม่นำมาคำนวณเป็นรางวัล</div>';
      str += '<div><img src="./img/admin-gif.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink_SBOZM()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage_SBOZM").html(str);  
      document.getElementById('id06').style.display='block';
    });
    if(sTNIapprove_SBOZM==0) {
      CheckTNIapprove_AD();
      //WaitingPage();
    }
  });
}



var sTNIapprove_AD = 0;
function CheckTNIapprove_AD() {
      //alert("pass"+sessionStorage.getItem("EmpID"));
  dbBAlifeMember_AD.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sMemberlog = "Program 6 - Admin";
      SaveBA_Log();
      sCodeName = "BALifeCampaign_BBD";
      CheckTNIdate(sCodeName);
      sTNIapprove_AD = 1
      sessionStorage.setItem("EmpGroup_AD", "Admin Group");
      //sessionStorage.setItem("EmpGroup_SBO", doc.data().EmpGroup);
      sessionStorage.setItem("EmpID_Admin", doc.data().EmpID);
      sessionStorage.setItem("EmpName_Admin", doc.data().EmpName);
      sessionStorage.setItem("EmpGroup_Admin", doc.data().EmpGroup);
      //sessionStorage.setItem("EmpLevel_SBOzm", 1);
      //alert(sDisplayDate);
      var str = "";
      str += '<div><div class="NameLine" style="color:#f68b1f;">ยินดีต้อนรับสู่ BA Life Sale Campaign Y2022</div>';
      str += '<div class="NameLine" style="color:#fff;">'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="color:#002d63; font-size:15px; padding:2px 10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup_AD") +'"</div>';
      //str += '<div style="font-weight:600;color:#002d63;">'+ sessionStorage.getItem("BALifeDate") +'</div>';
      str += '<div style="font-size: 11px; color:#000000;margin-top:15px;">ทุกเดือนคะแนนจะถูกเปลี่ยนเป็นเงินรางวัลตามเกณฑ์ที่กำหนด<br>ส่วนต่างของคะแนนที่เหลือจะถูกยกไปสะสมต่อในเดือนถัดไป</div>';
      str += '<div><img src="./img/report-gif.gif" style="width:100%;margin-top:15px;"></div>';
      str += '<di></div>';
      str += '<div class="btn-t2" onclick="GotoLink_AD()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
      str += '<div style="height: 15px;"></div>';
      str += '</div>';
      $("#WelcomePage_Admin").html(str);  
      document.getElementById('id07').style.display='block';
    });
    if(sTNIapprove_AD==0) {
      WaitingPage();
    }
  });
}



function WaitingPage() {
  //alert(CheckFoundData);
  var str = "";
  str +='<center><div><img src="./img/stop.png" width="250px;"></div>';
  str +='<div style="margin-top:20px;"><br><div class="text-waiting">เรียน <font color="#0056ff"><b>คุณ'+sessionStorage.getItem("EmpName")+'</b></font>';
  if(CheckFoundData==2) {
    str +='<br><b><font color="#ff0000">คุณยังไม่ได้รับสิทธิ์ในการเข้าใช้งานระบบนี้<br>โปรดรอการอนุมัติภายใน 24 ชั่วโมง</font></b></div>';
  } else {
    str +='<br><b><font color="#ff0000">คุณไม่ได้รับสิทธิ์ในการเข้าใช้งานระบบนี้</font></b></div>';
    str +='<a href="mailto:suvit.cha@ttbbank.com&subject=แจ้งขอใช้ระบบงานของ LINE Retail Society&body=กรุณาระบุเหตุผลที่ต้องการใช้งาน" style="text-decoration: none;"><div class="btn-t2">แจ้งเราหากคุณต้องการใช้งาน</div></a>';
  }
  //str +='<div class="btn-t1" onclick="EditData()">คลิกเพื่อตรวจสอบข้อมูล</div>';
  str +='</div></center>';
  $("#MyWatingPage").html(str);  
  document.getElementById('Loading').style.display='none';
  document.getElementById('myRegister').style.display='none';
  document.getElementById('WaitingPage').style.display='block';
}
/*

function WaitingPage() {
  var str = "";
  str +='<center><div><img src="./img/stop.png" width="250px;"></div>';
  str +='<div style="margin-top:20px;"><br><div class="text-waiting">เรียน <font color="#0056ff"><b>คุณ'+sessionStorage.getItem("EmpName")+'</b></font>';
  str +='<br><b><font color="#ff0000">คุณไม่ได้รับสิทธิ์ในการเข้าใช้งานเว็บไซต์นี้</font></b></div>';
  //str +='<div class="btn-t1" onclick="EditData()">คลิกเพื่อตรวจสอบข้อมูล</div>';
  str +='</div></center>';
  $("#MyWatingPage").html(str);  
  document.getElementById('Loading').style.display='none';
  document.getElementById('WaitingPage').style.display='block';
}
*/

function ClickSaveProfile() {
  var sCheckBottom = 0;
  //alert($("input[type=checkbox][id=cb1]:checked").val());
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
  if(EidProfile=="") {
    alert("New User");
    dbProfile.add({
/*
      lineID : sessionStorage.getItem("LineID"),
      lineName : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      empRH : document.getElementById("txtEmpGroup").value,
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      empAddress : '',
      lastcheckin : '',
      memo : '',
      empBr : '',
      DateRegister : dateString,
      RegisterDate : dateString
*/
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empAddress : '',
      //StatusRegister : 0;
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      empAddress : '',
      lastcheckin : '',
      memo : '',
      empBr : 'BBD',
      DateRegister : dateString


    });
  }
  CheckData();
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
}



function GotoLink() {
  location.href = 'home.html';
}

function GotoLink_SBO() {
  location.href = 'sbo.html';
}

function GotoLink_BAzh() {
  location.href = 'home_zh.html';
}

function GotoLink_BArh() {
  location.href = 'home_rh.html';
}

function GotoLink_SBOZM() {
  location.href = 'home_sbozm.html';  
}

function GotoLink_AD() {
  location.href = 'ad_rh.html';  
}


function SaveBA_Log() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbBAlifeMember_log.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    EmpName : sessionStorage.getItem("EmpName"),
    PageVisit : sMemberlog,
    LogDateTime : dateString,
    LogTimeStamp : TimeStampDate
  });
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
  document.getElementById('id06').style.display='none';
  document.getElementById('id07').style.display='none';
  document.getElementById('NotPass').style.display='none';
}
