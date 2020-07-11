const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    id: {type: Schema.Types.Mixed , required  : true},
    locations: {type: Array, "default": []},
    cities: {type: Array, "default": []},
    countries: {type: Array, "default": []},
})

const Itinerary = mongoose.model("itineraries", itinerarySchema);


module.exports = Itinerary;