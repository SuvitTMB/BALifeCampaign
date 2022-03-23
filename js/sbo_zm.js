

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
  dbBALife_ZM = firebase.firestore().collection("BALifeCampaign_SBO");
  loadZM();
  //UserRanking();
  //ListRanking();
}



function loadZM(){
  var i = 0;
  var sAchievement = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbBALife_ZM.where('EmpRH','==', sessionStorage.getItem("EmpSBO_RH"))
  .orderBy('TopQuarter','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      dataSet = [doc.data().EmpName, doc.data().EmpZone, addCommas(doc.data().CLMRTA_API.toFixed(0)) ,addCommas(doc.data().CLMRTA_Reward.toFixed(0)) ,addCommas(doc.data().TopQuarter.toFixed(0)), addCommas(doc.data().TopYear.toFixed(0)), doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "ชื่อ-สกุล" },
        { title: "ZONE" },
        { title: "CLMRTA_API", className: "txt-right" },
        { title: "CLMRTA_Reward", className: "txt-right"  },
        { title: "TopQuarter", className: "txt-center" },
        { title: "TopYear", className: "txt-center"  },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],

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
