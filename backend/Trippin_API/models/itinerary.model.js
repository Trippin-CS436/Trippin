const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const itinerary= new Schema({itineraryID: {
//         type: Number,
//         required: false,
//         sparse: true,
//     },name: String, dateRanges:{type: Array, "default": []}});
const itinerarySchema = new Schema({
    id: {type: String , required  : true},
    locations: {type: Array, "default": []},
    cities: {type: Array, "default": []},
    countries: {type: Array, "default": []},
    itinerary: {type: Object},
},{minimize: false})

const Itinerary = mongoose.model("itineraries", itinerarySchema);


module.exports = Itinerary;