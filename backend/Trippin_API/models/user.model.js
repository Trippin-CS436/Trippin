const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: String , required  : true},
    email: {type: String, required : true},
    visited: {type: Array, "default": []},
    itineraries: {type: Array, "default": []}
},{minimize: false})

const User = mongoose.model("users", userSchema);


module.exports = User;