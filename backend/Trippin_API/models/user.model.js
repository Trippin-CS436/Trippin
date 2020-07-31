const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required : true},
    visited: {type: Array, required: true},
    itineraries: {type: Array, required: true},
    archived: {type: Array, required: true}
},{minimize: false})

const User = mongoose.model("users", userSchema);


module.exports = User;