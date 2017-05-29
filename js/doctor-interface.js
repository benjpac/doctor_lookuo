var userLocation = require('./../js/doctor.js').userLocation;
var getDoctors = require('./../js/doctor.js').getDoctors;

var displayDoctor = function(result) {
  result.data.forEach(function(doctor){
    var name = doctor.profile.first_name + ' ' + doctor.profile.last_name + ' ' + doctor.profile.title;
    var imageURL = doctor.profile.image_url;
    var specialty = doctor.specialties[0].actor;
    var description = doctor.specialties[0].description;
    var newMapMarker = new Marker();
  });

};

$(document).ready(function() {
  var startLoc = {lat: 39, lng: -98};
  // create map centered on US
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: startLoc
  });

  $("form#find-doctor").submit(function(event) {
    event.preventDefault();
    var loc = $('#location').val();
    var symp = $('#symptoms').val();
    getDoctors(loc, symptoms, displayDoctor);
  });

});
