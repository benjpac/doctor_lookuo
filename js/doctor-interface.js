var Doctor = require('./../js/doctor.js').doctorModule;

$(function() {
 $("form#findDoctor").submit(function(event) {
  event.preventDefault();
  var symptoms = $('#symptoms').val();
  var doctor = getDoctors(symptoms);
  console.log(doctor)
  })
})
