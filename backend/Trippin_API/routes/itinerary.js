var express = require('express');
const Itinerary = require('../models/itinerary.model');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  Itinerary.find()
    .then(itinerary => res.json(itinerary))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/exist/:id', function(req, res, next) {
  //console.log(req.param.id);
  Itinerary.exists({id: req.params.id})
  .then(response => {res.send(response); console.log(response);})
  .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/save', function(req, res, next) {
  const newItinerary = new Itinerary({id:req.body.id, locations: req.body.locations, cities: req.body.cities, countries: req.body.countries});
  console.log(newItinerary);
  console.log(newItinerary.id);
  newItinerary.save()
    .then(() => res.json(newItinerary._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.patch('/save/:id', function(req, res, next) {
  console.log(req.params.id);
  Itinerary.findOneAndUpdate({id: req.params.id}, {locations: req.body.locations, cities: req.body.cities, countries: req.body.countries})
    .then(() => res.json("Itinerary updated"))
    .catch(err => res.status(404).json('Error: ' + err));

});

router.delete('/delete/:id', function(req, res, next) {
  console.log(req.params.id);
  Itinerary.findByIdAndDelete(req.params.id)
    .then(() => res.json("Itinerary deleted"))
    .catch(err => res.status(404).json('Error: ' + err));
});




module.exports = router;
