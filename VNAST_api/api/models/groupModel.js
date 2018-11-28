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
        type: Schema.Types.ObjectId,  // to je manager, ki je naredil grupo
        required: 'Someone had to create this'  //Če ne pošljemo, kdo je ustvaril comment API vrne error
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    workers: [Schema.Types.ObjectId],  // workeji, ki so v tej skupini
    tasks: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Groups', GroupSchema);