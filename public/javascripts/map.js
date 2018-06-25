'use strict';

/**
* @desc shows a map that has the drawing tools at the sidebar.
* We can either delete the drawn figures or save them into the database with
* a name and the GeoJSON file.
*
* @author Task6: Lia Kirsch, Benjamin Dietz
*/


// Debugging: all loggers log to both the server and the console
var ajaxAppender=JL.createAjaxAppender('ajaxAppender');
var consoleAppender=JL.createConsoleAppender('consoleAppender');
JL("mylogger").setOptions({"appenders": [ajaxAppender,consoleAppender]});
JL("perry").setOptions({"appenders": [consoleAppender]});

//Beispiel Kommentar
JL("mylogger").info("Huhu, ich bin Perry und wenn du mich groß genug machst, sehe ich gut aus!");
JL("mylogger").info("Und damit es nicht doof aussieht, kommt Perry nicht in die Server Konsole!");
//Beispiel Perry
JL("perry").info("    ```~~--..,,,__\n _,,.-----------;;..;;,__,,,..---‘‘‘‘‘‘‘‘‘‘´´´´´´´´\\\n                   /                                \\\n                  /                              _,.-~°´´°~-.,_\n                 /                              /   _.,-*-.,_  \\\n                /   _,.-~°´´°~-.,_             /   /     ,-, \\  \\\n               /  /               \\            |   |    ´-´  |   |\n              /  /  _.,-*-.,_      \\           \\   \\         /   /\n             /   | /     ,-, \\     |         A  \\   `°-:_:-°`   /\n            /    \\ |    ´-´  |     /        / \\  `°~-:.,_,.:-~°`\n           /      \\\\         /    /        /   \\          \\\n          /        `°~-:.,_,.:-~°`        /     \\          \\     _.,;‘\\\n         (                               /       \\__  __,,,.!--~*      \\\n          \\                             /      ~``  ``                  )\n           \\                           /                               /\n            \\                         {        ______            _,.-~‘\n             \\                         \\             ‘-;,,,..--;~~‘'\n              \\                         \\                /    \\\n               \\                         ‘*--.,,__,,.--*‘     \\\n                \\                                              \\\n                 \\                                             \\ "
);

// create the basic function of the map and a layer (OSM) and a standard
// position of Muenster
var drawnItems = new L.FeatureGroup();
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
    map = new L.Map('map', { center: new L.LatLng(51.9606649, 7.6261347), zoom: 13 }),
    drawnItems = L.featureGroup().addTo(map);
L.control.layers({ "OSM": osm.addTo(map)}).addTo(map);

// add draw toolbar
map.addControl(new L.Control.Draw({
  edit: {
      featureGroup: drawnItems,
      poly: {
          allowIntersection: false
      }
  },
  draw: {
      polygon: {
          allowIntersection: false,
          showArea: true
      }
  }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
});

map.on('draw:created', function(e) {
    drawnItems.addLayer(e.layer);
});


/**
* source: https://bl.ocks.org/danswick/d30c44b081be31aea483
* handles click of delete element
* all drawn layers get cleared
*/
document.getElementById('delete').onclick = function(e) {
    drawnItems.clearLayers();
}

/*
* class represent a file in the database
*/
class databasobject {
  /**
  * @param{string} name - name of the figures
  * @param{string:json} - boundries of the figures
  */
  constructor(name, json) {
    this.name = name;
    this.json = json;
  }

}

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
          var data = drawnItems.toGeoJSON();

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
