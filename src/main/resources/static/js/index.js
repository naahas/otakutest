


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
            targets: ['#kokobtn'],
            opacity: [0, 1], 
            duration: 800,
            easing: 'easeOutQuad',
        });  

        anime({
            targets: ["#subtxt"],
            opacity: [0, 0.9], 
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

    var main = document.getElementById('app');
    
    var pointdiv = document.createElement('div');
    pointdiv.classList.add('pointdivclass');

    var spanp = document.createElement('p');
    spanp.innerHTML = "LVL : " + point;
    spanp.classList.add('resultclass');

    var endtxt = document.createElement('p');

    if (point === 0) {
        endtxt.innerHTML = "Tu viens d'atterrir , tu as beaucoup de choses à découvrir alors qu'est-ce que tu attends ?";
    } else if (point > 0 && point <= 500) {
        endtxt.innerHTML = "Tu as déjà fait un premier pas, et il y a tant d'horizons à explorer ! Continue sur cette voie.";
    } else if (point > 500 && point <= 1500) {
        endtxt.innerHTML = "Tu as acquis des bases solides et commencer à dévelopepr certaines habitudes. Avec un peu plus d'exploration, tu deviendras un véritable expert !";
    } else if (point > 1500 && point <= 3000) {
        endtxt.innerHTML = "Impressionant ! Tu as atteint un niveau remarquable. Ton amour et ta passion peut se ressentir à travers ta personne !"
    } else if (point > 3000 && point <= 4000) {
        endtxt.innerHTML = "Véritable Otaku et Maître dans le domaine , ta passion pour cet univers est contagieuse !";
    } else if (point > 4000 && point <= 5500) {
        endtxt.innerHTML = "Légende et reconnu parmis tes proches comme étant un Otaku , ta passion n'a plus de limite !";
    } else {
        endtxt.innerHTML = "Wow, tu as dépassé toutes les attentes !";
    }

    
    endtxt.classList.add('endtxtclass');


    
    var endbtn = document.createElement('button');
    endbtn.classList.add('endbtnclass');
    endbtn.innerHTML = "REJOUER";




    var restartimg = document.createElement('img');
    restartimg.src = '/img/restart3.png';
    restartimg.classList.add('restartclass');

    restartimg.addEventListener('click' , () => {
        location.reload();
    });



    pointdiv.append(spanp , endtxt);
    main.append(pointdiv , restartimg);


}




function openSocial(stat) {
    if(stat == 1) window.open('https://www.instagram.com/naahas__', '_blank');
    else if(stat == 2) window.open('https://www.tiktok.com/@naahas__', '_blank');
         else window.open('https://www.instagram.com/naahas__', '_blank');
  }