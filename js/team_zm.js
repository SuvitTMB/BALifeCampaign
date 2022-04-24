

$(document).ready(function () {
  if(sessionStorage.getItem("EmpLevel_SBOzm")==null) { location.href = "index.html"; }
  //alert(sessionStorage.getItem("EmpSBO_RH"));
  //alert(sessionStorage.getItem("EmpZone"));
  $("#BALifeDate").html(sessionStorage.getItem("BALifeDate"));  
  //alert(sessionStorage.getItem("EmpGroup"));
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
  dbBALife_ZH = firebase.firestore().collection("BALifeCampaign_SBOZM");
  loadZH();
  //UserRanking();
  //ListRanking();
}



function loadZH(){
  var i = 0;
  var sAchievement = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbBALife_ZH.where('EmpGroup','==', sessionStorage.getItem("EmpGroup_SBO"))
  .orderBy('APICL','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      dataSet = [doc.data().EmpZone, doc.data().EmpRH, doc.data().AchCL ,addCommas(doc.data().TargetCL.toFixed(0)) ,addCommas(doc.data().APICL.toFixed(0)), doc.data().RewardCL, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "Zone" },
        { title: "RH", className: "txt-center" },
        { title: "AchCL", className: "txt-center" },
        { title: "Target CL", className: "txt-right"  },
        { title: "APICL", className: "txt-right" },
        { title: "RewardCL", className: "txt-right"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [2] } ],
        order: [[ 2, 'desc']]
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
