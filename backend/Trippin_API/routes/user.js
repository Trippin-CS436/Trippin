const express = require('express');
const User = require('../models/user.model');
const router = express.Router();



/* GET users listing. */
router.route('/').get((req, res) => {
    User.find({email: res.params.email}).then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save').post((req,res) => {
    const newUser = new User({id:req.body.id, locations: req.body.locations, cities: req.body.cities, countries: req.body.countries});
    console.log(newUser);
    console.log(newUser.id);
    newUser.save()
        .then(() => res.json(newUser._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save/:id').patch((req,res) => {
    console.log(req.params.id);
    User.findOneAndUpdate({id: req.params.id}, {locations: req.body.locations, cities: req.body.cities, countries: req.body.countries},)
        .then(() => res.json("itinerary updated"))
        .catch(err => res.status(404).json('Error: ' + err));

});

module.exports = router;
