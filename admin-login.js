const API_URL =
"https://script.google.com/macros/s/GANTI_URL_APPSCRIPT/exec";



function login(){



let password =
document
.getElementById("password")
.value;



fetch(API_URL+"?action=login&password="+password)



.then(res=>res.json())


.then(data=>{



if(data.login){



localStorage.setItem(
"admin",
"true"
);



window.location=
"admin.html";



}

else{


alert(
"Password salah"
);


}



});



}
