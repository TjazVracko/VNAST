'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']  // če ni en od teh vriant vrne api error (in pove vse variante)
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);