var express = require('express');
var router = express.Router();

//Logging für den Server
var JL = require('jsnlog').JL;
//Logging für die Konsole
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;
var bodyParser = require('body-parser');


/* GET Map page at home of host */
router.get('/', function(req, res) {
    res.render('map', { title: 'This is your map!' });
});

/* GET Jsonlist page taht contains all ojects of our database. */
router.get('/jsonlist', function(req, res) {
    var db = req.db;
    var collection = db.get('geojsons');
    collection.find({},{},function(e,docs){
        res.render('jsonlist', {
            "jsonlist" : docs, title: 'Database Objects'
        });
    });
});



/*
* handling database insert post request when clicking button in map
* sending the data of the request to the database collection 'geojsons'
*/
router.post('/start', function(req, res) {
  var db = req.db;
  var document = req.body;

  db.collection('geojsons').insert(document, function(err, result) {
    if(err) {

    } else {
      res.send(document);
    }
  });

});

/*
* render all of the url-request that could be matched to others
* (those with the id in it when selecting object of database)
* Render it with oject.jade and pass the variables title, text and name
*/
router.get('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('geojsons');
  var db = req.db;
  var collection = db.get('geojsons');
  var json;
  collection.find({"_id": req.params.id},{},function(e,docs){
      // text is the json-string
      res.render('object', { title: 'Object: ' + docs[0].name, id: req.params.id,
       text: JSON.stringify(docs[0].json), name: docs[0].name
     });
  });

});

// Ensure that the JSON objects received from the client get parsed correctly.
router.use(bodyParser.json())

// jsnlog.js on the client by default sends log messages to /jsnlog.logger, using POST.
router.post('*.logger', function (req, res) {
    jsnlog_nodejs(JL, req.body);

    // Send empty response. This is ok, because client side jsnlog does not use response from server.
    res.send('');
});

module.exports = router;
