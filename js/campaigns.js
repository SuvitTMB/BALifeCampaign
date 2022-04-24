$(document).ready(function () {
  if(sessionStorage.getItem("EmpLevel")==null) { location.href = "index.html"; }
  CheckDep();
});


function CheckDep() {
	var str = "";
	if(sessionStorage.getItem("EmpGroup")=="BBD") {
		str += '<center><div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/BA-01.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/BA-02.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/BA-03.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/BA-04.jpg" style="width:95%";></div></div></center>';
	} else if(sessionStorage.getItem("EmpGroup")=="WB") { 
		str += '<center><div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/WB-01.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/WB-02.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/WB-03.jpg" style="width:95%";></div></div>';
		str += '<div class="col-lg-6 col-md-2 slide text-center" data-aos="fade-left" style="margin-top:30px;">';
		str += '<div class="box-campaigns" style="margin-top:15px;">';
		str += '<img src="./img/WB-04.jpg" style="width:95%";></div></div>';
		str += '</center>';
	}
    $("#DisplayCampaign").html(str);
}


function OpenLink(x) {
  if(x==1) {
    window.open("https://www.ttbbank.com/th");
    //location.href = "https://www.ttbbank.com/th";
  } else if(x==2) { 
    window.open("https://www.ttbbank.com/th/fin-tips/mindful-spending-and-start-saving");
  }
}
