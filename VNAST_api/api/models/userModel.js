'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Uporabnik
var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Must have username'
    },
    password: {
        type: String,
        required: 'A password must exits for the user'
    },
    email: {
        type: String,
    },
    privilege: {
        type: [{
            type: String,
            enum: ['worker', 'manager', 'admin']
            }],
            default: ['worker']
    },
    // assigned_to_groups:  [Schema.Types.ObjectId]  // user je lahko v več skupinah
});

module.exports = mongoose.model('Users', UserSchema);