var apiKeyBetterDoctor = require('./../.env').apiKeyBetterDoctor;
var apiKeyMaps = require('./../.env').apiKeyMaps;

exports.userLocation = function(location) {
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKeyMaps)
    .then(function(response) {
      var geoLoc = response.results[0].geometry.location;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: geoLoc
      });
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.getDoctors = function(loc, symp, displayDoctor) {
  var lat = '';
  var lng = '';
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKeyMaps)
    .then(function(response) {
      var geoLoc = response.results[0].geometry.location;
      lat = geoLoc.lat;
      lng = geoLoc.lng;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: geoLoc
      });
      $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ symptoms+'&location='+lat+'%2C%20'+lng+'%2C%2010&user_location='+ lat+'%2C%20'+lng+'&skip=0&limit=20&user_key=' + apiKeyBetterDoctor)
       .then(function(result) {
         debugger;
          displayDoctor(result);
        })
       .fail(function(error){
          console.log("fail");
        });
    })
   .fail(function(error){
      console.log("fail");
    });
};
