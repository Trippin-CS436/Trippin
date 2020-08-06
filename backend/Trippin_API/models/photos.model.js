const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const photosSchema = new Schema({
    id: {type: String , required  : true},
    user_id: {type: String , required  : true},
    itinerary_id: {type: String, require: true},
    photo: {type: Array, "default": []},
},{minimize: false})

const Itinerary = mongoose.model("itineraries", photosSchema);


module.exports = Itinerary;