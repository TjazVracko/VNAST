'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// chat contrainer
var MessageSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: 'Enter the content of the message'
    }
});

module.exports = mongoose.model('Messages', MessageSchema);