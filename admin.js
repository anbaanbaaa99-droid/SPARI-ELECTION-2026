const API_URL =
"https://script.google.com/macros/s/GANTI_URL_APPSCRIPT/exec";





function loadAdmin(){


fetch(API_URL)



.then(res=>res.json())


.then(data=>{


document
.getElementById("kandidat1")
.innerHTML=
data.kandidat1;



document
.getElementById("kandidat2")
.innerHTML=
data.kandidat2;



document
.getElementById("total")
.innerHTML=
data.total;





let persen1=0;

let persen2=0;



if(data.total>0){


persen1=
(data.kandidat1/data.total)*100;



persen2=
(data.kandidat2/data.total)*100;


}




document
.getElementById("chart1")
.style.width=
persen1+"%";



document
.getElementById("chart2")
.style.width=
persen2+"%";



});


}

if(
localStorage.getItem("admin")
!="true"

){

window.location=
"admin-login.html";

}



function exportCSV(){


window.open(API_URL+"?export=true");


}




window.onload=function(){


loadAdmin();


};
