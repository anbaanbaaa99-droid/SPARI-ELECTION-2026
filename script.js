
const API_URL =
"https://script.google.com/macros/s/AKfycbxmXEmGD-lc-gHLFPFufWdq2gcGCRVtwoOoxP53m_fTLanKQG7ihTXLtT2CyNNJTSq5/exec";



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

const deadline =
new Date(
"July 25, 2026 23:59:59"
).getTime();



setInterval(()=>{


let now =
new Date()
.getTime();



let distance =
deadline-now;



let day =
Math.floor(
distance/(1000*60*60*24)
);



let hour =
Math.floor(
(distance%(1000*60*60*24))
/(1000*60*60)
);



let minute =
Math.floor(
(distance%(1000*60*60))
/(1000*60)
);



let second =
Math.floor(
(distance%(1000*60))
/1000
);



document
.getElementById("timer")
.innerHTML=

day+" Hari "+
hour+" Jam "+
minute+" Menit "+
second+" Detik";



},1000);




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
