const express = require('express');
const Photo = require('../models/photos.model');
const router = express.Router();



/* GET photos listing. */
router.route('/:photo').get((req, res) => {
    Photo.find({id: req.params.image}).then(photo => res.json(photo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newPhoto').post((req,res) => {
    const newPhoto = new Photo({email: req.body.email, visited: [], itineraries: [], archived: []});
    console.log(newPhoto);
    newPhoto.save()
        .then(() => res.json(newPhoto._id))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
