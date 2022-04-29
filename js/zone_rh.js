

$(document).ready(function () {
  if(sessionStorage.getItem("EmpGroup_BArh")==null) { location.href = "index.html"; }
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
  dbBALife_ZH = firebase.firestore().collection("BAlifeMember_ZH");
  loadZH();
  //UserRanking();
  //ListRanking();
}



function loadZH(){
  //alert(sessionStorage.getItem("EmpGroup_RH"));
  var i = 0;
  var sAchievement = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  //dbBALife_ZH.where('EmpGroup','==', sessionStorage.getItem("EmpGroup_BA"))
  dbBALife_ZH.where('EmpRH','==', sessionStorage.getItem("EmpGroup_RH"))
  .orderBy('RankingZH','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      //sAchievement = addCommas(doc.data().Achievement);
      dataSet = [doc.data().EmpZone, doc.data().EmpRH, doc.data().RankingZH ,addCommas(doc.data().TargetBATrip.toFixed(0)) ,addCommas(doc.data().TotalAPENet.toFixed(0)), doc.data().Achievement, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "Zone" },
        { title: "RH", className: "txt-center" },
        { title: "Ranking", className: "txt-center" },
        { title: "Target BA", className: "txt-right"  },
        { title: "Total APE Net", className: "txt-right" },
        { title: "%เป้าหมาย", className: "txt-right"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [2] } ],
        order: [[ 2, 'asc']]
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
