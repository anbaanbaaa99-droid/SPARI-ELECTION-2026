const PASSWORD =
"SPARI2026";



function login(){


let input =
document
.getElementById("password")
.value;



if(input == PASSWORD){


localStorage
.setItem(
"admin",
"true"
);



window.location =
"admin.html";


}

else{


alert(
"Password salah"
);


}



}
