const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photosSchema = new Schema({
    id: {type: String, required : true},
    files: {type: Array, "default": []},
    userID: {type: String, required : true}
},{minimize: false})

const Photo = mongoose.model("photos", photosSchema);


module.exports = Photo;