const express = require('express');
const User = require('../models/user.model');
const router = express.Router();



/* GET users listing. */
router.route('/:email').get((req, res) => {
    User.find({email: req.body.email}).then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newUser').post((req,res) => {
    const newUser = new User({email: req.body.email, visited: [], itineraries: []});
    console.log(newUser);
    console.log(newUser.id);
    newUser.save()
        .then(() => res.json(newUser._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save/:id').patch((req,res) => {
    console.log(req.params.id);
    User.findOneAndUpdate({id: req.params.id}, {visited: req.body.visited, itineraries: req.body.itineraries},)
        .then(() => res.json("User updated"))
        .catch(err => res.status(404).json('Error: ' + err));

});

module.exports = router;
