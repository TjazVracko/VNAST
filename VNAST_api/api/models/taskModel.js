'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
    mimetype: String, // npr image/png al pa application/pdf
    originalname: String,  // file name before upload
    filename: String,    // file name in the system (neki IDji, da so vsi fajli unique)
    path: String    // full file path
});

// Naloga
var TaskSchema = new Schema({
    created_by: Schema.Types.ObjectId,  // manager, ki je naredo task
    name: {
        type: String,
        required: 'Enter the name of the task'  // če preko posta ustvariš objekt in ne pošleš "required" polja, potem api vrne error msg v katerem je ta text zapisan
    },
    description: {
        type: String,
        required: 'Enter the description of the task'
        },
    documents: [DocumentSchema],
    priority: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        default: ['3']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    time_limit: {
        type: Date  // format je ISO Date (YYYY-MM-DDTHH:MM:SSZ, npr 2018-10-04T10:18:22.3Z)
    },
    status: {
        type: [{
        type: String,
        enum: ['pending', 'ongoing', 'canceled', 'completed']  // če ni en od teh vriant vrne api error (in pove vse variante)
        }],
        default: ['pending']
    },
    assigned_to_worker: Schema.Types.ObjectId,
    //assigned_to_group:  Schema.Types.ObjectId
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('Documents', DocumentSchema);