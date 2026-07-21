
const API_URL =
"MASUKKAN_URL_APPSCRIPT_DISINI";



function goVote(){

document
.getElementById("candidate")
.scrollIntoView({

behavior:"smooth"

});

}





function vote(kandidat){


let nama =
prompt(
"Masukkan nama peserta"
);



if(!nama){

return;

}



fetch(API_URL,{

method:"POST",

body:JSON.stringify({

nama:nama,

kandidat:kandidat

})

})


.then(res=>res.json())


.then(data=>{


alert(
"Vote berhasil disimpan!"
);


loadResult();


});


}





function loadResult(){


fetch(API_URL)


.then(res=>res.json())


.then(data=>{


let total =
data.kandidat1 +
data.kandidat2;



document
.getElementById("hasil")
.innerHTML=`

<h3>
Kandidat 1 :
${data.kandidat1}
suara
</h3>


<h3>
Kandidat 2 :
${data.kandidat2}
suara
</h3>


<p>
Total Peserta :
${total}
</p>


`;

});


}



loadResult();
