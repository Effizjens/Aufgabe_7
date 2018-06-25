/**
sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
*/
window.onload = function() {
  var url = new URL(window.location.href);
  loadFromDatabase(url.searchParams.get("name"));
};

/**
* function is called with the 'save to database'-Button and makes an AJAX
* post request with the data to later store it in the database
*
*/
function saveToDatabase() {
  // get value of the textfield that should contain the name of the figures
  var textfield = document.getElementById("GeoJSONinput").value;

  if(textfield.length==0) {
    JL("mylogger").error("Data was not sent to database");
    alert("Error: Please fill in a name");
  }  else {
    var data = getAllPoint();

    // create new databaseobject-object and later will the param json
    var neu = new databasobject(textfield, "");
    neu.json = JSON.stringify(data);
    JL("mylogger").info("Data was sent to database");
    alert('Object successfull saved!');
    $.ajax({
      type: 'POST',
      data: neu,
      url: "./start",

    });
  }
}

/**
*sssssssssssssssssssssssss
*@param nameVonObejkt Name von dem Objekt
*/
function loadFromDatabase(nameVonObejkt){
  $.ajax({
    type: 'GET',
    data: {"name":nameVonObejkt},
    url: "./load",
    success: function(result){
      var route = JSON.parse(result.route);
      control.setWaypoints([
        L.latLng(route[0].lat, route[0].lng),
        L.latLng(route[1].lat, route[1].lng)
      ]);
    }
  });
}
