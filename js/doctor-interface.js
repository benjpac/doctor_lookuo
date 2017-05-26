var getDoctors = require('./../js/doctor.js').getDoctors;

var displayDoctor = function(result){
  result.data.forEach(function(doctor){
    var name = doctor.profile.first_name + ' ' + doctor.profile.last_name + ' ' + doctor.profile.title;
    var imageURL = doctor.profile.image_url;
    var specialty = doctor.specialties[0].actor;
    var description = doctor.specialties[0].description;
    var newDoctor = new Doctor()
  })
}

$(document).ready(function() {
 $("form#find-doctor").submit(function(event) {
  event.preventDefault();
  var symptoms = $('#symptoms').val();
  getDoctors(symptoms, displayDoctor);
  })
})
