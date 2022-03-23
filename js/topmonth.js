

$(document).ready(function () {
  if(sessionStorage.getItem("EmpLevel")==null) { location.href = "index.html"; }
  $("#BALifeDate").html(sessionStorage.getItem("BALifeDate"));  
  //alert(sessionStorage.getItem("EmpGroup"));
 	Connect_DB();
  //CheckTNIdate();
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
  dbTNInember = firebase.firestore().collection("BAlifeMember");
  UserRanking();
  ListRanking();
}


function UserRanking() {
  var str = "";
  dbTNInember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        str += '<div class="btn-leaderboard1" style="background:#002d63; color:#fff;">';
        str += '<div style="width:70%;float: left;line-height: 1.2;"><b>'+doc.data().EmpName+'</b><br>'+doc.data().EmpBranch+'<br>Zone-'+doc.data().EmpZone+' , '+doc.data().EmpRH+'</div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;">'+addCommas(doc.data().TopMonth)+'</div><div style="font-size:10px;color:#fff;">อันดับ</div></div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;">'+addCommas(doc.data().ThisPoint.toFixed(0))+'</div><div style="font-size:10px;color:#fff;">คะแนน</div></div>';
        str += '</div>';        
        $("#DisplayUserRanking").html(str);
    });
  });
}



function ListRanking() {
  var str = "";
  dbTNInember.where('EmpGroup','==',sessionStorage.getItem("EmpGroup"))
  .orderBy('TopYear','asc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().ThisPoint>0) {
        if(doc.data().EmpID==parseFloat(sessionStorage.getItem("EmpID"))) {
          str += '<div class="btn-leaderboard1" style="background:#f68b1f; color:#fff;">';
        } else {
          if(doc.data().TopMonth<4) {
            str += '<div class="btn-leaderboard1" style="background:#e6ecf8;">';
          } else {
            str += '<div class="btn-leaderboard1" style="background:#feebd5;">';
          }
        }
        str += '<div style="width:70%;float: left;line-height: 1.2;"><b>'+doc.data().EmpName+'</b><br>'+doc.data().EmpBranch+'<br>Zone-'+doc.data().EmpZone+' , '+doc.data().EmpRH+'</div>';
        str += '<div class="leader-rank"><div class="Rainking-number">'+addCommas(doc.data().TopMonth)+'</div><div style="font-size:10px;">อันดับ</div></div>';
        str += '<div class="leader-rank"><div class="Rainking-number">'+addCommas(doc.data().ThisPoint.toFixed(0))+'</div><div style="font-size:10px;">คะแนน</div></div>';
        str += '</div>';        
      }
    });
    $("#DisplayRanking").html(str);
  });
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
