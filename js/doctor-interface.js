var userLocation = require('./../js/doctor.js').userLocation;
var getDoctors = require('./../js/doctor.js').getDoctors;

function displayDoctorPanel(fullName, imageURL, specialty, bio, address) {
  $('#profile').show();
  $('#fullName').text(fullName);
  $('#imageURL').attr('src', imageURL);
  $('#specialty').text(specialty);
  $('#bio').text(bio);
  $('#address').text(address);
  $('#address').attr('href', 'https://www.google.com/maps/search/?api=1&query='+address);
}

var displayDoctors = function(result, map) {
  $('#doctors').empty();
  $('#profile').hide();
  $('#intro').hide();
  result.data.forEach(function(doctor) {
    var docID = doctor.practices[0].uid;
    var fullName = doctor.profile.first_name+' '+doctor.profile.last_name+' '+doctor.profile.title;
    var imageURL = doctor.profile.image_url;
    var specialty = doctor.specialties[0].name;
    var geoLoc = { lat: doctor.practices[0].lat, lng: doctor.practices[0].lon};
    var bio = doctor.profile.bio;
    var addressObj = doctor.practices[0].visit_address;
    var address = addressObj.street+' '+addressObj.street2+', '+addressObj.city+', '+addressObj.state+' '+addressObj.zip;
    // create google map marker
    var marker = new google.maps.Marker( {
      position: geoLoc,
      map: map
    });
    // make marker clickable, display doctor info
    marker.addListener('click', function() {
      map.setZoom(13);
      map.setCenter(marker.getPosition());
      displayDoctorPanel(fullName, imageURL, specialty, bio, address)
    });

    $('#doctors').append('<p class="clickable" id='+docID+'><strong>'+fullName+'</strong>, '+specialty+'</p>');
    $('#'+docID).click(function() {
      map.setZoom(13);
      map.setCenter(marker.getPosition());
      displayDoctorPanel(fullName, imageURL, specialty, bio, address)
    })
  });
};

$(document).ready(function() {
  var startLoc = {lat: 39, lng: -98};
  // create map centered on US
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: startLoc
  });

  $("#find-doctor").submit(function(event) {
    event.preventDefault();
    var loc = $('#location').val();
    var symp = $('#symptoms').val();
    userLocation(loc, symp, displayDoctors);
  });
});
