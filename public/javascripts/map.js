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

// create the basic function of the map and a layer (OSM) and a standard
// position of Muenster

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
map = new L.Map('map', { center: new L.LatLng(51.9606649, 7.6261347), zoom: 13 }),
drawnItems = L.featureGroup().addTo(map);
L.control.layers({ "OSM": osm.addTo(map)}).addTo(map);

var control = L.Routing.control({
  router: L.routing.mapbox('pk.eyJ1IjoiZWZmaXpqZW5zIiwiYSI6ImNqaWFkbWsxMjB1bzgzdmxtZjcxb2RrMWcifQ.By1C8AELYfvq1EpQeOVMxw'),
  waypoints: [
    L.latLng(57.74, 11.94),
    L.latLng(57.6792, 11.949)
  ],
  routeWhileDragging: true
}).addTo(map);


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
@desc ÜBergibt alle wegpunkt
@return Array aus Wegpunkten
*/
function getAllPoint(){
  var returnArray = [];
      for (var i = 0; i < control.getWaypoints().length; i++) {
        returnArray.push(control.getWaypoints()[i].latLng);
      };
    return returnArray;
}


function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

map.on('click', function(e) {

  var container = L.DomUtil.create('div'),
  startBtn = createButton('Start from this location', container),
  destBtn = createButton('Go to this location', container);

  L.popup()
  .setContent(container)
  .setLatLng(e.latlng)
  .openOn(map);

  L.DomEvent.on(startBtn, 'click', function() {
    control.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function() {
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    map.closePopup();
  });
});
