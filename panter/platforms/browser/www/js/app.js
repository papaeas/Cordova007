
 
  var firebaseConfig = {
    apiKey: "AIzaSyANJUsvkZeNUXBy9rtap_A8lLugqg8v-j4",
    authDomain: "food042.firebaseapp.com",
    databaseURL: "https://food042.firebaseio.com",
    projectId: "food042",
    storageBucket: "food042.appspot.com",
    messagingSenderId: "272795893794",
    appId: "1:272795893794:web:d35a5b2f8b176df5ce8a7b",
    measurementId: "G-F7ZLXL0PN0"
  };
  firebase.initializeApp(firebaseConfig);
  


var db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

document.addEventListener('init', function (event) {
  var page = event.target;
 

  if (page.id === 'homePage') {
    console.log("homePage");

    $("#thaibtn").click(function () {
      localStorage.setItem("selectedCategory", "thai");
      $("#content")[0].load("category.html");
    });
    
    $("#An").click(function () {
      $("#content")[0].load("anti.html");
    });

    $("#drinkbtn").click(function () {
      localStorage.setItem("selectedCategory", "drink");
      $("#content")[0].load("category.html");
    });

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });
   
  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
    
    $("#ad").click(function () {
      $("#content")[0].load("address.html");
      $("#sidemenu")[0].close();
    });
  }

  if (page.id === 'categoryPage') {
    var category = localStorage.getItem("selectedCategory");
    console.log("categoryPage:" + category);

    $("#header").html(category);

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#list").empty();
    db.collection("recommended").where("category", "==", category).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-row class="category">
                <ons-col modifier="nodivider">
                    <div class="category_header" style="background-image: url('${doc.data().photoUrl}')">
                        <figure class="category_thumbnail" id="thaibtn">
                            <div class="category_title" id="Category_1_name">${doc.data().name}</div>
                        </figure>
                    </div>
                </ons-col>
         </ons-row>`
        $("#list").append(item);
        console.log(doc.data().name);
        
      });
    });

  }

  if (page.id === 'loginPage') {
    console.log("loginPage");
    
    $("#reigterbt").click(function () {
      $("#content")[0].load("regist.html");
    });
    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");
    });
    $("#loginbt").click(function () {
      $("#content")[0].load("home.html");
    });
  
    $("#signinG").click(function () {
    
      firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  $("#content")[0].load("home.html");
}).catch(function(error) {

 
    });
  });
}

if (page.id === 'An') {
console.log(page.id);

  $("#bhome").click(function () {
    $("#content")[0].load("home.html");
 
  });

}
if (page.id === 'regist') {

  
    $("#regi").click(function () {
      $("#content")[0].load("login.html");
   
    });
  
  }
  if (page.id === 'addressPage') {
    console.log("addressPage");
    var lat , selectedLat;
    var lng , selectedLng;

    var onSuccess = function (position) {
       lat = position.coords.latitude ;
       lng = position.coords.longitude;
        
            mapboxgl.accessToken = 'pk.eyJ1IjoicGFwYWVhczEiLCJhIjoiY2szMDlub2pkMDl3ZDNiazBkYW12ZTlmMSJ9.wmO9DOciBuKLdz1wpOvh3g';
            var map = new mapboxgl.Map({
                container: 'map', // container id
                style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                center: [lng, lat], // starting position [lng, lat]
                zoom: 13 // starting zoom
    
            });

            var marker = new mapboxgl.Marker({
                draggable: true
                })
                .setLngLat([lng, lat])
                .addTo(map);
                 
                function onDragEnd() {
                var lngLat = marker.getLngLat();
                selectedLat = lngLat.lat;
                selectedLng =  lngLat.lng;
                coordinates.style.display = 'block';
                coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
                }
                 
                marker.on('dragend', onDragEnd);

    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    $("#setAdd").click(function () {
        if (selectedLng!=null) {
            ons.notification.alert("long"+selectedLng+"<br />lat"+selectedLat);
            $("#content")[0].load("home.html");
        }else{
            ons.notification.alert("Select location!");

        }
       
    });
    $("#back").click(function () {

        $("#content")[0].load("home.html");
    

    });
}

});
