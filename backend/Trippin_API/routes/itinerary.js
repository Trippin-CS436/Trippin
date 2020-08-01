const express = require('express');
const Itinerary = require('../models/itinerary.model');
const router = express.Router();
let i=0;


/* GET users listing. */
router.route('/').get((req, res) => {
  Itinerary.find()
      .then(itinerary => res.json(itinerary))
      .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
  console.log(i);
  console.log(req.params.id);
  Itinerary.find({id: req.params.id})
      .then(itinerary => {res.json(itinerary); i++})
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/exist/:id').get((req, res) => {
  Itinerary.exists({id: req.params.id})
  .then(response => {res.send(response); console.log(response);})
  .catch(err => {res.send(err); console.log(err)});
});

router.post('/save', function(req, res, next) {
  const newItinerary = new Itinerary({id:req.body.id, locations: req.body.locations, cities: req.body.cities, countries: req.body.countries,itinerary:req.body.itinerary});
  console.log(newItinerary);
  console.log(newItinerary.id);
  newItinerary.save()
    .then(() => res.json(newItinerary._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newItinerary').post((req,res) => {
  const newItinerary = new Itinerary({id:req.body.id, locations: [], cities: [], countries: [], itinerary:{name: ""}});
  console.log(newItinerary);
  console.log(newItinerary.id);
  newItinerary.save()
    .then(() => res.json(newItinerary._id))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save/:id').patch((req,res) => {
  console.log(req.params.id);
  Itinerary.findOneAndUpdate({id: req.params.id}, {locations: req.body.locations, cities: req.body.cities, countries: req.body.countries,itinerary:req.body.itinerary},)
    .then(() => res.json("itinerary updated"))
    .catch(err => res.status(404).json('Error: ' + err));

  });

  router.route('/delete/:id').delete((req,res) => {
    console.log(req.params.id);
    Itinerary.findByIdAndDelete(req.params.id)
      .then(() => res.json("Itinerary deleted"))
      .catch(err => res.status(404).json('Error: ' + err));
    });
  



module.exports = router;
