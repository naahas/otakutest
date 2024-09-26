


var app = new Vue({

    el: '#app',

    data: function() {
        return {
            testo:"nahass",
        }

    },


    methods: {


        launchTest: function() {
            $('#app').empty();

            var config = {
                method: 'post',
                url: '/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ message: 'start test' })  // Envoyer des données JSON, ici un simple objet avec une clé "message"


            };

            axios(config)
            .then(function (res) {

                setTimeout(() => {
                    displayTest(res.data) 
                }, 200);
               
            })
            .catch(function (err) {
                
            });

     


      
        }


    },

    created:  function() {
        

    },

   
    mounted: async function() {

   

    
    },


})











anime({
    targets: '#kokoid',
    translateY: [-50, 0],  
    opacity: [0, 1],     
    duration: 500,        
    easing: 'easeOutQuad', 
    complete: function() {

        anime({
            targets: '#kokobtn',
            opacity: [0, 1], // Le bouton passe de caché à visible
            duration: 800,
            easing: 'easeOutQuad',
        });  
        
    }
   
});





function displayTest(question) {

    var qdatadiv = document.createElement('div');
    qdatadiv.id = "qdatadivid";
    qdatadiv.classList.add('qdatadivclass');

    var main = document.getElementById('app');
    
    var qdata = document.createElement('p');
    qdata.textContent = question;
    qdata.classList.add('qdataclass');

    var yesbtn = document.createElement('button');
    yesbtn.innerHTML= 'OUI &nbsp; <i class="fa-solid fa-face-laugh-squint fa-fade"></i>';
    yesbtn.classList.add('dataresbtnclass');
    yesbtn.classList.add('dataresbtnclass1');

    var nobtn = document.createElement('button');
    nobtn.innerHTML = 'NON &nbsp; <i class="fa-solid fa-face-angry fa-fade"></i>';
    nobtn.classList.add('dataresbtnclass');
    nobtn.classList.add('dataresbtnclass2');


    yesbtn.addEventListener('click' , () => {
        document.getElementById('qdatadivid').remove()
        submitTestAnswer("yes");
    });


    nobtn.addEventListener('click' , () => {
        document.getElementById('qdatadivid').remove()
        submitTestAnswer("non");
    });


    qdatadiv.append(qdata , yesbtn , nobtn);

    main.append(qdatadiv)

    
   
}


function submitTestAnswer(ans) {
    $('.dataresbtnclass').prop('disabled' , true);

    var config = {
        method: 'post',
        url: '/submitAnswer',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ message: ans })  // Envoyer des données JSON, ici un simple objet avec une clé "message"


    };

    axios(config)
    .then(function (res) {
        if(res.data[0] == "off") endTest(res.data[1]);
        else displayTest(res.data[1])
    })
    .catch(function (err) {
        
    })
    .finally(() => {
        $('.dataresbtnclass').prop('disabled' , false);
    });
}



function endTest(point) {
    
    var pointdiv = document.createElement('div');
    pointdiv.classList.add('pointdivclass');

    var endtxt = document.createElement('p');
    endtxt.textContent = "Tu es un Otaku confirmé ! Tu sembles avoir été bercé dans cet univers depuis bien longtemps !"
    endtxt.classList.add('endtxtclass');

    var main = document.getElementById('app');
    var spanp = document.createElement('p');
    spanp.innerHTML = "Otaku Points : " + point;
    spanp.classList.add('resultclass');

    
    var endbtn = document.createElement('button');
    endbtn.classList.add('endbtnclass');
    endbtn.innerHTML = "REJOUER";


    var restartimg = document.createElement('img');
    restartimg.src = '/img/restart2.png';
    restartimg.classList.add('restartclass');

    restartimg.addEventListener('click' , () => {
        location.reload();
    });



    pointdiv.append(spanp , endtxt , restartimg);
    main.append(pointdiv);


}




function openInsta() {
    window.open('https://www.instagram.com/naahas__', '_blank');
  }