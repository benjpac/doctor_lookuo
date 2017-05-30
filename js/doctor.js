var apiKeyBetterDoctor = require('./../.env').apiKeyBetterDoctor;
var apiKeyMaps = require('./../.env').apiKeyMaps;

exports.userLocation = function(loc, symp, displayDoctors) {
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=' + apiKeyMaps).then(function(response) {
    var geoLoc = response.results[0].geometry.location;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: geoLoc
    });
    console.log('user map loc: ' + geoLoc);
    getDoctors(geoLoc, symp, map, displayDoctors);
  }).fail(function(error) {
    alert('something went wrong');
  });
};

function getDoctors(geoLoc, symp, map, displayDoctors) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+symp+'&location='+geoLoc.lat+'%2C'+geoLoc.lng+',100&skip=0&limit=20&user_key='+apiKeyBetterDoctor).then(function(result) {
    displayDoctors(result, map);
  }).fail(function(error) {
    alert('something went wrong');
  });
}
