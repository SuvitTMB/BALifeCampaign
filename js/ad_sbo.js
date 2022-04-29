

$(document).ready(function () {
  if(sessionStorage.getItem("EmpGroup_AD")==null) { location.href = "index.html"; }
  if(sessionStorage.getItem("EmpGroup_Admin")=="BBD") { 
    location.href = 'ad_rh.html';  
  } 
  $("#BALifeDate").html(sessionStorage.getItem("BALifeDate"));  
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
  dbBALife_ZM = firebase.firestore().collection("BALifeCampaign_SBO");
  AdminMenu();
  loadZM();
}


function AdminMenu() {
  var str = "";
  str += '<div style="max-width:400px;">';
  if(sessionStorage.getItem("EmpGroup_Admin")=="Admin") { 
    str += '<div class="iconlink1" onClick=window.location="ad_rh.html";>';
    str += '<div style="width:28px;"><img src="./img/report-1.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">RH</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_zh.html";>';
    str += '<div style="width:28px;"><img src="./img/report-2.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">ZH</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_ba.html";>';
    str += '<div style="width:28px;"><img src="./img/report-3.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">Branch</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_zmsbo.html";>';
    str += '<div style="width:28px;"><img src="./img/report-4.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">ZM-SBO</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_sbo.html"; style="background-color: #002d63;">';
    str += '<div style="width:28px;"><img src="./img/report-5.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">SBO</div></div>';
  } else if(sessionStorage.getItem("EmpGroup_Admin")=="BBD") { 
    str += '<div class="iconlink1" onClick=window.location="ad_rh.html";>';
    str += '<div style="width:28px;"><img src="./img/report-1.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">RH</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_zh.html";>';
    str += '<div style="width:28px;"><img src="./img/report-2.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">ZH</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_ba.html";>';
    str += '<div style="width:28px;"><img src="./img/report-3.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">Branch</div></div>';
  } else if(sessionStorage.getItem("EmpGroup_Admin")=="WB") { 
    str += '<div class="iconlink1" onClick=window.location="ad_zh.html";>';
    str += '<div style="width:28px;"><img src="./img/report-2.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">ZH</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_ba.html";>';
    str += '<div style="width:28px;"><img src="./img/report-3.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">Branch</div></div>';
  } else if(sessionStorage.getItem("EmpGroup_Admin")=="SBO") { 
    str += '<div class="iconlink1" onClick=window.location="ad_zmsbo.html";>';
    str += '<div style="width:28px;"><img src="./img/report-4.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">ZM-SBO</div></div>';
    str += '<div class="iconlink1" onClick=window.location="ad_sbo.html"; style="background-color: #002d63;">';
    str += '<div style="width:28px;"><img src="./img/report-5.png" style="width:22px;"></div>';
    str += '<div style="font-size: 11px;">SBO</div></div>';
  }
  str += '</div>';
  $("#DisplayMemu").html(str);  
}

function loadZM(){
  var i = 0;
  var sAchievement = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbBALife_ZM.where('EmpGroup','==', "SBO")
  .orderBy('TopQuarter','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      dataSet = [doc.data().EmpName, doc.data().EmpZone, doc.data().EmpRH, addCommas(doc.data().CLMRTA_API.toFixed(0)) ,addCommas(doc.data().CLMRTA_Reward.toFixed(0)) ,addCommas(doc.data().TopQuarter.toFixed(0)), addCommas(doc.data().TopYear.toFixed(0)), doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "ชื่อ-สกุล" },
        { title: "ZONE" },
        { title: "RH" },
        { title: "API", className: "txt-right" },
        { title: "Reward", className: "txt-right"  },
        { title: "Quarter", className: "txt-center" },
        { title: "Year", className: "txt-center"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [5] } ],
        order: [[ 5, 'asc']]
      });   
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
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
