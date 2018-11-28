'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// chat contrainer
var ChatContainerSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    participants: [Schema.Types.ObjectId],
    messages: [Schema.Types.ObjectId]  // workeji, ki so v tej skupini
});

module.exports = mongoose.model('ChatContainers', ChatContainerSchema);