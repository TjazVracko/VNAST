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
    messages: [Schema.Types.ObjectId],
    assigned_to_group: Schema.Types.ObjectId
});

module.exports = mongoose.model('ChatContainers', ChatContainerSchema);