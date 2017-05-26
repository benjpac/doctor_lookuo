var apiKey = require('./../.env').apiKey;


exports.getDoctors = function(symptoms, displayDoctor) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ symptoms+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      displayDoctor(result);
    })
   .fail(function(error){
      console.log("fail");
    });
};

function Doctor(name, city, imageURL, about) {
  current_person = this;
  current_person.name = name;
  current_person.city = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + apiKey;
  current_person.imageURL = imageURL;
  current_person.about = about;
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

exports.personModule = Person;
