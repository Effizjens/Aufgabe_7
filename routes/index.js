var express = require('express');
var router = express.Router();

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

module.exports = router;
