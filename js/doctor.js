var apiKeyBetterDoctor = require('./../.env').apiKeyBetterDoctor;
var apiKeyMaps = require('./../.env').apiKeyMaps;

exports.userLocation = function(loc, symp, displayDoctors) {
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=' + apiKeyMaps).then(function(response) {
    var geoLoc = response.results[0].geometry.location;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: geoLoc
    });
    getDoctors(geoLoc, symp, displayDoctors);
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });
};

function getDoctors(loc, symp, displayDoctors) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+symp+'&location='+loc.lat+'%2C'+loc.lng+',100&skip=0&limit=20&user_key='+apiKeyBetterDoctor).then(function(result) {
    // displayDoctors(result);
    result.data.forEach(function(doctor) {
      debugger;
    })
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });
};
