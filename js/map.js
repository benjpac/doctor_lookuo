var apiKeyMaps = require('./../.env').apiKeyMaps;

exports.userLocation = function(location) {
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKeyMaps)
    .then(function(response) {
      var geoLoc = response.results[0].geometry.location;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: geoLoc
      });
      return map;
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.Marker = function(location) {
  current_person = this;
  current_person.location = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + apiKeyMaps;
  current_person.location = '';
  current_person.createMarker = function(map) {
    var marker = new google.maps.Marker({
      position: current_person.location,
      map: map
    });
    marker.addListener('click', function() {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      $('#profile').show();
      $('#nameID').text(current_person.name);
      $('#imageID').attr('src', current_person.imageURL);
      $('#ageID').text(current_person.age);
      $('#aboutID').text(current_person.about);
    });
  };
}

// exports.markerModule = Marker;
