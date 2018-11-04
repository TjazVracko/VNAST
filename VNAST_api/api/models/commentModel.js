'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Komentar
var CommentSchema = new Schema({
    created_by: {
        type: String,
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: 'Enter the content of the comment'
    },
    assigned_to_task:  Schema.Types.ObjectId
});

module.exports = mongoose.model('Comments', CommentSchema);