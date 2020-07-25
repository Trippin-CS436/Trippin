const express = require('express');
const User = require('../models/user.model');
const router = express.Router();



/* GET users listing. */
router.route('/:email').get((req, res) => {
    User.find({email: req.params.email}).then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newUser').post((req,res) => {
    const newUser = new User({email: req.body.email, visited: [], itineraries: []});
    console.log(newUser);
    newUser.save()
        .then(() => res.json(newUser._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/save/:id').patch((req,res) => {
    console.log(req.params.id);
    User.updateOne({_id: req.params.id}, {visited: req.body.visited})
        .then(user => res.json(user))
        .catch(err => res.status(404).json('Error: ' + err));

});

module.exports = router;
