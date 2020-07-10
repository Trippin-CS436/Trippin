var express = require('express');
var router = express.Router();
var {uuid} = require('uuidv4');
// var mongoClient = require('mongodb').MongoClient;
// // use this when we connect to mongodb, debugging purposes.
// var assert = require('assert');


// var url = "mongodb+srv://trippin_admin:trippin_admin_123@trippin-ue6od.mongodb.net/TrippinDB?retryWrites=true&w=majority";
// let users = [
//   {
//     id: '1',
//     userName: 'jrayo',
//     firstName: 'josh',
//     lastName: 'rayo',
//   },
// ];
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.setHeader('Content-type', 'application/json');
//   res.send(users);
// });


// router.get('/getdata',function(req, res, next){
//     var resultArray = [];
    
//     mongoClient.connect(url, function(err, client){
//       assert.equal(null,err);
//       // in 3.0 you get a client object containing the database object instead
//       var db = client.db('TrippinDB');
//       var cursor = db.collection('Test').find();
//       cursor.forEach(function(doc, err){
//         assert.equal(null,err);
//         resultArray.push(doc);
//       }, function(){
//         client.close();
//         res.send(resultArray);
//       });
//     });
// });



// router.post('/insert', function(req, res, next) {
//   const newTestObject = req.body;
//   newTestObject.id = uuid();
  
//   mongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, function(err, client){
//     // throws exception if err is not null
//     assert.equal(null,err);
//     var db = client.db('TrippinDB');
//     db.collection('Test').insertOne(newTestObject, function(err, result){
//       assert.equal(null, err);
//       console.log('item inserted');
//       client.close();
//       console.log('client is closed');
//       res.send(req.body);
//     });
//   });  
// });



// router.update('/insert', function(req, res, next) {

// });

// router.delete('/insert', function(req, res, next) {

// });

module.exports = router;
