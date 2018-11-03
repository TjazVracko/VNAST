'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Group
var GroupSchema = new Schema({
    name: {
        type: String,
        required: 'Name the group'
    },
    created_by: {
        type: String,
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Groups', GroupSchema);