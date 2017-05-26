var getDoctors = require('./../js/doctor.js').getDoctors;

var displayDoctor = function(response){
  debugger;
  response.data.forEach(function(doctor){
    console.log(doctor);
    var image_url = doctor.profile.image_url;
    var name = doctor.profile.first_name + ' ' + doctor.profile.last_name + ' ' + doctor.profile.title;
    console.log(name);
    var specialty = doctor.specialties[0].actor;
    console.log(specialty);
    var description = doctor.specialties[0].description;
    console.log(description);
  })
}

$(document).ready(function() {
 $("form#find-doctor").submit(function(event) {
  event.preventDefault();
  var symptoms = $('#symptoms').val();
  getDoctors(symptoms, displayDoctor);
  })
})
