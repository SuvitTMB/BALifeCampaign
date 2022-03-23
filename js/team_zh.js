

$(document).ready(function () {
  if(sessionStorage.getItem("EmpGroup_BAzh")==null) { location.href = "index.html"; }
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
  dbBALife_ZH = firebase.firestore().collection("BAlifeMember");
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
  dbBALife_ZH.where('EmpZone','==', sessionStorage.getItem("EmpZone"))
  .orderBy('TopMonth','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      dataSet = [doc.data().EmpName, doc.data().EmpBranch, addCommas(doc.data().APENET.toFixed(0)) ,addCommas(doc.data().TotalPoint.toFixed(0)) ,addCommas(doc.data().TopMonth.toFixed(0)), addCommas(doc.data().TopYear.toFixed(0)), doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "ชื่อ-สมุล" },
        { title: "สาขา" },
        { title: "APENET", className: "txt-right" },
        { title: "TotalPoint", className: "txt-right"  },
        { title: "TopMonth", className: "txt-right" },
        { title: "TopYear", className: "txt-right"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [4] } ],
        order: [[ 4, 'asc']]
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
