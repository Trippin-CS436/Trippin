const express = require("express");
const router = express.Router();
const request = require('request');
const fetch = require("node-fetch");
const GOOGLE_API_KEY = process.env.PLACES_API_KEY;

// get incoming urls
router.route("/getInfo/:placesId").get(async (req, res) => {
  const placesId = req.params.placesId;
  console.log(placesId);
  const url = 
  "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
    placesId +
    "&fields=name,rating,website,review,formatted_phone_number&key=" +
    GOOGLE_API_KEY
  const options = {
    url:  url,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
  }

  const data = request(options, (err, res, body) => {
    let json = JSON.parse(body);
    return json;
  });

});

function fetchPlacesData(request) {
  try {
    return fetch(request);
    }
    catch(e) { console.log(e)}
}

module.exports = router;
