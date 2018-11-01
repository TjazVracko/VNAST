'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Document - TODO: to je za future 3 tedne
var DocumentSchema = new Schema({
    contentType: String, // npr image/png al pa application/pdf (glej mime types - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
    data: Buffer
});

// Naloga
var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of the task'  // če preko posta ustvariš objekt in ne pošleš "required" polja, potem api vrne error msg v katerem je ta text zapisan
    },
    description: {
        type: String,
        required: 'Enter the name of the task'
        },
    documents: [DocumentSchema],  //TODO: to je za future 3 tedne, tukaj samo kot placeholder
    priority: {
        type: String,
        enum: ['1', '2', '3', '4', '5']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    time_limit: {
        type: Date
    },
    status: {
        type: [{
        type: String,
        enum: ['pending', 'ongoing', 'canceled', 'completed']  // če ni en od teh vriant vrne api error (in pove vse variante)
        }],
        default: ['pending']
    },
    assigned_to_worker: Schema.Types.ObjectId,
    assigned_to_group:  Schema.Types.ObjectId
});

module.exports = mongoose.model('Tasks', TaskSchema);