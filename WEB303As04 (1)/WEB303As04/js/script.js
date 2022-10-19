/*
    Assignment #4
    {Luis Rodriguez}
*/

$(function () {
    // your code here
    //////////////////////////////////////////////////
     let assign4 = document.getElementById("locationhere");  // assigning variable assign4 to DIV locationhere
	 

    

  
  let beforeLat = localStorage.getItem("lat");     // assigning variable to lat
  let beforeLong = localStorage.getItem("long");   // assigning variable to long

  if (beforeLat && beforeLong) {   // if statement beforeLat beforeLong variables to display previous lat and long
    // preivousLat and previsousLong is availabe... display appropriate message
    assign4.innerHTML +=    // assign4 will provide the previous long and lat along with a welcome back msg.
      "<br>Previous Latitude: " +  // display previous latitude
      beforeLat +
      "<br>Previous Longitude: " +  // display previous long
      beforeLong +
      "<br> WELCOME BACK";
  } else {
    // if no previous lat and long is available, then user is visiting the page for the first time
    // so appropriate message for that
    assign4.innerHTML += "Welcome";  // first time user welcome message
  }

  if (navigator.geolocation) {   // if statement for geolocation and navigator
    navigator.geolocation.getCurrentPosition(showPosition);  // show position of current user
  } else {
    assign4.innerHTML = "Geolocation is not supported by this browser.";   // message in case browser does not support geolocation
  }

  function showPosition(position) {
    let latitude = position.coords.latitude;   // assigning variables for latitude
    let longitude = position.coords.longitude;  // assigning variables for longitude

    assign4.innerHTML +=
      "<br>Current Latitude: " +   // displaying current lat
      latitude +  // current latitude displayed
      "<br>Current Longitude: " +   // display current long
      longitude;  // current long displayed

    // saving current location in localStorage
    localStorage.setItem("lat", position.coords.latitude);  // stores the latitude
    localStorage.setItem("long", position.coords.longitude);  // stores the longitude

    if (beforeLat && beforeLong) {
      // calculating distance between previous and current location
      const distance = calcDistanceBetweenPoints(
        beforeLat,
        beforeLong,
        latitude,
        longitude
      );
      let distanceInKms = distance/1000;    // calculating distance and dividing the distance by 1000 to get kilometers
      assign4.innerHTML +=     // getting concatenation   
        "<br>Distance between previous and current location: " + distanceInKms + " Kms";   // display message
    }
  }




///////////////////////////////////////////////////////////
    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


