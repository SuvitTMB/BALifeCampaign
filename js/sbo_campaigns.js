$(document).ready(function () {
  if(sessionStorage.getItem("EmpLevel_SBO")==null) { location.href = "index.html"; }
});

function OpenLink(x) {
  if(x==1) {
    window.open("https://www.ttbbank.com/th");
    //location.href = "https://www.ttbbank.com/th";
  } else if(x==2) { 
    window.open("https://www.ttbbank.com/th/fin-tips/mindful-spending-and-start-saving");
  }
}
