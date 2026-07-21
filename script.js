// ===============================
// KONFIGURASI GOOGLE APPS SCRIPT
// ===============================

const API_URL = 
"https://script.google.com/macros/s/AKfycbxmXEmGD-lc-gHLFPFufWdq2gcGCRVtwoOoxP53m_fTLanKQG7ihTXLtT2CyNNJTSq5/exec";



// ===============================
// SCROLL KE BAGIAN KANDIDAT
// ===============================

function goVote(){

    document
    .getElementById("candidate")
    .scrollIntoView({

        behavior:"smooth"

    });

}


function checkVotingStatus(){


fetch(API_URL)


.then(res=>res.json())


.then(data=>{


if(data.status=="CLOSED"){


window.location.href =
"closed.html";


}


});


}

window.onload=function(){

checkVotingStatus();

loadResult();

countdown();

};

// ===============================
// KONFIRMASI SEBELUM VOTE
// ===============================

function confirmVote(kandidat){


    Swal.fire({

        title: "Konfirmasi Pilihan",

        text:
        "Apakah Anda yakin memilih " 
        + kandidat + "?",

        icon:"question",

        showCancelButton:true,

        confirmButtonText:
        "Ya, Pilih",

        cancelButtonText:
        "Batal"


    })
    .then((result)=>{


        if(result.isConfirmed){

            vote(kandidat);

        }


    });


}





// ===============================
// PROSES SIMPAN VOTE
// ===============================


function vote(kandidat){


    let nama =
    prompt(
        "Masukkan nama peserta:"
    );



    if(!nama || nama.trim()==""){


        Swal.fire({

            title:"Data belum lengkap",

            text:
            "Silakan masukkan nama Anda",

            icon:"warning"

        });


        return;


    }




    Swal.fire({

        title:"Mengirim suara...",

        text:
        "Mohon tunggu",

        allowOutsideClick:false,

        didOpen:()=>{

            Swal.showLoading();

        }

    });






    fetch(API_URL,{


        method:"POST",


        mode:"no-cors",


        headers:{


            "Content-Type":
            "application/json"


        },


        body:

        JSON.stringify({

            nama:
            nama.trim(),


            kandidat:
            kandidat


        })



    })



    .then(()=>{


        Swal.fire({

            title:
            "Terima Kasih!",


            text:
            "Suara Anda berhasil dicatat",


            icon:
            "success",


            confirmButtonText:
            "Selesai"


        });



        loadResult();



    })



    .catch(error=>{


        console.error(error);



        Swal.fire({

            title:
            "Terjadi Kesalahan",


            text:
            "Vote gagal dikirim",


            icon:
            "error"


        });


    });



}





// ===============================
// LOAD HASIL POLLING
// ===============================


function loadResult(){



    fetch(API_URL)



    .then(response=>response.json())



    .then(data=>{



        let kandidat1 =
        Number(data.kandidat1);



        let kandidat2 =
        Number(data.kandidat2);



        let total =
        kandidat1+kandidat2;




        let persen1 = 0;

        let persen2 = 0;




        if(total>0){


            persen1 =
            Math.round(
                (kandidat1/total)*100
            );



            persen2 =
            Math.round(
                (kandidat2/total)*100
            );



        }





        document
        .getElementById("hasil")
        .innerHTML = `



        <h3>
        Kandidat 1
        </h3>


        <p>
        ${kandidat1} Suara
        (${persen1}%)
        </p>



        <div class="progress">

            <div 
            id="bar1">
            </div>

        </div>





        <h3>
        Kandidat 2
        </h3>



        <p>
        ${kandidat2} Suara
        (${persen2}%)
        </p>




        <div class="progress">

            <div 
            id="bar2">
            </div>


        </div>



        <br>


        <h3>
        Total Pemilih:
        ${total}
        Orang
        </h3>



        `;





        let bar1 =
        document
        .getElementById("bar1");



        let bar2 =
        document
        .getElementById("bar2");




        if(bar1){

            bar1.style.width =
            persen1+"%";

        }




        if(bar2){

            bar2.style.width =
            persen2+"%";

        }



    })



    .catch(error=>{


        console.log(
        "Gagal mengambil data",
        error
        );


    });



}







// ===============================
// COUNTDOWN VOTING
// ===============================


// GANTI TANGGAL SESUAI JADWAL

const deadline = 
new Date(
"July 25, 2026 23:59:59"
)
.getTime();




function countdown(){



    let now =
    new Date()
    .getTime();



    let distance =
    deadline-now;



    if(distance<0){


        document
        .getElementById("timer")
        .innerHTML =

        "Voting Ditutup";


        return;


    }





    let hari =
    Math.floor(
        distance /
        (1000*60*60*24)
    );



    let jam =
    Math.floor(

        (distance %
        (1000*60*60*24))
        /
        (1000*60*60)

    );



    let menit =
    Math.floor(

        (distance %
        (1000*60*60))
        /
        (1000*60)

    );



    let detik =
    Math.floor(

        (distance %
        (1000*60))
        /
        1000

    );





    document
    .getElementById("timer")
    .innerHTML =


    hari+" Hari "+
    jam+" Jam "+
    menit+" Menit "+
    detik+" Detik";



}




// Jalankan countdown

setInterval(
countdown,
1000
);





// Load hasil saat halaman dibuka

window.onload=function(){


    loadResult();


    countdown();


};
